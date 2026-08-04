/**
 * FR-QUESTION-PINNED: every engine that has a question distinct from its answer
 * area renders that question inside `<StickyQuestion>`, as a direct child of
 * its scroll root.
 *
 * Two things this guards, both of which look correct in a diff and fail only on
 * a small screen at a large text size — the setup a reviewer does not have
 * open:
 *
 * - **Nesting.** A sticky element is confined to its parent's box. Moved back
 *   inside the centred block (where the question used to live, and where it
 *   reads more naturally) it comes unstuck the moment that block scrolls past,
 *   which is exactly when the answers appear and the pinning was supposed to
 *   start working. Asserted by indentation: the scroll root's own children sit
 *   at six spaces.
 * - **The offset.** The scroll root carries `p-4 xs:p-6`, and a sticky child
 *   sticks to the scrollport's padding edge. At `top-0` a padding-tall band
 *   above the block stays uncovered and content rides through it. The component
 *   cancels that with a negative offset; a well-meaning tidy-up to `top-0`
 *   brings the leak back.
 *
 * Scanned as text: the assertion is about how the files are written, and a
 * React tree cannot be interrogated for this at runtime.
 *
 * Run: `deno task test` (or `deno run -A scripts/sticky.ts`).
 */

const ENGINE_DIR = "src/components/engines";
const COMPONENT = "src/components/ui/StickyQuestion.tsx";
const POOL = "src/components/ui/StickyPool.tsx";
const POOL_ENGINE = "src/components/engines/ParadigmEngine.tsx";

/** Indentation of a direct child of the engine's scroll root. */
const DIRECT_CHILD = /^ {6}<StickyQuestion[ >]/m;
const POOL_DIRECT_CHILD = /^ {6}<StickyPool[ >]/m;

interface EngineSpec {
  file: string;
  /** What the pinned block must contain — the text that changes per question. */
  question: string;
  /**
   * Set where something beyond the question is pinned with it.
   *
   * The two sentence-building engines pin their answer area: the learner drops
   * words into slots from a bank far below, so a pinned question without the
   * slots would show the task and hide the work. `paradigm` pins its
   * worked-example row, which is not an answer area but a reference — it is
   * this mode's model, filled before the learner acts, and the reason no
   * example text is printed above the paradigm. Left in the scrolling block it
   * disappears exactly when the last rows are being filled.
   *
   * Everywhere else the answers are the tappable options themselves and pinning
   * them would leave nothing to scroll.
   */
  answerArea?: string;
  /** What breaks when `answerArea` is not pinned. Goes into the failure line. */
  whyPinned?: string;
}

/**
 * Engines with a question distinct from the answer area. `MatchEngine` and
 * `LiEngine` are deliberately absent: in both, the only thing that changes per
 * question IS the answer area (two columns of tiles, a sentence with tappable
 * gaps), so there is nothing to pin above it.
 */
const ENGINES: EngineSpec[] = [
  {
    file: "BuildEngine.tsx",
    question: "L(item.translation)",
    answerArea: "{template}",
    whyPinned: "the learner would watch the sentence while the slots they fill scroll away",
  },
  {
    file: "FrameEngine.tsx",
    question: "L(item.translation)",
    answerArea: "{answerArea}",
    whyPinned: "the learner would watch the sentence while the slots they fill scroll away",
  },
  { file: "NegEngine.tsx", question: "Lq(item.q)" },
  { file: "OddOneOutEngine.tsx", question: "L(item.hint)" },
  {
    file: "ParadigmEngine.tsx",
    question: "item.verb",
    answerArea: "row(item.pronouns[GIVEN], GIVEN)",
    whyPinned: "this mode's worked example would leave the screen exactly while the last rows " +
      "are filled, and no example text is printed above the paradigm to replace it",
  },
  { file: "PickEngine.tsx", question: "Lq(item.q)" },
  { file: "PickFromEngine.tsx", question: "Lq(item.q)" },
  { file: "PickOptEngine.tsx", question: "Lq(item.q)" },
  { file: "TimedEngine.tsx", question: "Lq(item.q)" },
  { file: "TypeEngine.tsx", question: "Lq(item.q)" },
];

/** Text of the `<StickyQuestion>…</StickyQuestion>` element, or null. */
function pinnedBlock(src: string): string | null {
  const open = src.indexOf("<StickyQuestion");
  if (open === -1) return null;
  const close = src.indexOf("</StickyQuestion>", open);
  if (close === -1) return null;
  return src.slice(open, close);
}

export async function checkSticky(): Promise<void> {
  const failures: string[] = [];

  const comp = await Deno.readTextFile(COMPONENT);
  if (!/\bsticky\b/.test(comp)) {
    failures.push(`${COMPONENT} — not sticky; the question scrolls away with everything else`);
  }
  if (!/-top-4/.test(comp)) {
    failures.push(
      `${COMPONENT} — no negative sticky offset, so the scroll root's own padding leaves an ` +
        `uncovered band above the question and content rides through it`,
    );
  }
  if (!/-mx-4/.test(comp) || !/w-\[calc\(100%\+2rem\)\]/.test(comp)) {
    failures.push(`${COMPONENT} — not full-bleed; answer tiles show through the side gutters`);
  }
  if (!/bg-white/.test(comp)) {
    failures.push(`${COMPONENT} — transparent, so the answers scroll through the question`);
  }

  for (const spec of ENGINES) {
    const path = `${ENGINE_DIR}/${spec.file}`;
    const src = await Deno.readTextFile(path);

    if (!src.includes("<StickyQuestion")) {
      failures.push(`${path} — question is not pinned; it scrolls away on the way to the answers`);
      continue;
    }
    if (!DIRECT_CHILD.test(src)) {
      failures.push(
        `${path} — <StickyQuestion> is not a direct child of the scroll root, so it comes ` +
          `unstuck as soon as its wrapper scrolls past`,
      );
    }
    const block = pinnedBlock(src);
    if (block === null) {
      failures.push(`${path} — <StickyQuestion> is not closed; cannot tell what it pins`);
      continue;
    }
    if (!block.includes(spec.question)) {
      failures.push(
        `${path} — the pinned block does not render \`${spec.question}\`, so what stays on ` +
          `screen is not the question`,
      );
    }
    if (spec.answerArea && !block.includes(spec.answerArea)) {
      failures.push(
        `${path} — the pinned block does not render \`${spec.answerArea}\`; ${spec.whyPinned}`,
      );
    }
  }

  // The paradigm drill pins the opposite end. Its six rows and its pool of forms
  // are both fixed in size, so what does not fit is fixed too: pinning the rows
  // with the verb would take 554px of the 594px play area and leave no room for
  // the pool at all. Pinning the pool instead keeps the forms under the thumb
  // while the rows — including the worked-example row that IS this mode's model —
  // stay in view above them.
  // Read tolerantly: a deleted component should read as a named failure here, not
  // as a stack trace that buries which invariant broke.
  const pool = await Deno.readTextFile(POOL).catch(() => "");
  if (pool === "") {
    failures.push(`${POOL} — missing; nothing pins the pool of forms`);
  }
  if (!/\bsticky\b/.test(pool)) {
    failures.push(`${POOL} — not sticky; the forms scroll away from the rows they fill`);
  }
  if (!/-bottom-4/.test(pool)) {
    failures.push(
      `${POOL} — no negative sticky offset, so the scroll root's own padding leaves an ` +
        `uncovered band below the pool and rows ride through it`,
    );
  }
  if (!/-mx-4/.test(pool) || !/w-\[calc\(100%\+2rem\)\]/.test(pool)) {
    failures.push(`${POOL} — not full-bleed; rows show through the side gutters`);
  }
  if (!/bg-white/.test(pool)) {
    failures.push(`${POOL} — transparent, so the rows scroll through the forms`);
  }

  const poolEngine = await Deno.readTextFile(POOL_ENGINE);
  if (!poolEngine.includes("<StickyPool")) {
    failures.push(
      `${POOL_ENGINE} — the pool of forms is not pinned; at a large text size the learner taps ` +
        `it with the example row and the slot being filled both off-screen`,
    );
  } else if (!POOL_DIRECT_CHILD.test(poolEngine)) {
    failures.push(
      `${POOL_ENGINE} — <StickyPool> is not a direct child of the scroll root, so it comes ` +
        `unstuck as soon as its wrapper scrolls past`,
    );
  }

  console.log(`Scanned ${ENGINES.length} engines, ${COMPONENT} and ${POOL}.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: every engine pins its question to the top of the play area.");
}

if (import.meta.main) await checkSticky();
