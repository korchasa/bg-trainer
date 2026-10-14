import type { FrameData, MasteryStore, Mode, PickOptData } from "../types";
import { itemKey } from "./itemKey";

/**
 * FR-TASK-MODEL: the item a mode's worked example works out is never asked.
 *
 * The example sits above every question of a session, so an item equal to it
 * would arrive with its answer already printed over it. The data files keep the
 * item — it is the textbook's model, and the verb-form table still lists it —
 * and `CATEGORIES` drops it from the pool every question is drawn from. One rule
 * for every engine: a closed set such as a six-row pronoun table loses its model
 * row too, and the learner meets that form in the example instead.
 *
 * Pure on purpose: `scripts/exampleitem.ts` imports this module, so it must not
 * reach `utils/platform.ts`.
 */

/** Spacing, case and punctuation do not make two texts different items. */
function norm(s: string): string {
  return s.toLowerCase().replace(/[,.?!…]/g, " ").replace(/\s+/g, " ").trim();
}

function tokens(s: string): string[] {
  return norm(s).split(/[\s()]+/).filter(Boolean);
}

/**
 * True when `needle`'s words occur in a row inside `hay`. An example may gloss its
 * answer — `молив → -ът (моливът)` — so equality would miss the item it shows.
 */
function containsRun(hay: string, needle: string): boolean {
  const h = tokens(hay);
  const n = tokens(needle);
  if (n.length === 0) return false;
  for (let i = 0; i + n.length <= h.length; i++) {
    if (n.every((w, j) => h[i + j] === w)) return true;
  }
  return false;
}

/** Splits `stimulus → answer` (or `↔`) at its first arrow. */
function splitExample(text: string): { stimulus: string; answer: string } {
  const at = text.search(/[→↔]/);
  if (at < 0) return { stimulus: "", answer: text };
  return { stimulus: text.slice(0, at), answer: text.slice(at + 1) };
}

function matchesText(item: unknown, type: Mode["type"], text: string): boolean {
  const o = item as Record<string, unknown>;
  const { stimulus, answer } = splitExample(text);
  const same = (a: string, b: string) => norm(a) === norm(b);

  switch (type) {
    // `words[]` puts a mark in a token of its own; `norm` makes that prose again.
    case "build":
      return same((o.words as string[]).join(" "), text);
    case "match":
      return same(o.left as string, stimulus) && containsRun(answer, o.right as string);
    case "li":
      return same((o.words as string[]).join(" "), stimulus) && same(o.result as string, answer);
    case "odd":
      return same((o.words as string[]).join("/"), stimulus) && same(o.odd as string, answer);
    // The left side is the learner's own language in «…», which differs between
    // ru and uk; the Bulgarian sentence on the right is what identifies the item.
    case "frame": {
      const built = (o.slots as { word: string }[]).map((s) => s.word).join(" ");
      return [built, ...((o.alt as string[] | undefined) ?? [])].some((s) => same(s, answer));
    }
    case "paradigm":
      return false;
    default:
      return same(o.q as string, stimulus) && containsRun(answer, o.answer as string);
  }
}

/**
 * True when `item` is the one the mode's example works out: the same prompt and
 * an answer the example prints. A different answer to the same prompt is a
 * different question (`Ние сме ___ → гладни` over the item answered `жадни`).
 * Both languages are tried, since a prompt may be in the learner's language.
 */
export function isExampleItem(mode: Mode, item: unknown): boolean {
  if (!mode.example) return false;
  return [mode.example.ru, mode.example.uk].some((t) => matchesText(item, mode.type, t));
}

type ModeData = ReturnType<Mode["data"]>;

function itemsOf(d: ModeData): unknown[] {
  return Array.isArray(d) ? d : (d as PickOptData | FrameData).items;
}

function dropFrom(mode: Mode, d: ModeData): ModeData {
  const keep = <T>(list: T[]): T[] => list.filter((it) => !isExampleItem(mode, it));
  if (Array.isArray(d)) return keep(d as unknown[]) as ModeData;
  // pickOpt keeps its option set and frame its word bank: only the items shrink.
  const withItems = d as PickOptData | FrameData;
  return { ...withItems, items: keep(withItems.items as unknown[]) } as ModeData;
}

/**
 * The mode as a session sees it: `data` without the example's item, the authored
 * list kept as `authoredData` for display that asks nothing.
 */
export function withoutExampleItem(mode: Mode): Mode {
  if (!mode.example) return mode;
  const authored = mode.data;
  return { ...mode, authoredData: authored, data: () => dropFrom(mode, authored()) };
}

/** Mastery keys of the items `withoutExampleItem` took out of this mode. */
export function exampleItemKeys(mode: Mode): string[] {
  if (!mode.authoredData) return [];
  return itemsOf(mode.authoredData()).filter((it) => isExampleItem(mode, it)).map(itemKey);
}

/**
 * Drops stored mastery for items that are no longer asked.
 *
 * `lessonStats` sums every record in the store against a total from `itemCount`,
 * which now leaves the example's item out; a record left behind would push the
 * ratio past what was earned and could mark a lesson mastered. A record is only
 * dropped when no live item of the mode shares its key, and a key that still
 * carries a period removed from the data later (see `migrateDottedKeys`) counts
 * as the same key.
 */
export function dropExampleRecords(
  store: MasteryStore,
  modes: Mode[],
): { store: MasteryStore; changed: boolean } {
  const undot = (s: string) => s.replace(/\./g, "");
  const next: MasteryStore = { ...store };
  let changed = false;

  for (const mode of modes) {
    const entries = store[mode.id];
    if (!entries) continue;
    const gone = new Set(exampleItemKeys(mode).map(undot));
    if (gone.size === 0) continue;
    const live = new Set(itemsOf(mode.data()).map((it) => undot(itemKey(it))));
    const kept = { ...entries };
    for (const key in entries) {
      const k = undot(key);
      if (gone.has(k) && !live.has(k)) {
        delete kept[key];
        changed = true;
      }
    }
    next[mode.id] = kept;
  }
  return { store: next, changed };
}
