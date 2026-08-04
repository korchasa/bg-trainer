import type { ReactNode } from "react";

/**
 * FR-QUESTION-PINNED: the tap targets, pinned to the **bottom** of the play area
 * — the mirror of `StickyQuestion`, for the one drill where pinning the answer
 * area is arithmetically impossible.
 *
 * `paradigm` has the same mechanic as the sentence drills: the learner taps a
 * form at the foot of the screen and it lands in a row above. At 375x667 and
 * text scale 1.3 the drill runs 895px in a 594px play area, and scrolled down to
 * the forms the worked-example row — which IS this mode's model, which is why no
 * example text is printed above it — sits entirely off-screen, with the next row
 * showing 8px of its 63.
 *
 * Pinning the rows with the verb, the way `frame` and `build` pin theirs, does
 * not fit: 125px of pinned verb plus 429px of rows is 554px of 594, leaving 40px
 * for a pool that needs 90. Pinning the pool instead costs the same 90px and
 * leaves 379px for the rows to scroll through — about one row's worth of
 * movement, with the model and the slot being filled both in view. It works here
 * and nowhere else because this drill's size is fixed: six pronouns, six forms,
 * every lesson. `frame`'s bank grows to 39 words and could never be pinned.
 *
 * Same two invisible rules as `StickyQuestion`, and one that flips:
 *
 * - It must be a **direct child of the engine's scroll root**, or it comes
 *   unstuck the moment its wrapper scrolls past.
 * - The offset must cancel the scroll root's `p-4 xs:p-6`, since a sticky child
 *   sticks to the scrollport's padding edge; the block's own padding puts the
 *   content back inside.
 * - It has to be the **last child in the flow**. A bottom-sticky element settles
 *   into its natural position once you reach it; anything rendered after it
 *   would sit below and stay unreachable behind the pinned block.
 */
export function StickyPool({ children }: { children: ReactNode }) {
  return (
    <div className="sticky -bottom-4 xs:-bottom-6 z-30 -mx-4 xs:-mx-6 w-[calc(100%+2rem)] xs:w-[calc(100%+3rem)] px-4 xs:px-6 pt-3 pb-4 xs:pb-6 bg-white mt-auto">
      {children}
    </div>
  );
}
