import { type RefObject, useEffect } from "react";
import { onKeyboardOpen } from "../utils/keyboardViewport";

/**
 * FR-IOS-UX: when the keyboard opens, scroll an engine's play area to its end.
 *
 * Once the shell shrinks to the space above the keyboard
 * (`pinShellToVisualViewport`), a typing drill no longer fits: the field shows,
 * but the check button under it sits behind the keyboard. Scrolling the play
 * area to its end brings the field and the button up together, and the
 * question stays in view because it is pinned (FR-QUESTION-PINNED) — only the
 * repeated instruction above it scrolls away.
 */
export function useScrollToEndOnKeyboard(ref: RefObject<HTMLElement | null>): void {
  useEffect(
    () =>
      onKeyboardOpen(() => {
        const el = ref.current;
        if (el) el.scrollTop = el.scrollHeight - el.clientHeight;
      }),
    [ref],
  );
}
