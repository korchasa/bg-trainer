// FR-IOS-UX: where a typing drill leaves its scroll when the keyboard opens.
//
// Pure, with no import of `platform.ts`, so `scripts/keyboard.ts` can replay it.

/** Space kept between the pinned question's bottom edge and the field, in px. */
export const FIELD_GAP = 8;

/**
 * The play area's scrollTop once the keyboard is up.
 *
 * The drill wants its end in view, so the check button comes up above the
 * keyboard. At the largest text sizes the field and the button do not both fit
 * under the pinned question (FR-QUESTION-PINNED), and the end slides the field
 * under it, hiding what the learner types. The field wins: scroll back by the
 * overlap, never above the top. The button is still one swipe away, and the
 * keyboard's own return key submits.
 *
 * All three numbers are taken with the area scrolled to its end: `end` is that
 * scrollTop, `fieldTop` and `pinnedBottom` are viewport coordinates. `null`
 * means the element is absent, and then the end stands.
 */
export function keyboardScrollTop(m: {
  end: number;
  fieldTop: number | null;
  pinnedBottom: number | null;
}): number {
  if (m.fieldTop === null || m.pinnedBottom === null) return m.end;
  const overlap = m.pinnedBottom + FIELD_GAP - m.fieldTop;
  return Math.max(0, m.end - Math.max(0, overlap));
}
