/**
 * The word bank is sorted in `frame` and shuffled everywhere else, and that
 * difference is deliberate.
 *
 * `frame`'s bank belongs to the mode, not to the item: 29–39 words, the same on
 * every question. The learner recalls the word first and only then goes looking
 * for it among 39 tiles spread over 940px, so the search practises nothing and
 * competes for the attention the recall needs. Sorting also costs less than it
 * looks: the bank was shuffled once per **session**, so the order was already
 * stable within a session and positions were already learnable — the drill paid
 * for a fixed order without getting predictability back. Alphabetical order
 * removes the reason to learn positions at all.
 *
 * `build` and `paradigm` are the opposite case. Their pool holds the item's own
 * three-to-eight words, so there is no search to remove, and the arrangement IS
 * what the learner is being asked for. Any systematic order hands over an
 * anchor, and an alphabetical one will sometimes coincide with the sentence and
 * give the answer away outright.
 *
 * The two rules read as an inconsistency to anyone tidying up, which is why they
 * are asserted rather than left to a comment.
 *
 * Run: `deno task test` (or `deno run -A scripts/bank.ts`).
 */

const FRAME = "src/components/engines/FrameEngine.tsx";
const SHUFFLED = [
  {
    file: "src/components/engines/BuildEngine.tsx",
    pool: "shuffle(target)",
    what: "the sentence's own words",
  },
  {
    file: "src/components/engines/ParadigmEngine.tsx",
    pool: "shuffle(item.forms",
    what: "the paradigm's own forms",
  },
];

export async function checkBank(): Promise<void> {
  const failures: string[] = [];

  const frame = await Deno.readTextFile(FRAME);
  if (!/localeCompare\([^)]*"bg"/.test(frame)) {
    failures.push(
      `${FRAME} — the bank is not sorted with a Bulgarian collation. A plain string sort puts ` +
        `the capitalised proper nouns (България, Иван, Мария) in a block ahead of every ` +
        `lowercase word, because uppercase Cyrillic sorts below it by code point.`,
    );
  }
  if (/shuffle\(bank\)/.test(frame)) {
    failures.push(
      `${FRAME} — the bank is shuffled again; the learner is back to scanning 39 tiles for a ` +
        `word they have already recalled`,
    );
  }

  for (const spec of SHUFFLED) {
    const src = await Deno.readTextFile(spec.file);
    if (!src.includes(spec.pool)) {
      failures.push(
        `${spec.file} — no longer shuffles ${spec.what}. Here the arrangement is the answer, so ` +
          `any fixed order is an anchor and an alphabetical one can coincide with the sentence ` +
          `and give it away.`,
      );
    }
    if (/localeCompare/.test(src)) {
      failures.push(
        `${spec.file} — sorts its pool. That is right for frame's mode-wide bank and wrong here ` +
          `for the same reason: this pool holds the item's own words.`,
      );
    }
  }

  console.log(`Scanned ${FRAME} and ${SHUFFLED.length} shuffled engines.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: the mode-wide bank is sorted, the per-item pools are shuffled.");
}

if (import.meta.main) await checkBank();
