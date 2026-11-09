/**
 * FR-IOS-REVIEW: the rule that decides when the iOS app asks for a rating.
 *
 * The rule is small and every mistake in it is invisible on screen: Apple shows
 * the sheet at most three times a year and may skip it silently, so a prompt
 * that fires too early, twice in one version, or never again after an update
 * looks exactly like Apple's own throttling. The only place it can be seen is
 * here, by replaying sessions against the pure module.
 *
 * `utils/reviewPrompt.ts` imports neither `utils/platform.ts` nor
 * `utils/storage.ts` (both read `import.meta.env`), so it loads outside Vite.
 *
 * Run: `deno task test` (or `deno run -A scripts/review.ts`).
 */

import { fail } from "./lib.ts";
import {
  countFinished,
  FRESH_REVIEW_STATE,
  isReviewDue,
  markRequested,
  parseReviewState,
  REVIEW_AFTER_SESSIONS,
  type ReviewState,
} from "../src/utils/reviewPrompt.ts";

/** Plays `n` finished sessions in `version` and returns the due flag after each. */
function play(state: ReviewState, version: string, n: number): [ReviewState, boolean[]] {
  const due: boolean[] = [];
  let s = state;
  for (let i = 0; i < n; i++) {
    s = countFinished(s, version);
    due.push(isReviewDue(s, version));
  }
  return [s, due];
}

function throws(fn: () => unknown): boolean {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
}

export function checkReviewPrompt(): void {
  const problems: string[] = [];
  const expect = (ok: boolean, what: string) => {
    if (!ok) problems.push(what);
  };

  // First version: nothing after sessions 1 and 2, due after the 3rd.
  let [s, due] = play(FRESH_REVIEW_STATE, "1.3", REVIEW_AFTER_SESSIONS);
  expect(
    due.join() === "false,false,true",
    `1.3 fresh: due after sessions 1..3 = ${due.join()}, want false,false,true`,
  );

  // The request was never sent (results screen left before the delay): still due next time.
  const [notSent, dueAgain] = play(s, "1.3", 1);
  expect(dueAgain[0] === true, "1.3: a request that was never sent must stay due");

  // Sent: no more requests in the same version, however many sessions follow.
  s = markRequested(notSent, "1.3");
  [s, due] = play(s, "1.3", 10);
  expect(due.every((d) => !d), `1.3 after request: due = ${due.join()}, want all false`);
  expect(s.finished === 0, `1.3 after request: sessions still counted (${s.finished})`);

  // Next version: three NEW sessions again.
  [s, due] = play(s, "1.4", REVIEW_AFTER_SESSIONS);
  expect(
    due.join() === "false,false,true",
    `1.4: due after sessions 1..3 = ${due.join()}, want false,false,true`,
  );

  // Persistence round-trip and failure modes.
  const back = parseReviewState(JSON.stringify(s));
  expect(
    back.finished === s.finished && back.askedVersion === s.askedVersion,
    `round-trip changed the state: ${JSON.stringify(back)} vs ${JSON.stringify(s)}`,
  );
  const fresh = parseReviewState(null);
  expect(
    fresh.finished === 0 && fresh.askedVersion === null,
    `no stored value must read as fresh, got ${JSON.stringify(fresh)}`,
  );
  expect(throws(() => parseReviewState("{oops")), "malformed JSON must throw");
  expect(throws(() => parseReviewState('{"finished":"3"}')), "wrong shape must throw");
  expect(throws(() => countFinished(FRESH_REVIEW_STATE, "")), "empty version must throw");

  console.log("Replayed 17 sessions over versions 1.3 and 1.4.");
  if (problems.length) fail(`rating-request rule is broken:\n  ${problems.join("\n  ")}`);
  console.log("OK: asks after the 3rd finished session, once per version.");
}

if (import.meta.main) checkReviewPrompt();
