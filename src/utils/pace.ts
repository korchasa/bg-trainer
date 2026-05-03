import type { SessionPace } from "../types";
import { DEFAULT_PACE, PACE_STORAGE_KEY } from "../constants";
import { getRaw, setRaw } from "./storage";

const VALID: SessionPace[] = ["quick", "standard", "deep"];

export function loadPace(): SessionPace {
  const raw = getRaw(PACE_STORAGE_KEY);
  if (raw && (VALID as string[]).includes(raw)) return raw as SessionPace;
  return DEFAULT_PACE;
}

export function savePace(p: SessionPace): void {
  setRaw(PACE_STORAGE_KEY, p);
}
