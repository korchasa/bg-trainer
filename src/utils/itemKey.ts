import type { Mode, DataItem, BuildItem, LiItem, PickOptData, ParadigmItem } from "../types";

/**
 * FR-PARADIGM, FR-MASTERY: a paradigm's mastery is tracked per form, not per verb.
 *
 * One record per verb made four correct forms out of five worth exactly what
 * none were worth, and one wrong form cost what five did. Per-form records also
 * keep the unit consistent with every other mode — one level unit per answer —
 * which is why `itemCount` below counts a paradigm mode in forms too. Get those
 * two out of step and `modeStats` divides a five-times-larger sum by an unchanged
 * total and reports past 100%.
 *
 * `#` separates them because no form or verb in the data contains one.
 */
export function paradigmFormKey(item: ParadigmItem, formIndex: number): string {
  return `${itemKey(item)}#${formIndex}`;
}

/** True for the `paradigm` data shape — an array of `{ pronouns, forms }`. */
function isParadigm(list: unknown[]): list is ParadigmItem[] {
  const first = list[0] as Record<string, unknown> | undefined;
  return !!first && Array.isArray(first.pronouns) && Array.isArray(first.forms);
}

export function itemKey(item: unknown): string {
  if (item && typeof item === "object") {
    const o = item as Record<string, unknown>;
    if (typeof o.q === "string") return o.q;
    if (typeof o.result === "string") return o.result;
    if (typeof o.verb === "string") return o.verb;
    if (typeof o.left === "string" && typeof o.right === "string") return `${o.left}↔${o.right}`;
    // FR-FRAME. Must stay ahead of the generic `words` branch and be a distinct
    // namespace: useGame swallows itemKey failures, so a missing branch here
    // would silently drop mastery instead of erroring.
    if (Array.isArray(o.slots)) {
      return `frame:${(o.slots as { word: string }[]).map(s => s.word).join("|")}`;
    }
    if (Array.isArray(o.words) && typeof o.odd === "string") return `odd:${(o.words as string[]).join("|")}:${o.odd}`;
    if (Array.isArray(o.words)) return (o.words as string[]).join("|");
  }
  throw new Error("itemKey: unknown item shape");
}

export function itemCount(mode: Mode): number {
  const d = mode.data();
  if (Array.isArray(d)) {
    // Paradigms are counted in forms, matching one mastery record per form. The
    // first-person row is given, so it is never answered and never counted.
    if (isParadigm(d)) return d.reduce((n, p) => n + p.forms.length - 1, 0);
    return (d as (DataItem | BuildItem | LiItem)[]).length;
  }
  if (d && typeof d === "object" && Array.isArray((d as PickOptData).items)) {
    return (d as PickOptData).items.length;
  }
  throw new Error(`itemCount: unknown data shape for mode ${mode.id}`);
}
