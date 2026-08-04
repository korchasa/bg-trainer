import type { ReactNode } from "react";

/**
 * FR-QUESTION-PINNED: the part of the screen that says what is being asked,
 * pinned to the top of the play area so scrolling to the answers cannot take it
 * out of view.
 *
 * Every engine lays its screen out the same way: a constant instruction with a
 * worked example, then the question, then the answers. At the accessibility
 * text sizes that stack is taller than a phone screen — measured on 375x667 at
 * scale 1.3, nine of the fourteen lesson-1 modes overflow, the frame drill by
 * 1063px — so reaching the answers pushes the question off the top and the
 * learner taps with nothing to answer.
 *
 * Only the question is pinned. The instruction and the example repeat verbatim
 * on every question and are the tallest part of that stack (120–155px against
 * the question's 63–126px), so pinning them would spend the screen on text the
 * learner has already read. Pinned this way the block costs 11–21% of the play
 * area.
 *
 * Placement rules, both of which are silent when broken:
 *
 * - It must be a **direct child of the engine's scroll root**. A sticky element
 *   is confined to its parent's box, so nested inside the centred block it
 *   would come unstuck exactly when that block scrolls past — which is the
 *   moment the answers come into view and the pinning was supposed to start.
 * - The scroll root carries `p-4 xs:p-6`, and a sticky child sticks to the
 *   scrollport's padding edge, not to its visible top. Left at `top-0` a
 *   one-padding-tall band above the block stays uncovered and content rides
 *   through it. The negative offset cancels the padding and the block's own
 *   padding puts it back inside; both are rem-based, so they track `--fs-scale`
 *   together.
 *
 * The full-bleed width exists for the same reason: an opaque block narrower
 * than the scrollport lets answer tiles show through the side gutters.
 */
export function StickyQuestion({ children }: { children: ReactNode }) {
  return (
    <div className="sticky -top-4 xs:-top-6 z-30 -mx-4 xs:-mx-6 w-[calc(100%+2rem)] xs:w-[calc(100%+3rem)] px-4 xs:px-6 pt-4 xs:pt-6 pb-3 bg-white flex flex-col items-center">
      {children}
    </div>
  );
}
