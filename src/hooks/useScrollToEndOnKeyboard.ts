import { type RefObject, useEffect } from "react";
import { onKeyboardOpen } from "../utils/keyboardViewport";
import { keyboardScrollTop } from "../utils/keyboardScroll";

/**
 * FR-IOS-UX: when the keyboard opens, scroll an engine's play area towards its end.
 *
 * Once the shell shrinks to the space above the keyboard
 * (`pinShellToVisualViewport`), a typing drill no longer fits: the field shows,
 * but the check button under it sits behind the keyboard. Scrolling the play
 * area to its end brings the field and the button up together, and the
 * question stays in view because it is pinned (FR-QUESTION-PINNED) — only the
 * repeated instruction above it scrolls away.
 *
 * At the largest text sizes the end goes too far: the field slides under the
 * pinned question. So the area is scrolled to its end, measured there, and
 * brought back until the field clears the question (`keyboardScrollTop`).
 */
export function useScrollToEndOnKeyboard(ref: RefObject<HTMLElement | null>): void {
  useEffect(
    () =>
      onKeyboardOpen(() => {
        const el = ref.current;
        if (!el) return;
        el.scrollTop = el.scrollHeight - el.clientHeight;
        const field = el.querySelector("input, textarea");
        const pinned = el.querySelector("[data-pinned-question]");
        el.scrollTop = keyboardScrollTop({
          end: el.scrollTop,
          fieldTop: field ? field.getBoundingClientRect().top : null,
          pinnedBottom: pinned ? pinned.getBoundingClientRect().bottom : null,
        });
      }),
    [ref],
  );
}
