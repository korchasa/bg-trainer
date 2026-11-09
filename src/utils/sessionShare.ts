// FR-RESULTS, FR-IOS-REVIEW
// How well a finished session went. One definition, read by the results screen
// (its 🏆) and by the rating request (asked only after a 🏆 result). Pure: no
// platform or storage import, so `scripts/review.ts` can load it outside Vite.

/** Share at or above which a session counts as a success: the 🏆 badge. */
export const TROPHY_SHARE = 0.8;

/**
 * FR-RESULTS: the share of answers the learner got right on the first attempt.
 *
 * Built from errors and answers rather than from the score, because the score
 * is in points and points per answer differ by mode — at 15 a piece a
 * 35-question `q_build` session cleared the old 80-point trophy with six answers
 * right out of thirty-five, while an 8-question `l2_frame` session at 10 a piece
 * needed all eight. `null` when the session asked nothing.
 */
export const shareCorrect = (errors: number, qsTotal: number): number | null =>
  qsTotal > 0 ? Math.max(0, 1 - errors / qsTotal) : null;

/** A session with no answers has no share and is never a trophy. */
export const isTrophy = (share: number | null): boolean => share !== null && share >= TROPHY_SHARE;
