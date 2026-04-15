export type Locale = "ru" | "uk";
export const LOCALES: Locale[] = ["ru", "uk"];
export const DEFAULT_LOCALE: Locale = "ru";
export type Localized<T> = Record<Locale, T>;
