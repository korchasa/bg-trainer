import type { MasteryStore, Lesson, Mode } from "../types";
import { itemCount } from "./itemKey";

export const MASTERY_KEY = "bg-trainer-mastery-v1";
export const DECAY_DAYS = 7;
export const DAY_MS = 86_400_000;
export const MAX_LEVEL = 10;
export const MASTERY_THRESHOLD = 7;

export function loadMastery(): MasteryStore {
  try {
    const raw = localStorage.getItem(MASTERY_KEY);
    return raw ? (JSON.parse(raw) as MasteryStore) : {};
  } catch {
    return {};
  }
}

export function saveMastery(store: MasteryStore): void {
  try {
    localStorage.setItem(MASTERY_KEY, JSON.stringify(store));
  } catch {
    // Quota exceeded — silently ignore
  }
}

export function clearMastery(): void {
  try {
    localStorage.removeItem(MASTERY_KEY);
  } catch {
    // ignore
  }
}

export function applyAnswer(
  store: MasteryStore,
  modeId: string,
  itemId: string,
  ok: boolean,
  fast: boolean,
  now: number,
): MasteryStore {
  const prev = store[modeId]?.[itemId] ?? { level: 0, lastTs: 0, attempts: 0 };
  const stale = prev.lastTs > 0 && now - prev.lastTs >= DECAY_DAYS * DAY_MS;
  let next: number;
  if (ok) {
    const base = stale ? Math.max(0, prev.level - 1) : prev.level;
    next = Math.min(MAX_LEVEL, base + (fast ? 2 : 1));
  } else {
    next = Math.max(0, prev.level - 3);
  }
  return {
    ...store,
    [modeId]: {
      ...store[modeId],
      [itemId]: { level: next, lastTs: now, attempts: prev.attempts + 1 },
    },
  };
}

export interface LessonStats {
  total: number;
  sumLevel: number;
  atSeven: number;
  atTen: number;
  ratio: number;
  mastered: boolean;
}

export function lessonStats(
  store: MasteryStore,
  lesson: Lesson,
  modeOf: (id: string) => Mode | undefined,
): LessonStats {
  let total = 0;
  let sumLevel = 0;
  let atSeven = 0;
  let atTen = 0;
  for (const mid of lesson.modeIds) {
    const mode = modeOf(mid);
    if (!mode) continue;
    let cnt: number;
    try {
      cnt = itemCount(mode);
    } catch {
      continue;
    }
    total += cnt;
    const entries = store[mid] ?? {};
    for (const k in entries) {
      const lvl = entries[k].level;
      sumLevel += lvl;
      if (lvl >= MASTERY_THRESHOLD) atSeven++;
      if (lvl >= MAX_LEVEL) atTen++;
    }
  }
  const ratio = total > 0 ? sumLevel / (MAX_LEVEL * total) : 0;
  const mastered = total > 0 && atSeven / total >= 0.9 && atTen / total >= 0.6;
  return { total, sumLevel, atSeven, atTen, ratio, mastered };
}

export interface ModeStats {
  total: number;
  sumLevel: number;
  atSeven: number;
  atTen: number;
  ratio: number;
}

export function modeStats(store: MasteryStore, mode: Mode): ModeStats {
  let total: number;
  try {
    total = itemCount(mode);
  } catch {
    return { total: 0, sumLevel: 0, atSeven: 0, atTen: 0, ratio: 0 };
  }
  let sumLevel = 0;
  let atSeven = 0;
  let atTen = 0;
  const entries = store[mode.id] ?? {};
  for (const k in entries) {
    const lvl = entries[k].level;
    sumLevel += lvl;
    if (lvl >= MASTERY_THRESHOLD) atSeven++;
    if (lvl >= MAX_LEVEL) atTen++;
  }
  const ratio = total > 0 ? sumLevel / (MAX_LEVEL * total) : 0;
  return { total, sumLevel, atSeven, atTen, ratio };
}
