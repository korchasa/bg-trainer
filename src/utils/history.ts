import { STORAGE_KEY } from "../constants";
import type { HistoryEntry } from "../types";
import { getRaw, removeRaw, setRaw } from "./storage";

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = getRaw(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as HistoryEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveHistory(h: HistoryEntry[]): void {
  setRaw(STORAGE_KEY, JSON.stringify(h.slice(-200)));
}

export function clearHistory(): void {
  removeRaw(STORAGE_KEY);
}
