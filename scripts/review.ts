/**
 * FR-IOS-REVIEW: the rule that decides when the iOS app asks for a rating.
 *
 * The rule is small and every mistake in it is invisible on screen: Apple shows
 * the sheet at most three times a year and may skip it silently, so a prompt
 * that fires too early, after a failed session, on the first day, twice in one
 * version, or never again after an update looks exactly like Apple's own
 * throttling. The only place it can be seen is here, by replaying sessions
 * against the pure module.
 *
 * `utils/reviewPrompt.ts` and `utils/sessionShare.ts` import neither
 * `utils/platform.ts` nor `utils/storage.ts` (both read `import.meta.env`), so
 * they load outside Vite. The calendar day is injected, never read from the clock.
 *
 * Run: `deno task test` (or `deno run -A scripts/review.ts`).
 */

import { fail } from "./lib.ts";
import {
  countFinished,
  FRESH_REVIEW_STATE,
  isReviewDue,
  localDay,
  markRequested,
  parseReviewState,
  REVIEW_AFTER_SESSIONS,
  type ReviewState,
  shouldRequestReview,
} from "../src/utils/reviewPrompt.ts";
import { isTrophy, shareCorrect } from "../src/utils/sessionShare.ts";

const RESULTS = "src/components/screens/ResultsScreen.tsx";
const APP = "src/App.tsx";

const DAY1 = "2026-11-09";
const DAY2 = "2026-11-10";
const DAY3 = "2026-11-11";

/**
 * Plays `n` finished sessions in `version` on `day`, each with result `share`,
 * and returns whether the request would be sent after each one.
 */
function play(
  state: ReviewState,
  version: string,
  day: string,
  share: number | null,
  n: number,
): [ReviewState, boolean[]] {
  const asked: boolean[] = [];
  let s = state;
  for (let i = 0; i < n; i++) {
    s = countFinished(s, version, day);
    asked.push(shouldRequestReview(s, version, day, share));
  }
  return [s, asked];
}

function throws(fn: () => unknown): boolean {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
}

export async function checkReviewPrompt(): Promise<void> {
  const problems: string[] = [];
  const expect = (ok: boolean, what: string) => {
    if (!ok) problems.push(what);
  };

  // One definition of success, shared with the 🏆 on the results screen.
  expect(
    shareCorrect(1, 5) === 0.8 && isTrophy(shareCorrect(1, 5)),
    "1 error of 5 (80%) must be a trophy",
  );
  expect(!isTrophy(shareCorrect(2, 9)), "2 errors of 9 (78%) must not be a trophy");
  expect(shareCorrect(9, 5) === 0, "more errors than answers must clamp to 0");
  expect(
    shareCorrect(0, 0) === null && !isTrophy(null),
    "an empty session has no share and no trophy",
  );

  // Calendar day from an injected date, in local time.
  expect(localDay(new Date(2026, 10, 9, 23, 59)) === DAY1, "23:59 local must stay on its own day");
  expect(
    localDay(new Date(2026, 0, 5, 0, 0)) === "2026-01-05",
    "localDay must zero-pad month and day",
  );

  // First day: three trophy sessions on the day of the first one ask nothing.
  let [s, asked] = play(FRESH_REVIEW_STATE, "1.3", DAY1, 1, REVIEW_AFTER_SESSIONS);
  expect(asked.every((a) => !a), `1.3 first day: asked = ${asked.join()}, want all false`);
  expect(s.firstDay === DAY1, `first finished session must record its day, got ${s.firstDay}`);
  expect(isReviewDue(s, "1.3", DAY1) === false, "nothing is due on the first day of use");
  [s] = play(s, "1.3", DAY2, 0, 1);
  expect(s.firstDay === DAY1, `a later session must not move the first day (${s.firstDay})`);

  // Next day, due, but the result is below the trophy: no request, still due.
  expect(isReviewDue(s, "1.3", DAY2), "1.3 day 2 after 4 sessions must be due");
  expect(!shouldRequestReview(s, "1.3", DAY2, 0.79), "a 79% result must not ask");
  expect(!shouldRequestReview(s, "1.3", DAY2, null), "a session without answers must not ask");

  // Then a trophy result asks.
  [s, asked] = play(s, "1.3", DAY2, 0.8, 1);
  expect(asked[0] === true, "a trophy result after the first day, with 3+ sessions, must ask");

  // The request was never sent (results screen left before the delay): still due next time.
  const [notSent, askedAgain] = play(s, "1.3", DAY2, 1, 1);
  expect(askedAgain[0] === true, "1.3: a request that was never sent must stay due");

  // Sent: no more requests in the same version, however many trophy sessions follow.
  s = markRequested(notSent, "1.3");
  expect(s.firstDay === DAY1, "markRequested must keep the first day");
  [s, asked] = play(s, "1.3", DAY3, 1, 10);
  expect(asked.every((a) => !a), `1.3 after request: asked = ${asked.join()}, want all false`);
  expect(s.finished === 0, `1.3 after request: sessions still counted (${s.finished})`);

  // Next version: three NEW sessions again; the first-day rule does not repeat.
  [s, asked] = play(s, "1.4", DAY3, 1, REVIEW_AFTER_SESSIONS);
  expect(
    asked.join() === "false,false,true",
    `1.4: asked after sessions 1..3 = ${asked.join()}, want false,false,true`,
  );

  // Old stored state, written before the first-day field existed: first day = today.
  const old = parseReviewState('{"finished":3,"askedVersion":null}', DAY2);
  expect(old.firstDay === DAY2, `old state must read with first day = today, got ${old.firstDay}`);
  [s, asked] = play(old, "1.3", DAY2, 1, 1);
  expect(asked[0] === false, "old state: no request on the day it was first read");
  [s, asked] = play(s, "1.3", DAY3, 1, 1);
  expect(asked[0] === true, "old state: a trophy on a later day must ask");

  // Persistence round-trip and failure modes.
  const back = parseReviewState(JSON.stringify(s), DAY3);
  expect(
    back.finished === s.finished && back.askedVersion === s.askedVersion &&
      back.firstDay === s.firstDay,
    `round-trip changed the state: ${JSON.stringify(back)} vs ${JSON.stringify(s)}`,
  );
  const fresh = parseReviewState(null, DAY1);
  expect(
    fresh.finished === 0 && fresh.askedVersion === null && fresh.firstDay === null,
    `no stored value must read as fresh, got ${JSON.stringify(fresh)}`,
  );
  expect(throws(() => parseReviewState("{oops", DAY1)), "malformed JSON must throw");
  expect(throws(() => parseReviewState('{"finished":"3"}', DAY1)), "wrong shape must throw");
  expect(
    throws(() => parseReviewState('{"finished":3,"askedVersion":null,"firstDay":"9 Nov"}', DAY1)),
    "a malformed first day must throw",
  );
  expect(throws(() => countFinished(FRESH_REVIEW_STATE, "", DAY1)), "empty version must throw");
  expect(throws(() => countFinished(FRESH_REVIEW_STATE, "1.3", "")), "empty day must throw");

  // The results screen and the request read the same share and threshold.
  const results = await Deno.readTextFile(RESULTS);
  expect(
    results.includes("utils/sessionShare") && !/0\.8\b/.test(results),
    `${RESULTS} must take the share and the trophy threshold from utils/sessionShare`,
  );
  const app = await Deno.readTextFile(APP);
  expect(app.includes("shareCorrect("), `${APP} must pass shareCorrect(...) to the rating rule`);

  console.log("Replayed 25 sessions over versions 1.3 and 1.4 across three days.");
  if (problems.length) fail(`rating-request rule is broken:\n  ${problems.join("\n  ")}`);
  console.log(
    "OK: asks on a trophy result after the 3rd finished session, not on the first day, once per version.",
  );
}

if (import.meta.main) await checkReviewPrompt();
