import { ACCENT } from "../../constants";
import { LESSONS } from "../../data/lessons";
import type { HistoryEntry } from "../../types";

interface Props {
  history: HistoryEntry[];
  onPickLesson: (lessonId: string) => void;
  onAnalytics: () => void;
}

export function LessonsScreen({ history, onPickLesson, onAnalytics }: Props) {
  const available = LESSONS.filter(l => l.available);
  const upcoming = LESSONS.filter(l => !l.available);
  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-6 overflow-y-auto no-scrollbar">
      <div className="flex flex-col items-center justify-center mt-4 mb-6">
        <div className="w-8 h-6 rounded overflow-hidden relative mb-3 shadow-sm ring-1 ring-black/5">
          <div className="absolute top-0 w-full h-1/3 bg-white" />
          <div className="absolute top-1/3 w-full h-1/3 bg-[#00966E]" />
          <div className="absolute bottom-0 w-full h-1/3 bg-[#D62612]" />
        </div>
        <h1 className="text-3xl font-black text-center text-gray-900 tracking-tight leading-tight">
          Български
        </h1>
        <p className="text-sm font-semibold text-gray-400 mt-1">Ниво А0 • Уроки</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">Доступно</h3>
        <div className="flex flex-col gap-2">
          {available.map(l => (
            <button
              key={l.id}
              onClick={() => onPickLesson(l.id)}
              className="w-full bg-[#F2F2F2] rounded-3xl p-4 flex items-center gap-3 active:scale-[0.98] active:bg-[#E0E0E0] transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-lg font-black text-gray-900 shrink-0">
                {l.num}
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm font-black text-gray-900">Урок {l.num}</div>
                <div className="text-xs font-semibold text-gray-500 leading-tight">{l.title}</div>
              </div>
              <span className="text-xs font-bold text-gray-400 shrink-0">{l.modeIds.length} игр</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">В разработке</h3>
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
                <div className="text-sm font-bold text-gray-500">Урок {l.num}</div>
                <div className="text-xs font-semibold text-gray-400 leading-tight">{l.title}</div>
              </div>
              <span className="text-xs font-bold text-gray-400 shrink-0">Скоро</span>
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
        <span>Аналитика</span>
        {history.length > 0 && <span className="text-white/70 text-sm font-semibold">({history.length})</span>}
      </button>
    </div>
  );
}
