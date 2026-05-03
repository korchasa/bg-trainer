// FR-IOS-UX: respect the user's "Reduce Motion" accessibility setting.
// On iOS WKWebView this maps to Settings → Accessibility → Motion → Reduce Motion.
// On the web it follows the platform-native media query.
export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch {
    return false;
  }
}
