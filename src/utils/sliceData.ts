import type { Mode, DataItem, BuildItem, LiItem, PickOptData, MasteryStore } from "../types";
import { shuffle } from "./shuffle";
import { pickDueItems } from "./mastery";

// FR-SCHED: scheduler picks items by due/weak score. If mastery is absent, falls back to shuffle.
export function sliceData(
  mode: Mode,
  size?: number,
  mastery?: MasteryStore,
  now: number = Date.now(),
): Mode["data"] {
  if (!size && !mastery) return mode.data;
  const pickN = <T>(items: T[], n: number): T[] => {
    if (mastery) return pickDueItems(mastery, mode.id, items, n, now);
    return shuffle(items).slice(0, n);
  };
  return () => {
    const raw = mode.data();
    const len = Array.isArray(raw)
      ? raw.length
      : (raw as PickOptData).items.length;
    const n = size ?? len;
    switch (mode.type) {
      case "pickOpt": {
        const d = raw as PickOptData;
        return { items: pickN(d.items, n), opts: d.opts };
      }
      case "build":
        return pickN(raw as BuildItem[], n);
      case "li":
        return pickN(raw as LiItem[], n);
      default:
        return pickN(raw as DataItem[], n);
    }
  };
}
