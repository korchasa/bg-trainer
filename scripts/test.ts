/**
 * `deno task test` — the repository's automated assertions.
 *
 * There is no unit-test suite yet: what exists are invariants over the lesson
 * data, which is where this app's bugs actually live (a stray punctuation token
 * in `words[]` becomes a tile the learner has to hunt for). They run here so
 * `check` runs them too.
 */

import { section } from "./lib.ts";
import { checkPunctuation } from "./punct.ts";
import { checkExamples } from "./examples.ts";
import { checkHints } from "./hint.ts";
import { checkStimulus } from "./stimulus.ts";
import { checkFeedback } from "./feedback.ts";
import { checkLexicon } from "./lexicon.ts";

export async function test(): Promise<void> {
  section("Data invariants: build-mode punctuation (FR-BUILD)");
  await checkPunctuation();

  section("Data invariants: worked examples per mode (FR-TASK-MODEL)");
  await checkExamples();

  section("UI invariants: hint in the header modal (FR-HINT-MODAL)");
  await checkHints();

  section("UI invariants: changing text next to the bank (FR-STIMULUS-NEAR-BANK)");
  await checkStimulus();

  section("UI invariants: verdict centred on screen (FR-FEEDBACK-CENTRED)");
  await checkFeedback();

  section("Data invariants: frame lexicon and ladder (FR-FRAME, FR-FRAME-LADDER)");
  checkLexicon();
}

if (import.meta.main) await test();
