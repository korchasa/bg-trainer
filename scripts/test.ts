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

export async function test(): Promise<void> {
  section("Data invariants: build-mode punctuation (FR-BUILD)");
  await checkPunctuation();
}

if (import.meta.main) await test();
