import { ACCENT } from "../../constants";
import { LESSONS } from "../../data/lessons";
import { ALL_MODES } from "../../data";
import { lessonStats } from "../../utils/mastery";
import { useI18n } from "../../i18n/context";
import { LOCALES, Locale } from "../../i18n/types";
import { IS_NATIVE } from "../../utils/platform";
import type { HistoryEntry, MasteryStore, Mode } from "../../types";

const MODE_BY_ID: Record<string, Mode> = Object.fromEntries(ALL_MODES.map(m => [m.id, m]));
const modeOf = (id: string) => MODE_BY_ID[id];

interface Props {
  history: HistoryEntry[];
  mastery: MasteryStore;
  proUnlocked: boolean;
  priceString: string | null;
  onPickLesson: (lessonId: string) => void;
  onAnalytics: () => void;
}

const LOCALE_LABELS: Record<Locale, string> = { ru: "РУ", uk: "UK" };

export function LessonsScreen({ history, mastery, proUnlocked, priceString, onPickLesson, onAnalytics }: Props) {
  const { t, f, L, locale, setLocale } = useI18n();
  const available = LESSONS.filter(l => l.available);
  const upcoming = LESSONS.filter(l => !l.available);
  return (
    <div className="flex flex-col px-4 pt-2 pb-6">
      <div className="flex justify-end pt-2">
        <div role="group" aria-label={t("langSwitchAria")} className="inline-flex bg-[#F2F2F2] rounded-full p-0.5">
          {LOCALES.map(l => {
            const active = l === locale;
            return (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${active ? "text-white" : "text-gray-500"}`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                {LOCALE_LABELS[l]}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mt-2 mb-6">
        <div className="w-8 h-6 rounded overflow-hidden relative mb-3 shadow-sm ring-1 ring-black/5">
          <div className="absolute top-0 w-full h-1/3 bg-white" />
          <div className="absolute top-1/3 w-full h-1/3 bg-[#00966E]" />
          <div className="absolute bottom-0 w-full h-1/3 bg-[#D62612]" />
        </div>
        <h1 className="text-3xl font-black text-center text-gray-900 tracking-tight leading-tight">
          Български
        </h1>
        <p className="text-sm font-semibold text-gray-400 mt-1">{t("appSubtitle")}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t("lessonsAvailable")}</h3>
        <div className="flex flex-col gap-2">
          {available.map(l => {
            const s = lessonStats(mastery, l, modeOf);
            const pct = Math.round(s.ratio * 100);
            // FR-MENU: pro lessons on native render with a lock badge + price hint until unlocked.
            // The button still routes through onPickLesson, which redirects to paywall in App.
            const locked = IS_NATIVE && l.tier === "pro" && !proUnlocked;
            return (
              <button
                key={l.id}
                onClick={() => onPickLesson(l.id)}
                className="w-full bg-[#F2F2F2] rounded-3xl p-4 flex items-center gap-3 active:scale-[0.98] active:bg-[#E0E0E0] transition-all"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-lg font-black text-gray-900 shrink-0">
                  {l.num}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-black text-gray-900">{f("lessonNum", l.num)}</div>
                    {locked && <span className="text-xs">🔒</span>}
                    {s.mastered && <span className="text-xs font-bold" style={{ color: ACCENT }}>✓</span>}
                  </div>
                  <div className="text-xs font-semibold text-gray-500 leading-tight truncate">{L(l.title)}</div>
                  {locked ? (
                    <div className="mt-2 text-[11px] font-bold text-gray-500">
                      {priceString ? `${t("paywallLockedHint")} · ${priceString}` : t("paywallLockedHint")}
                    </div>
                  ) : (
                    <div className="mt-2 h-1.5 w-full bg-white rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: ACCENT }} />
                    </div>
                  )}
                </div>
                {!locked && (
                  <div className="flex flex-col items-end shrink-0">
                    <span className="text-xs font-black text-gray-900">{pct}%</span>
                    <span className="text-[10px] font-bold text-gray-400">{s.atSeven}/{s.total}</span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">{t("lessonsUpcoming")}</h3>
        <div className="flex flex-col gap-2">
          {upcoming.map(l => (
            <div
              key={l.id}
              className="w-full bg-[#FAFAFA] rounded-3xl p-4 flex items-center gap-3 opacity-60"
            >
              <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-lg font-black text-gray-300 shrink-0">
                {l.num}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-bold text-gray-500">{f("lessonNum", l.num)}</div>
                <div className="text-xs font-semibold text-gray-400 leading-tight">{L(l.title)}</div>
              </div>
              <span className="text-xs font-bold text-gray-400 shrink-0">{t("comingSoon")}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={onAnalytics}
        className="w-full py-4 flex items-center justify-center gap-2 mt-auto mb-2 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90"
        style={{ backgroundColor: ACCENT }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
        <span>{t("analytics")}</span>
        {history.length > 0 && <span className="text-white/70 text-sm font-semibold">({history.length})</span>}
      </button>
    </div>
  );
}
