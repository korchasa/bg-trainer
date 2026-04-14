import type { MasteryStore, Lesson, Mode } from "../types";
import { itemCount, itemKey } from "./itemKey";
import { shuffle } from "./shuffle";

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
  hinted = false,
): MasteryStore {
  const prev = store[modeId]?.[itemId] ?? { level: 0, lastTs: 0, attempts: 0 };
  const stale = prev.lastTs > 0 && now - prev.lastTs >= DECAY_DAYS * DAY_MS;
  let next: number;
  if (ok) {
    if (hinted) {
      // Hinted correct answers are less diagnostic — no level increase, still reset lastTs.
      next = prev.level;
    } else {
      const base = stale ? Math.max(0, prev.level - 1) : prev.level;
      next = Math.min(MAX_LEVEL, base + (fast ? 2 : 1));
    }
  } else {
    // Hinted failure is a softer signal than blind failure.
    next = Math.max(0, prev.level - (hinted ? 1 : 3));
  }
  return {
    ...store,
    [modeId]: {
      ...store[modeId],
      [itemId]: { level: next, lastTs: now, attempts: prev.attempts + 1 },
    },
  };
}

// FR-SCHED: due-based selection with weak-item bonus; shuffles top-K for variety.
export function pickDueItems<T>(
  store: MasteryStore,
  modeId: string,
  items: T[],
  n: number,
  now: number,
): T[] {
  if (items.length === 0 || n <= 0) return [];
  const entries = store[modeId] ?? {};
  const DUE_BASE_MS = DAY_MS;
  const WEAK_BONUS = 7 * DAY_MS; // on par with ~3 levels of due interval
  const scored = items.map(it => {
    let key: string;
    try { key = itemKey(it); } catch { return { it, score: 0, fresh: true }; }
    const m = entries[key];
    if (!m || m.lastTs === 0) return { it, score: WEAK_BONUS * 2, fresh: true }; // never seen → top priority
    const dueAt = m.lastTs + DUE_BASE_MS * Math.pow(2, m.level);
    const overdue = Math.max(0, now - dueAt);
    const weak = m.level < MASTERY_THRESHOLD ? WEAK_BONUS : 0;
    return { it, score: overdue + weak, fresh: false };
  });
  const allZero = scored.every(s => s.score === 0);
  if (allZero) return shuffle(items).slice(0, n);
  const sorted = [...scored].sort((a, b) => b.score - a.score);
  const k = Math.min(Math.max(n * 2, n), sorted.length);
  const topK = sorted.slice(0, k).map(s => s.it);
  return shuffle(topK).slice(0, Math.min(n, topK.length));
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
