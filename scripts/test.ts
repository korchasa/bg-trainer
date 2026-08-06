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
import { checkSticky } from "./sticky.ts";
import { checkFeedback } from "./feedback.ts";
import { checkClassNames } from "./classnames.ts";
import { checkBank } from "./bank.ts";
import { checkAccuracy } from "./accuracy.ts";
import { checkLexicon } from "./lexicon.ts";
import { checkLessons } from "./lessons.ts";

export async function test(): Promise<void> {
  section("Data invariants: build-mode punctuation (FR-BUILD)");
  await checkPunctuation();

  section("Data invariants: worked examples per mode (FR-TASK-MODEL)");
  await checkExamples();

  section("UI invariants: hint in the header modal (FR-HINT-MODAL)");
  await checkHints();

  section("UI invariants: question pinned to the top (FR-QUESTION-PINNED)");
  await checkSticky();

  section("UI invariants: verdict centred on screen (FR-FEEDBACK-CENTRED)");
  await checkFeedback();

  section("UI invariants: no Tailwind class built from a variable");
  await checkClassNames();

  section("UI invariants: bank sorted in frame, pools shuffled elsewhere (FR-FRAME)");
  await checkBank();

  section("Session invariants: accuracy measured against the session (FR-RESULTS, FR-ANALYTICS)");
  await checkAccuracy();

  section("Data invariants: frame lexicon and ladder (FR-FRAME, FR-FRAME-LADDER)");
  checkLexicon();

  section("Data invariants: every mode reachable through a lesson (FR-LESSONS)");
  checkLessons();
}

if (import.meta.main) await test();
