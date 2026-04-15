import type { Mode, DataItem, BuildItem, LiItem, PickOptData } from "../types";

export function itemKey(item: unknown): string {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.q === "string") return o.q;
    if (typeof o.result === "string") return o.result;
    if (typeof o.verb === "string") return o.verb;
    if (typeof o.left === "string" && typeof o.right === "string") return `${o.left}↔${o.right}`;
    if (Array.isArray(o.words) && typeof o.odd === "string") return `odd:${(o.words as string[]).join("|")}:${o.odd}`;
    if (Array.isArray(o.words)) return (o.words as string[]).join("|");
  }
  throw new Error("itemKey: unknown item shape");
}

export function itemCount(mode: Mode): number {
  const d = mode.data();
  if (Array.isArray(d)) return (d as (DataItem | BuildItem | LiItem)[]).length;
  if (d && typeof d === "object" && Array.isArray((d as PickOptData).items)) {
    return (d as PickOptData).items.length;
  }
  throw new Error(`itemCount: unknown data shape for mode ${mode.id}`);
}
