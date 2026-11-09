// FR-IOS-REVIEW
// When to ask iOS for an App Store rating. Pure: no platform or storage import,
// and the calendar day is passed in, so `scripts/review.ts` can replay sessions
// over several days against it outside Vite.

import { isTrophy } from "./sessionShare";

/** Finished sessions (results screen reached) before the request is due. */
export const REVIEW_AFTER_SESSIONS = 3;

/** Local calendar day, `YYYY-MM-DD`; string order is date order. */
const DAY = /^\d{4}-\d{2}-\d{2}$/;

export interface ReviewState {
  /** Finished sessions since the last request, counted only in versions not yet asked. */
  finished: number;
  /** `CFBundleShortVersionString` of the version the request was last sent in. */
  askedVersion: string | null;
  /** Local day of the first finished session; nothing is due on that day. */
  firstDay: string | null;
}

export const FRESH_REVIEW_STATE: ReviewState = { finished: 0, askedVersion: null, firstDay: null };

/** `date` as a local calendar day, `YYYY-MM-DD`. */
export function localDay(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function requireVersion(version: string): void {
  if (!version) throw new Error("app version is empty — cannot apply the once-per-version rule");
}

function requireDay(day: string): void {
  if (!DAY.test(day)) throw new Error(`calendar day must be YYYY-MM-DD, got "${day}"`);
}

/**
 * One more finished session on `today`. The first one records its day.
 * Sessions in a version already asked do not count.
 */
export function countFinished(state: ReviewState, version: string, today: string): ReviewState {
  requireVersion(version);
  requireDay(today);
  const firstDay = state.firstDay ?? today;
  if (state.askedVersion === version) return { ...state, firstDay };
  return { ...state, finished: state.finished + 1, firstDay };
}

/** 3+ finished sessions, this version not asked yet, and not the first day of use. */
export function isReviewDue(state: ReviewState, version: string, today: string): boolean {
  requireVersion(version);
  requireDay(today);
  return state.askedVersion !== version &&
    state.finished >= REVIEW_AFTER_SESSIONS &&
    state.firstDay !== null && today > state.firstDay;
}

/**
 * Ask now: due, and the session just finished was a success (🏆, `share` ≥ 0.8).
 * A due state with a weaker result stays due for a later 🏆 result.
 */
export function shouldRequestReview(
  state: ReviewState,
  version: string,
  today: string,
  share: number | null,
): boolean {
  return isReviewDue(state, version, today) && isTrophy(share);
}

/** Called when the request is actually sent: a later version needs 3 new sessions. */
export function markRequested(state: ReviewState, version: string): ReviewState {
  requireVersion(version);
  return { finished: 0, askedVersion: version, firstDay: state.firstDay };
}

/**
 * `null` (never stored) reads as fresh; anything else must be a valid state or
 * this throws. A state stored before `firstDay` existed reads with `firstDay =
 * today`, so a learner updating mid-streak is not asked on the update's first day.
 */
export function parseReviewState(raw: string | null, today: string): ReviewState {
  requireDay(today);
  if (raw === null) return FRESH_REVIEW_STATE;
  const v: unknown = JSON.parse(raw);
  const r = v as Partial<ReviewState>;
  if (
    typeof v !== "object" || v === null ||
    typeof r.finished !== "number" ||
    !(r.askedVersion === null || typeof r.askedVersion === "string") ||
    !(r.firstDay === undefined || r.firstDay === null ||
      (typeof r.firstDay === "string" && DAY.test(r.firstDay)))
  ) {
    throw new Error(`stored rating-request state is malformed: ${raw}`);
  }
  return {
    finished: r.finished,
    askedVersion: r.askedVersion,
    firstDay: r.firstDay === undefined ? today : r.firstDay,
  };
}
