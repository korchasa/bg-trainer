import { createContext, useContext, useState, useCallback, ReactNode, useMemo } from "react";
import { Locale, Localized } from "./types";
import { loadLocale, saveLocale } from "./storage";
import { STRINGS, FORMATS, StringKey, FmtKey } from "./strings";

type FmtArgs<K extends FmtKey> = Parameters<typeof FORMATS["ru"][K]>;

interface I18nCtx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (k: StringKey) => string;
  f: <K extends FmtKey>(k: K, ...args: FmtArgs<K>) => string;
  L: <T>(v: Localized<T>) => T;
}

const Ctx = createContext<I18nCtx | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => loadLocale());
  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    saveLocale(l);
  }, []);

  const value = useMemo<I18nCtx>(() => ({
    locale,
    setLocale,
    t: (k) => STRINGS[locale][k],
    f: <K extends FmtKey>(k: K, ...args: FmtArgs<K>): string => {
      const fn = FORMATS[locale][k] as (...a: FmtArgs<K>) => string;
      return fn(...args);
    },
    L: <T,>(v: Localized<T>): T => v[locale],
  }), [locale, setLocale]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useI18n(): I18nCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error("useI18n must be used inside <LocaleProvider>");
  return c;
}
