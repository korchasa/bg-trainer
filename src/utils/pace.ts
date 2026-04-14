import type { SessionPace } from "../types";
import { DEFAULT_PACE, PACE_STORAGE_KEY } from "../constants";

const VALID: SessionPace[] = ["quick", "standard", "deep"];

export function loadPace(): SessionPace {
  try {
    const raw = localStorage.getItem(PACE_STORAGE_KEY);
    if (raw && (VALID as string[]).includes(raw)) return raw as SessionPace;
  } catch {
    // ignore
  }
  return DEFAULT_PACE;
}

export function savePace(p: SessionPace): void {
  try {
    localStorage.setItem(PACE_STORAGE_KEY, p);
  } catch {
    // Quota exceeded — silently ignore
  }
}
