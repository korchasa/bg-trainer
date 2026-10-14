// FR-IOS-UX: keep the app shell inside the part of the screen the keyboard leaves.
//
// The shell is sized by a `height: 100%` chain, i.e. to the whole screen, and
// `overflow: hidden` keeps the document from scrolling. Neither stops what iOS
// does when the keyboard opens: it shrinks the *visual* viewport and pans it
// down until the focused field is clear of the keyboard. That pan is not a
// document scroll, so `overflow: hidden` does not apply to it. Measured on an
// iPhone 17 simulator (iOS 26.5) in a typing drill: visual viewport 874 → 498px,
// offsetTop 0 → 374px — the nav header ended up 312px above the top edge.
//
// The fix gives iOS nothing to pan for: the root element takes the visual
// viewport's height, so the flex layout puts the field above the keyboard by
// itself, and any pan that already happened is undone. While the keyboard is
// up it also covers the home indicator, so `html.keyboard-open` lets the CSS
// drop the bottom safe-area padding and give those points back to the drill.
//
// While the page is pinch-zoomed (FR-A11Y-TEXT keeps zoom available) the visual
// viewport is small on purpose and panning it is the user's own navigation, so
// the shell goes back to `100%` and the pan is left alone.

import { IS_IOS } from "./platform";

const ZOOM_EPSILON = 0.01;

const keyboardOpenListeners = new Set<() => void>();

/**
 * Calls `cb` each time the shell has just shrunk for the keyboard — after the
 * new height is applied, so layout read inside `cb` is already the short one.
 * Returns the unsubscribe function. A no-op outside the iOS shell.
 */
export function onKeyboardOpen(cb: () => void): () => void {
  if (!IS_IOS) return () => {};
  keyboardOpenListeners.add(cb);
  return () => keyboardOpenListeners.delete(cb);
}

export function pinShellToVisualViewport(): void {
  const vv = window.visualViewport;
  if (!IS_IOS || !vv) return;
  const root = document.documentElement;
  let lastHeight = vv.height;
  // Portrait-only app (FR-IOS-APPSTORE), so the tallest height seen is the
  // keyboard-free one.
  let fullHeight = vv.height;

  const sync = () => {
    if (Math.abs(vv.scale - 1) > ZOOM_EPSILON) {
      root.style.height = "";
      root.classList.remove("keyboard-open");
      return;
    }
    fullHeight = Math.max(fullHeight, vv.height);
    root.style.height = `${vv.height}px`;
    root.classList.toggle("keyboard-open", vv.height < fullHeight);
    if (vv.offsetTop !== 0 || window.scrollY !== 0) window.scrollTo(0, 0);
    const shrank = vv.height < lastHeight;
    lastHeight = vv.height;
    if (shrank) keyboardOpenListeners.forEach((cb) => cb());
  };

  vv.addEventListener("resize", sync);
  vv.addEventListener("scroll", sync);
  sync();
}
