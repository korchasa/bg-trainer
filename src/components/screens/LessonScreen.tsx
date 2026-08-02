import { ACCENT, SESSION_SIZE_BY_PACE, ROUND_GAMES, PACE_SHORT_LABELS } from "../../constants";
import { ALL_MODES } from "../../data";
import { modeStats } from "../../utils/mastery";
import { useI18n } from "../../i18n/context";
import type { Lesson, MasteryStore, SessionPace } from "../../types";

interface Props {
  lesson: Lesson;
  mastery: MasteryStore;
  pace: SessionPace;
  onChangePace: (p: SessionPace) => void;
  onPickGame: (modeId: string) => void;
  onStartRound: () => void;
}

const PACES: SessionPace[] = ["quick", "standard", "deep"];

export function LessonScreen({ lesson, mastery, pace, onChangePace, onPickGame, onStartRound }: Props) {
  const { t, f, L } = useI18n();
  const modes = lesson.modeIds
    .map(id => ALL_MODES.find(m => m.id === id))
    .filter((m): m is NonNullable<typeof m> => !!m);
  const canRound = modes.length >= 1;
  const size = SESSION_SIZE_BY_PACE[pace];

  return (
    <div className="flex flex-col px-3 xs:px-4 pt-4 pb-6">
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{f("lessonNum", lesson.num)}</div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">{L(lesson.title)}</h1>
      </div>

      {/* FR-A11Y-TEXT: one line of text per segment. The question count used to be
          a second 10px line squeezed inside the button; it now has its own row. */}
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t("paceLabel")}</div>
        <div className="grid grid-cols-3 gap-2">
          {PACES.map(p => {
            const active = p === pace;
            const lbl = L(PACE_SHORT_LABELS)[p];
            return (
              <button
                key={p}
                onClick={() => onChangePace(p)}
                className={`py-3 min-h-[2.75rem] rounded-full text-base font-bold transition-all active:scale-[0.97] ${active ? "text-white shadow-md" : "bg-[#F2F2F2] text-gray-800"}`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                {lbl}
              </button>
            );
          })}
        </div>
        <div className="text-sm font-semibold text-gray-600 mt-2 text-center">{f("paceHint", size)}</div>
      </div>

      <button
        onClick={onStartRound}
        disabled={!canRound}
        className="w-full py-4 flex items-center justify-center gap-2 mb-6 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: ACCENT }}
      >
        🎲 <span className="text-left leading-snug">{t("roundLabel")} · {f("roundButton", ROUND_GAMES, size)}</span>
      </button>

      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t("lessonGames")}</h3>
      {/* FR-RESPONSIVE-LAYOUT: rows, not square tiles. A 3-column tile left the
          label 87pt of width at 11px; a row gives it the full container. */}
      <div className="flex flex-col gap-2">
        {modes.map(m => {
          const s = modeStats(mastery, m);
          const pct = Math.round(s.ratio * 100);
          return (
            <button
              key={m.id}
              onClick={() => onPickGame(m.id)}
              className="w-full bg-[#F2F2F2] rounded-3xl p-4 flex items-center gap-3 transition-all active:scale-[0.98] active:bg-[#E0E0E0]"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm text-2xl leading-none flex items-center justify-center shrink-0">
                {m.icon}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="text-base font-bold text-gray-900 leading-snug">{L(m.label)}</div>
                <div className="mt-2 h-1.5 w-full bg-white rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: ACCENT }} />
                </div>
              </div>
              <div className="flex flex-col items-end shrink-0">
                <span className="text-sm font-black text-gray-900">{pct}%</span>
                <span className="text-xs font-bold text-gray-500">{s.atSeven}/{s.total}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
