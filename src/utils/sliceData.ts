import type { Mode, DataItem, BuildItem, LiItem, PickOptData } from "../types";
import { shuffle } from "./shuffle";

export function sliceData(mode: Mode, size?: number): Mode["data"] {
  if (!size) return mode.data;
  return () => {
    const raw = mode.data();
    switch (mode.type) {
      case "pickOpt": {
        const d = raw as PickOptData;
        return { items: shuffle(d.items).slice(0, size), opts: d.opts };
      }
      case "build":
        return shuffle(raw as BuildItem[]).slice(0, size);
      case "li":
        return shuffle(raw as LiItem[]).slice(0, size);
      default:
        return shuffle(raw as DataItem[]).slice(0, size);
    }
  };
}
