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
    <div className="flex-1 flex flex-col px-4 pt-4 pb-6 overflow-y-auto no-scrollbar">
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{f("lessonNum", lesson.num)}</div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">{L(lesson.title)}</h1>
      </div>

      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t("paceLabel")}</div>
        <div className="grid grid-cols-3 gap-2">
          {PACES.map(p => {
            const active = p === pace;
            const n = SESSION_SIZE_BY_PACE[p];
            const lbl = L(PACE_SHORT_LABELS)[p];
            return (
              <button
                key={p}
                onClick={() => onChangePace(p)}
                className={`py-2 rounded-full text-xs font-bold transition-all active:scale-[0.97] ${active ? "text-white shadow-md" : "bg-[#F2F2F2] text-gray-700"}`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                <div>{lbl}</div>
                <div className={`text-[10px] ${active ? "opacity-80" : "text-gray-400"}`}>{n} {t("questionsAbbr")}</div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={onStartRound}
        disabled={!canRound}
        className="w-full py-4 flex items-center justify-center gap-2 mb-6 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: ACCENT }}
      >
        🎲 <span>{t("roundLabel")} · {f("roundButton", ROUND_GAMES, size)}</span>
      </button>

      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">{t("lessonGames")} · {size} {t("questionsAbbr")}</h3>
      <div className="grid grid-cols-3 gap-3">
        {modes.map(m => {
          const s = modeStats(mastery, m);
          const pct = Math.round(s.ratio * 100);
          return (
            <button
              key={m.id}
              onClick={() => onPickGame(m.id)}
              className="bg-[#F2F2F2] rounded-[28px] aspect-square flex flex-col items-center justify-center p-3 group transition-all active:scale-[0.96] active:bg-[#E0E0E0]"
            >
              <div className="mb-2 p-3 rounded-full bg-white text-gray-900 shadow-sm text-2xl leading-none flex items-center justify-center">
                {m.icon}
              </div>
              <span className="text-[11px] font-bold text-center leading-tight text-gray-800 mb-2">
                {L(m.label)}
              </span>
              <div className="w-full h-1 bg-white rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300" style={{ width: `${pct}%`, backgroundColor: ACCENT }} />
              </div>
              <span className="text-[9px] font-bold text-gray-400 mt-1">{s.atSeven}/{s.total}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
