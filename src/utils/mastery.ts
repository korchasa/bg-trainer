import type { MasteryStore, ModeMastery, PickOptData, Lesson, Mode } from "../types";
import { itemCount, itemKey, paradigmFormKey } from "./itemKey";
import { shuffle } from "./shuffle";
import { getRaw, removeRaw, setRaw } from "./storage";

export const MASTERY_KEY = "bg-trainer-mastery-v1";
export const DECAY_DAYS = 7;
export const DAY_MS = 86_400_000;
export const MAX_LEVEL = 10;
export const MASTERY_THRESHOLD = 7;

export function loadMastery(): MasteryStore {
  try {
    const raw = getRaw(MASTERY_KEY);
    return raw ? (JSON.parse(raw) as MasteryStore) : {};
  } catch {
    return {};
  }
}

export function saveMastery(store: MasteryStore): void {
  setRaw(MASTERY_KEY, JSON.stringify(store));
}

export function clearMastery(): void {
  removeRaw(MASTERY_KEY);
}

/** Live `itemKey()` values for a mode, or an empty set if its data cannot be read. */
function modeItemKeys(mode: Mode): Set<string> {
  const keys = new Set<string>();
  let d: unknown;
  try {
    d = mode.data();
  } catch {
    return keys;
  }
  const list: unknown[] = Array.isArray(d)
    ? d
    : d && typeof d === "object" && Array.isArray((d as PickOptData).items)
      ? (d as PickOptData).items
      : [];
  for (const it of list) {
    try {
      // A paradigm item is answered once per form and stored once per form, so
      // its live keys are the form keys — the bare verb is not one of them.
      const o = it as { pronouns?: unknown; forms?: unknown[] };
      if (Array.isArray(o.pronouns) && Array.isArray(o.forms)) {
        o.forms.forEach((_, i) => {
          if (i !== PARADIGM_GIVEN) keys.add(paradigmFormKey(it as never, i));
        });
        continue;
      }
      keys.add(itemKey(it));
    } catch {
      // Shape without a natural key — nothing that could have been stored.
    }
  }
  return keys;
}

/**
 * The pre-filled first-person row of a paradigm. Duplicated from
 * `ParadigmEngine`'s `GIVEN` rather than imported: a store migration reaching
 * into a React component for a constant is the kind of dependency that survives
 * one refactor and breaks on the next. `scripts/accuracy.ts` asserts the two
 * agree.
 */
const PARADIGM_GIVEN = 0;

/**
 * Carries a paradigm's old single record onto the per-form records that replaced
 * it.
 *
 * Mastery used to hold one level per verb; it now holds one per form, and
 * `itemCount` counts a paradigm mode in forms to match. Dropping the old records
 * would reset every learner's paradigm progress to zero, and leaving them would
 * be worse: `modeStats` sums whatever is in the store against a total that is now
 * five times larger, so the progress bar would collapse and the stranded verb
 * keys would never be touched again.
 *
 * Copying the verb's level onto each of its forms keeps the displayed ratio
 * exactly where it was — the sum and the total both grow by the same factor —
 * and every record is live from then on.
 */
export function migrateParadigmKeys(
  store: MasteryStore,
  modes: Mode[],
): { store: MasteryStore; changed: boolean } {
  const next: MasteryStore = { ...store };
  let changed = false;

  for (const mode of modes) {
    const entries = store[mode.id];
    if (!entries) continue;
    let items: unknown[];
    try {
      const d = mode.data();
      if (!Array.isArray(d)) continue;
      items = d;
    } catch {
      continue;
    }
    const paradigms = items.filter((it) => {
      const o = it as { pronouns?: unknown; forms?: unknown[] };
      return Array.isArray(o.pronouns) && Array.isArray(o.forms);
    }) as { forms: string[] }[];
    if (paradigms.length === 0) continue;

    const migrated: ModeMastery = {};
    for (const key in entries) migrated[key] = entries[key];
    for (const item of paradigms) {
      const verbKey = itemKey(item);
      const legacy = migrated[verbKey];
      if (!legacy) continue;
      delete migrated[verbKey];
      changed = true;
      item.forms.forEach((_, i) => {
        if (i === PARADIGM_GIVEN) return;
        const k = paradigmFormKey(item as never, i);
        // A form already answered under the new scheme wins: it is the more
        // recent measurement of that exact form.
        if (!migrated[k]) migrated[k] = { ...legacy };
      });
    }
    next[mode.id] = migrated;
  }
  return { store: next, changed };
}

/**
 * Re-points mastery records whose key lost a period when the exercise text was
 * cleaned up. `itemKey()` returns the exercise string verbatim, so those records
 * would otherwise be stranded — and stranded records are worse than lost ones:
 * `lessonStats()` counts entries in the store against a total from `itemCount()`,
 * so stale keys inflate the ratio past 100% and falsely mark a lesson mastered.
 *
 * A record is only moved when its key matches no live item AND exactly one live
 * key is identical to it once every period is stripped from both. Keys that
 * legitimately end in a period (`1 stot.`) still match a live item, so they are
 * never touched, and an ambiguous match is left alone rather than guessed.
 */
export function migrateDottedKeys(store: MasteryStore, modes: Mode[]): { store: MasteryStore; changed: boolean } {
  const undot = (s: string) => s.replace(/\./g, "");
  const byId = new Map(modes.map(m => [m.id, m]));
  const next: MasteryStore = {};
  let changed = false;

  for (const modeId in store) {
    const entries = store[modeId];
    const mode = byId.get(modeId);
    const live = mode ? modeItemKeys(mode) : new Set<string>();
    if (live.size === 0) {
      next[modeId] = entries;
      continue;
    }

    // undotted form → live key, dropping forms that more than one live key shares
    const byUndotted = new Map<string, string | null>();
    for (const k of live) {
      const u = undot(k);
      byUndotted.set(u, byUndotted.has(u) ? null : k);
    }

    const migrated: ModeMastery = {};
    for (const key in entries) {
      const target = live.has(key) ? key : byUndotted.get(undot(key)) ?? key;
      if (target !== key) changed = true;
      const prev = migrated[target];
      migrated[target] = prev && prev.lastTs > entries[key].lastTs ? prev : entries[key];
    }
    next[modeId] = migrated;
  }
  return { store: next, changed };
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
