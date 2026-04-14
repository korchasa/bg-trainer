import { ACCENT } from "../../constants";
import { ALL_MODES } from "../../data";
import type { Lesson } from "../../types";

interface Props {
  lesson: Lesson;
  onPickGame: (modeId: string) => void;
  onStartRound: () => void;
}

export function LessonScreen({ lesson, onPickGame, onStartRound }: Props) {
  const modes = lesson.modeIds
    .map(id => ALL_MODES.find(m => m.id === id))
    .filter((m): m is NonNullable<typeof m> => !!m);
  const canRound = modes.length >= 1;

  return (
    <div className="flex-1 flex flex-col px-4 pt-4 pb-6 overflow-y-auto no-scrollbar">
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Урок {lesson.num}</div>
        <h1 className="text-2xl font-black text-gray-900 leading-tight">{lesson.title}</h1>
      </div>

      <button
        onClick={onStartRound}
        disabled={!canRound}
        className="w-full py-4 flex items-center justify-center gap-2 mb-6 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90 disabled:opacity-40"
        style={{ backgroundColor: ACCENT }}
      >
        🎲 <span>Раунд · 3 игры × 5 вопросов</span>
      </button>

      <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Игры урока</h3>
      <div className="grid grid-cols-3 gap-3">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => onPickGame(m.id)}
            className="bg-[#F2F2F2] rounded-[28px] aspect-square flex flex-col items-center justify-center p-3 group transition-all active:scale-[0.96] active:bg-[#E0E0E0]"
          >
            <div className="mb-2 p-3 rounded-full bg-white text-gray-900 shadow-sm text-2xl leading-none flex items-center justify-center">
              {m.icon}
            </div>
            <span className="text-[11px] font-bold text-center leading-tight text-gray-800">
              {m.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
