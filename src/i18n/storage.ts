import { DEFAULT_LOCALE, LOCALES, Locale } from "./types";

const KEY = "bg-trainer-lang-v1";

export function loadLocale(): Locale {
  try {
    const v = localStorage.getItem(KEY);
    if (v && (LOCALES as string[]).includes(v)) return v as Locale;
  } catch {
    // ignore
  }
  try {
    const nav = navigator.language?.toLowerCase() ?? "";
    if (nav.startsWith("uk")) return "uk";
  } catch {
    // ignore
  }
  return DEFAULT_LOCALE;
}

export function saveLocale(l: Locale): void {
  try {
    localStorage.setItem(KEY, l);
  } catch {
    // ignore
  }
}
