/**
 * TEMPORARY — a switch for comparing two shapes of FR-QUESTION-PINNED in the
 * sentence-building engines, so the choice can be made by looking rather than
 * by arguing. Delete this file and both call sites once it is made.
 *
 * Default (`false`) pins the sentence alone: ~115px, the whole word bank stays
 * visible, but the slots being filled scroll out of sight.
 * `?pin=full` also pins the slots: everything the learner is working on stays
 * on screen, at the cost of 397px of 594 on a 375x667 screen at scale 1.3,
 * leaving about two rows of the bank.
 */
export const PIN_ANSWER_AREA =
  new URLSearchParams(globalThis.location.search).get("pin") === "full";
