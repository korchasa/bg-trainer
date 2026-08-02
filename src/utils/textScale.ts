// FR-A11Y-TEXT: user-controlled text size.
//
// Every Tailwind size is expressed in rem, and the root font-size is
// `calc(16px * var(--fs-scale))`, so one CSS variable scales the whole UI.
//
// The "system" setting follows the iOS Dynamic Type setting. WKWebView resolves
// the `-apple-system-body` font shorthand against the user's chosen text size,
// so measuring a probe element yields the system preference without a native
// plugin. The ratio is capped: at accessibility sizes `-apple-system-body`
// reaches ~53px (3.1x), which would break fixed-height controls and force
// horizontal scrolling. 1.4x is the largest step the current layout survives.

import { getRaw, setRaw } from "./storage";

export const TEXT_SCALES = ["system", "normal", "large", "xlarge"] as const;
export type TextScale = (typeof TEXT_SCALES)[number];

export const TEXT_SCALE_STORAGE_KEY = "bg-trainer-textscale-v1";
export const DEFAULT_TEXT_SCALE: TextScale = "system";

/** Dynamic Type "Large" — the iOS default — resolves `-apple-system-body` to 17px. */
const DYNAMIC_TYPE_BASELINE_PX = 17;
const MIN_SCALE = 1;
const MAX_SCALE = 1.4;

const MANUAL_SCALE: Record<Exclude<TextScale, "system">, number> = {
  normal: 1,
  large: 1.15,
  xlarge: 1.3,
};

/**
 * Reads the system text size by measuring a probe styled with the
 * `-apple-system-body` shorthand. Returns 1 wherever that shorthand is not
 * honoured (every non-WebKit engine), which keeps the web build at its
 * designed size instead of guessing.
 */
export function measureSystemScale(): number {
  if (typeof document === "undefined") return MIN_SCALE;
  const probe = document.createElement("div");
  probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none;font:-apple-system-body";
  document.body.appendChild(probe);
  const px = parseFloat(getComputedStyle(probe).fontSize);
  probe.remove();
  if (!Number.isFinite(px) || px <= 0) return MIN_SCALE;
  return clamp(px / DYNAMIC_TYPE_BASELINE_PX);
}

export function resolveScale(setting: TextScale): number {
  return setting === "system" ? measureSystemScale() : MANUAL_SCALE[setting];
}

export function applyTextScale(setting: TextScale): void {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--fs-scale", String(resolveScale(setting)));
}

export function loadTextScale(): TextScale {
  const raw = getRaw(TEXT_SCALE_STORAGE_KEY);
  if (raw && (TEXT_SCALES as readonly string[]).includes(raw)) return raw as TextScale;
  return DEFAULT_TEXT_SCALE;
}

export function saveTextScale(s: TextScale): void {
  setRaw(TEXT_SCALE_STORAGE_KEY, s);
}

function clamp(v: number): number {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, v));
}
