#!/usr/bin/env node
// FR-FRAME: a lesson's sentence-frame drill may only use words the learner has
// already met — the vocabulary of that lesson or an earlier one.
//
// The cumulative lexicon is derived from the code, never hand-listed: for lesson
// N it is the union of the Bulgarian strings of every mode registered in lessons
// 1..N. Frame modes are excluded from the source set so a frame cannot approve
// its own vocabulary.
//
// Only fields that are certainly Bulgarian feed the lexicon (`answer`, `decoys`,
// `opts`, `words`, `result`, `left`/`right`, `verb`, `forms`, `pronouns`).
// `q` is left out on purpose: in some modes it carries a Russian prompt, and a
// whitelist polluted with Russian would silently weaken the check.
//
// Run: node scripts/check-lesson-lexicon.mjs [--dump l3]

import { register } from "node:module";

// The app's sources import each other without file extensions, which Node's ESM
// resolver rejects. Register the resolver hook first, then pull src/ in dynamically —
// static imports are hoisted and would resolve before the hook exists.
register(new URL("./resolve-ts-hook.mjs", import.meta.url));

const { ALL_MODES } = await import("../src/data/index.ts");
const { LESSONS } = await import("../src/data/lessons.ts");
const { itemKey } = await import("../src/utils/itemKey.ts");

const MODE_BY_ID = new Map(ALL_MODES.map(m => [m.id, m]));

/** Strip punctuation and case so "България." and "българия" compare equal. */
const normWord = w => w.replace(/[.,?!…"'«»()]/g, "").trim().toLowerCase();
const tokens = s => String(s).split(/[\s/]+/).map(normWord).filter(Boolean);

/** Bulgarian strings of one mode, by item shape. */
function modeWords(mode) {
  const out = [];
  const push = v => { if (typeof v === "string") out.push(...tokens(v)); };
  const raw = mode.data();
  const items = Array.isArray(raw) ? raw : raw.items;
  if (!Array.isArray(items)) throw new Error(`unknown data shape for mode ${mode.id}`);
  if (!Array.isArray(raw) && Array.isArray(raw.opts)) raw.opts.forEach(push);
  if (!Array.isArray(raw) && Array.isArray(raw.bank)) raw.bank.forEach(push);
  for (const it of items) {
    push(it.answer); push(it.result); push(it.left); push(it.right); push(it.verb);
    for (const key of ["decoys", "words", "forms", "pronouns"]) {
      if (Array.isArray(it[key])) it[key].forEach(push);
    }
    if (Array.isArray(it.slots)) it.slots.forEach(s => push(s.word));
  }
  return out;
}

const failures = [];
const fail = (where, msg) => failures.push(`${where} — ${msg}`);

// Cumulative lexicon per lesson, built from everything that is not a frame mode.
const lexicon = new Map();
const seen = new Set();
for (const lesson of LESSONS) {
  for (const id of lesson.modeIds) {
    const mode = MODE_BY_ID.get(id);
    if (!mode) { fail(`lessons.ts ${lesson.id}`, `modeId "${id}" has no mode`); continue; }
    if (mode.type === "frame") continue;
    for (const w of modeWords(mode)) seen.add(w);
  }
  lexicon.set(lesson.id, new Set(seen));
}

const dumpArg = process.argv.indexOf("--dump");
if (dumpArg > -1) {
  const id = process.argv[dumpArg + 1];
  const set = lexicon.get(id);
  if (!set) { console.error(`no lesson "${id}"`); process.exit(1); }
  console.log([...set].sort((a, b) => a.localeCompare(b, "bg")).join("\n"));
  console.log(`\n${set.size} words available at ${id}`);
  process.exit(0);
}

// Every lesson carries exactly one frame mode.
const frameModes = ALL_MODES.filter(m => m.type === "frame");
for (const lesson of LESSONS) {
  const own = lesson.modeIds.filter(id => MODE_BY_ID.get(id)?.type === "frame");
  if (own.length !== 1) {
    fail(`lessons.ts ${lesson.id}`, `expected exactly 1 frame mode, found ${own.length}`);
  }
}
if (frameModes.length !== LESSONS.length) {
  fail("src/data/index.ts", `${frameModes.length} frame modes for ${LESSONS.length} lessons`);
}

const lessonOfMode = new Map();
for (const lesson of LESSONS) {
  for (const id of lesson.modeIds) if (!lessonOfMode.has(id)) lessonOfMode.set(id, lesson.id);
}

for (const mode of frameModes) {
  const where = `mode ${mode.id}`;
  const lessonId = lessonOfMode.get(mode.id);
  if (!lessonId) { fail(where, "frame mode is not registered in any lesson"); continue; }
  const allowed = lexicon.get(lessonId);
  const data = mode.data();
  const { items, bank, step } = data;
  if (!Array.isArray(items) || !Array.isArray(bank)) { fail(where, "data must be { step, items, bank }"); continue; }
  if (![1, 2, 3, 4].includes(step)) fail(where, `step must be 1..4, got ${JSON.stringify(step)}`);

  if (items.length < 6) fail(where, `only ${items.length} items (need >= 6)`);
  if (new Set(bank).size !== bank.length) fail(where, "bank has duplicates");
  // The sentence-initial capital is applied by the engine at render time. A bank
  // holding both "тук" and "Тук" would put two tiles for one word on screen.
  const byCase = new Map();
  for (const w of bank) {
    const k = w.toLowerCase();
    if (byCase.has(k) && byCase.get(k) !== w) fail(where, `bank has "${byCase.get(k)}" and "${w}" — same word, two tiles`);
    byCase.set(k, w);
  }

  const longest = Math.max(...items.map(i => i.slots.length));
  // A bank barely larger than the sentence degenerates into the `build` drill:
  // the learner would place every word it offers.
  if (bank.length < 4 * longest) {
    fail(where, `bank ${bank.length} words < 4x longest sentence (${longest} slots)`);
  }

  for (const w of bank) {
    if (!allowed.has(normWord(w))) fail(where, `bank word "${w}" is not in the ${lessonId} lexicon`);
  }
  for (const it of items) {
    if (it.slots.length < 2) fail(where, `item "${it.slots.map(s => s.word).join(" ")}" has < 2 slots`);
    // The bank holds each word once, so the engine offers one tile per word. A
    // sentence using the same word twice could never be filled and would leave
    // the learner stuck with no way to submit.
    const words = it.slots.map(s => s.word);
    const twice = words.filter((w, i) => words.indexOf(w) !== i);
    if (twice.length) fail(where, `item "${words.join(" ")}" repeats "${[...new Set(twice)].join('", "')}" — one tile per word, unfillable`);
    for (const s of it.slots) {
      if (!bank.includes(s.word)) fail(where, `slot word "${s.word}" is missing from the bank`);
      if (!allowed.has(normWord(s.word))) fail(where, `slot word "${s.word}" is not in the ${lessonId} lexicon`);
      for (const loc of ["ru", "uk"]) {
        if (!s.role?.[loc]) fail(where, `slot "${s.word}" has no ${loc} role label`);
      }
    }
    for (const loc of ["ru", "uk"]) {
      if (!it.translation?.[loc]) fail(where, `item "${it.slots.map(s => s.word).join(" ")}" has no ${loc} translation`);
    }
    if (it.alt !== undefined) {
      // Below step 3 the frame fixes both order and length, so no alternative
      // word order is reachable and an `alt` here would be dead data.
      if (step < 3) fail(where, `item "${it.slots.map(s => s.word).join(" ")}" has alt at step ${step}`);
      if (!Array.isArray(it.alt) || it.alt.length === 0) fail(where, "alt must be a non-empty array");
      const canon = it.slots.map(s => s.word).join(" ").toLowerCase();
      for (const a of it.alt) {
        if (a.toLowerCase() === canon) fail(where, `alt "${a}" repeats the canonical sentence`);
        const aw = String(a).split(/\s+/);
        const adup = aw.filter((w, i) => aw.indexOf(w) !== i);
        if (adup.length) fail(where, `alt "${a}" repeats "${[...new Set(adup)].join('", "')}" — one tile per word, unfillable`);
        for (const w of aw) {
          if (!bank.includes(w)) fail(where, `alt word "${w}" (in "${a}") is missing from the bank`);
          if (!allowed.has(normWord(w))) fail(where, `alt word "${w}" is not in the ${lessonId} lexicon`);
        }
      }
    }
    // useGame swallows itemKey errors in a try/catch, so an unknown item shape
    // would silently disable mastery instead of failing loudly. Assert it here.
    try { itemKey(it); }
    catch { fail(where, `itemKey does not recognise the frame item shape — mastery would be dropped`); }
  }
}

// FR-FRAME-LADDER: support fades as the course advances. Across lessons in order
// the step never drops, and every step is actually reached.
const frameOfLesson = l => ALL_MODES.find(m => m.type === "frame" && lessonOfMode.get(m.id) === l.id);
const ladder = LESSONS.map(l => frameOfLesson(l)?.data().step);
for (let i = 1; i < ladder.length; i++) {
  if (ladder[i] < ladder[i - 1]) {
    fail("src/data/frames.ts", `step drops from ${ladder[i - 1]} (${LESSONS[i - 1].id}) to ${ladder[i]} (${LESSONS[i].id})`);
  }
}
for (const s of [1, 2, 3, 4]) {
  if (!ladder.includes(s)) fail("src/data/frames.ts", `no lesson uses step ${s}`);
}

console.log(`Checked ${frameModes.length} frame modes against ${LESSONS.length} cumulative lexicons.`);
for (const lesson of LESSONS) {
  const mode = frameOfLesson(lesson);
  const size = lexicon.get(lesson.id).size;
  const d = mode ? mode.data() : null;
  const alts = d ? d.items.filter(i => i.alt).length : 0;
  console.log(
    `  ${lesson.id}  lexicon ${String(size).padStart(4)}  ${mode ? mode.id.padEnd(12) : "—".padEnd(12)}` +
    ` step ${d ? d.step : "?"}  ${d ? d.items.length : 0} items (${alts} with alt), bank ${d ? d.bank.length : 0}`,
  );
}

if (failures.length) {
  console.error(`\nFAIL: ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log("\nOK: every frame word comes from its lesson's cumulative lexicon.");
