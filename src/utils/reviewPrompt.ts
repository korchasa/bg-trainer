// FR-IOS-REVIEW
// When to ask iOS for an App Store rating. Pure: no platform or storage import,
// so `scripts/review.ts` can replay sessions against it outside Vite.

/** Finished sessions (results screen reached) before the request is due. */
export const REVIEW_AFTER_SESSIONS = 3;

export interface ReviewState {
  /** Finished sessions since the last request, counted only in versions not yet asked. */
  finished: number;
  /** `CFBundleShortVersionString` of the version the request was last sent in. */
  askedVersion: string | null;
}

export const FRESH_REVIEW_STATE: ReviewState = { finished: 0, askedVersion: null };

function requireVersion(version: string): void {
  if (!version) throw new Error("app version is empty — cannot apply the once-per-version rule");
}

/** One more finished session. Sessions in a version already asked do not count. */
export function countFinished(state: ReviewState, version: string): ReviewState {
  requireVersion(version);
  if (state.askedVersion === version) return state;
  return { ...state, finished: state.finished + 1 };
}

export function isReviewDue(state: ReviewState, version: string): boolean {
  requireVersion(version);
  return state.askedVersion !== version && state.finished >= REVIEW_AFTER_SESSIONS;
}

/** Called when the request is actually sent: a later version needs 3 new sessions. */
export function markRequested(_state: ReviewState, version: string): ReviewState {
  requireVersion(version);
  return { finished: 0, askedVersion: version };
}

/** `null` (never stored) reads as fresh; anything else must be a valid state or this throws. */
export function parseReviewState(raw: string | null): ReviewState {
  if (raw === null) return FRESH_REVIEW_STATE;
  const v: unknown = JSON.parse(raw);
  if (
    typeof v !== "object" || v === null ||
    typeof (v as ReviewState).finished !== "number" ||
    !((v as ReviewState).askedVersion === null || typeof (v as ReviewState).askedVersion === "string")
  ) {
    throw new Error(`stored rating-request state is malformed: ${raw}`);
  }
  return { finished: (v as ReviewState).finished, askedVersion: (v as ReviewState).askedVersion };
}
