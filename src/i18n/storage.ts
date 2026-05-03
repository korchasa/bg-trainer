import { DEFAULT_LOCALE, LOCALES, Locale } from "./types";
import { getRaw, setRaw } from "../utils/storage";

const KEY = "bg-trainer-lang-v1";

export function loadLocale(): Locale {
  const v = getRaw(KEY);
  if (v && (LOCALES as string[]).includes(v)) return v as Locale;
  try {
    const nav = navigator.language?.toLowerCase() ?? "";
    if (nav.startsWith("uk")) return "uk";
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

export function saveLocale(l: Locale): void {
  setRaw(KEY, l);
}
