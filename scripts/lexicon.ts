/**
 * FR-FRAME: a lesson's sentence-frame drill may only use words the learner has
 * already met — the vocabulary of that lesson or an earlier one.
 *
 * The cumulative lexicon is derived from the code, never hand-listed: for lesson
 * N it is the union of the Bulgarian strings of every mode registered in lessons
 * 1..N. Frame modes are excluded from the source set, so a frame cannot approve
 * its own vocabulary.
 *
 * Only fields that are certainly Bulgarian feed the lexicon (`answer`, `decoys`,
 * `opts`, `words`, `result`, `left`/`right`, `verb`, `forms`, `pronouns`). `q` is
 * left out on purpose: in some modes it carries a Russian prompt, and a
 * whitelist polluted with Russian would silently weaken the check.
 *
 * Unlike the other invariants this one evaluates the data instead of scanning it
 * — `mode.data()` has to run. `deno.json` enables `sloppy-imports` so the app's
 * extensionless imports resolve here.
 *
 * Run: `deno task test`, or `deno run -A scripts/lexicon.ts --dump l3` to print
 * the lexicon available at a lesson while authoring one.
 */

import { ALL_MODES } from "../src/data/index.ts";
import { LESSONS } from "../src/data/lessons.ts";
import { itemKey } from "../src/utils/itemKey.ts";
import type { FrameData, FrameItem, Mode } from "../src/types.ts";

const MODE_BY_ID = new Map(ALL_MODES.map((m) => [m.id, m]));

/** Strip punctuation and case so "България." and "българия" compare equal. */
const normWord = (w: string) => w.replace(/[.,?!…"'«»()]/g, "").trim().toLowerCase();
const tokens = (s: string) => String(s).split(/[\s/]+/).map(normWord).filter(Boolean);

/** Bulgarian strings of one mode, by item shape. */
function modeWords(mode: Mode): string[] {
  const out: string[] = [];
  const push = (v: unknown) => {
    if (typeof v === "string") out.push(...tokens(v));
  };
  const raw = mode.data() as Record<string, unknown> | unknown[];
  const items = Array.isArray(raw) ? raw : raw.items;
  if (!Array.isArray(items)) throw new Error(`unknown data shape for mode ${mode.id}`);
  if (!Array.isArray(raw)) {
    if (Array.isArray(raw.opts)) raw.opts.forEach(push);
    if (Array.isArray(raw.bank)) raw.bank.forEach(push);
  }
  for (const item of items as Record<string, unknown>[]) {
    push(item.answer);
    push(item.result);
    push(item.left);
    push(item.right);
    push(item.verb);
    for (const key of ["decoys", "words", "forms", "pronouns"]) {
      const v = item[key];
      if (Array.isArray(v)) v.forEach(push);
    }
    if (Array.isArray(item.slots)) {
      (item.slots as { word: string }[]).forEach((s) => push(s.word));
    }
  }
  return out;
}

export function checkLexicon(dump?: string): void {
  const failures: string[] = [];
  const fail = (where: string, msg: string) => failures.push(`${where} — ${msg}`);

  // Cumulative lexicon per lesson, built from everything that is not a frame mode.
  const lexicon = new Map<string, Set<string>>();
  const seen = new Set<string>();
  for (const lesson of LESSONS) {
    for (const id of lesson.modeIds) {
      const mode = MODE_BY_ID.get(id);
      if (!mode) {
        fail(`lessons.ts ${lesson.id}`, `modeId "${id}" has no mode`);
        continue;
      }
      if (mode.type === "frame") continue;
      for (const w of modeWords(mode)) seen.add(w);
    }
    lexicon.set(lesson.id, new Set(seen));
  }

  if (dump) {
    const set = lexicon.get(dump);
    if (!set) {
      console.error(`no lesson "${dump}"`);
      Deno.exit(1);
    }
    console.log([...set].sort((a, b) => a.localeCompare(b, "bg")).join("\n"));
    console.log(`\n${set.size} words available at ${dump}`);
    return;
  }

  // Every lesson carries exactly one frame mode.
  const frameModes = ALL_MODES.filter((m) => m.type === "frame");
  for (const lesson of LESSONS) {
    const own = lesson.modeIds.filter((id) => MODE_BY_ID.get(id)?.type === "frame");
    if (own.length !== 1) {
      fail(`lessons.ts ${lesson.id}`, `expected exactly 1 frame mode, found ${own.length}`);
    }
  }
  if (frameModes.length !== LESSONS.length) {
    fail("src/data/index.ts", `${frameModes.length} frame modes for ${LESSONS.length} lessons`);
  }

  const lessonOfMode = new Map<string, string>();
  for (const lesson of LESSONS) {
    for (const id of lesson.modeIds) if (!lessonOfMode.has(id)) lessonOfMode.set(id, lesson.id);
  }

  for (const mode of frameModes) {
    const where = `mode ${mode.id}`;
    const lessonId = lessonOfMode.get(mode.id);
    if (!lessonId) {
      fail(where, "frame mode is not registered in any lesson");
      continue;
    }
    const allowed = lexicon.get(lessonId)!;
    const { items, bank, step } = mode.data() as FrameData;
    if (!Array.isArray(items) || !Array.isArray(bank)) {
      fail(where, "data must be { step, items, bank }");
      continue;
    }
    if (![1, 2, 3, 4].includes(step)) fail(where, `step must be 1..4, got ${JSON.stringify(step)}`);

    if (items.length < 6) fail(where, `only ${items.length} items (need >= 6)`);
    if (new Set(bank).size !== bank.length) fail(where, "bank has duplicates");
    // The sentence-initial capital is applied by the engine at render time. A bank
    // holding both "тук" and "Тук" would put two tiles for one word on screen.
    const byCase = new Map<string, string>();
    for (const w of bank) {
      const k = w.toLowerCase();
      if (byCase.has(k) && byCase.get(k) !== w) {
        fail(where, `bank has "${byCase.get(k)}" and "${w}" — same word, two tiles`);
      }
      byCase.set(k, w);
    }

    const longest = Math.max(...items.map((i) => i.slots.length));
    // A bank barely larger than the sentence degenerates into the `build` drill:
    // the learner would place every word it offers.
    if (bank.length < 4 * longest) {
      fail(where, `bank ${bank.length} words < 4x longest sentence (${longest} slots)`);
    }

    for (const w of bank) {
      if (!allowed.has(normWord(w))) {
        fail(where, `bank word "${w}" is not in the ${lessonId} lexicon`);
      }
    }
    for (const item of items) {
      const words = item.slots.map((s) => s.word);
      const label = words.join(" ");
      if (item.slots.length < 2) fail(where, `item "${label}" has < 2 slots`);
      // The bank holds each word once, so the engine offers one tile per word. A
      // sentence using the same word twice could never be filled and would leave
      // the learner stuck with no way to submit.
      const twice = words.filter((w, i) => words.indexOf(w) !== i);
      if (twice.length) {
        fail(
          where,
          `item "${label}" repeats "${
            [...new Set(twice)].join('", "')
          }" — one tile per word, unfillable`,
        );
      }
      for (const s of item.slots) {
        if (!bank.includes(s.word)) fail(where, `slot word "${s.word}" is missing from the bank`);
        if (!allowed.has(normWord(s.word))) {
          fail(where, `slot word "${s.word}" is not in the ${lessonId} lexicon`);
        }
        for (const loc of ["ru", "uk"] as const) {
          if (!s.role?.[loc]) fail(where, `slot "${s.word}" has no ${loc} role label`);
        }
      }
      for (const loc of ["ru", "uk"] as const) {
        if (!item.translation?.[loc]) fail(where, `item "${label}" has no ${loc} translation`);
      }
      checkAlt(item, { where, label, lessonId, step, bank, allowed, fail });
      // useGame swallows itemKey errors in a try/catch, so an unknown item shape
      // would silently disable mastery instead of failing loudly. Assert it here.
      try {
        itemKey(item);
      } catch {
        fail(where, "itemKey does not recognise the frame item shape — mastery would be dropped");
      }
    }
  }

  // FR-FRAME-LADDER: support fades as the course advances. Across lessons in
  // order the step never drops, and every step is actually reached.
  const frameOfLesson = (lessonId: string) =>
    ALL_MODES.find((m) => m.type === "frame" && lessonOfMode.get(m.id) === lessonId);
  const ladder = LESSONS.map((l) => (frameOfLesson(l.id)?.data() as FrameData | undefined)?.step);
  for (let i = 1; i < ladder.length; i++) {
    const prev = ladder[i - 1];
    const cur = ladder[i];
    if (prev !== undefined && cur !== undefined && cur < prev) {
      fail(
        "src/data/frames.ts",
        `step drops from ${prev} (${LESSONS[i - 1].id}) to ${cur} (${LESSONS[i].id})`,
      );
    }
  }
  for (const s of [1, 2, 3, 4]) {
    if (!ladder.includes(s as FrameData["step"])) {
      fail("src/data/frames.ts", `no lesson uses step ${s}`);
    }
  }

  console.log(
    `Checked ${frameModes.length} frame modes against ${LESSONS.length} cumulative lexicons.`,
  );
  for (const lesson of LESSONS) {
    const mode = frameOfLesson(lesson.id);
    const size = lexicon.get(lesson.id)!.size;
    const d = mode ? mode.data() as FrameData : null;
    const alts = d ? d.items.filter((i) => i.alt).length : 0;
    console.log(
      `  ${lesson.id}  lexicon ${String(size).padStart(4)}  ${
        mode ? mode.id.padEnd(12) : "—".padEnd(12)
      } step ${d ? d.step : "?"}  ${d ? d.items.length : 0} items (${alts} with alt), bank ${
        d ? d.bank.length : 0
      }`,
    );
  }

  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("\nOK: every frame word comes from its lesson's cumulative lexicon.");
}

interface AltCtx {
  where: string;
  label: string;
  lessonId: string;
  step: number;
  bank: string[];
  allowed: Set<string>;
  fail: (where: string, msg: string) => void;
}

/** `alt` word orders are checked against the same bank and lexicon as the canonical one. */
function checkAlt(item: FrameItem, ctx: AltCtx): void {
  const { where, label, lessonId, step, bank, allowed, fail } = ctx;
  if (item.alt === undefined) return;
  // Below step 3 the frame fixes both order and length, so no alternative word
  // order is reachable and an `alt` here would be dead data.
  if (step < 3) fail(where, `item "${label}" has alt at step ${step}`);
  if (!Array.isArray(item.alt) || item.alt.length === 0) {
    fail(where, "alt must be a non-empty array");
    return;
  }
  const canon = label.toLowerCase();
  for (const a of item.alt) {
    if (a.toLowerCase() === canon) fail(where, `alt "${a}" repeats the canonical sentence`);
    const aw = String(a).split(/\s+/);
    const dup = aw.filter((w, i) => aw.indexOf(w) !== i);
    if (dup.length) {
      fail(
        where,
        `alt "${a}" repeats "${[...new Set(dup)].join('", "')}" — one tile per word, unfillable`,
      );
    }
    for (const w of aw) {
      if (!bank.includes(w)) fail(where, `alt word "${w}" (in "${a}") is missing from the bank`);
      if (!allowed.has(normWord(w))) {
        fail(where, `alt word "${w}" is not in the ${lessonId} lexicon`);
      }
    }
  }
}

if (import.meta.main) {
  const i = Deno.args.indexOf("--dump");
  checkLexicon(i > -1 ? Deno.args[i + 1] : undefined);
}
