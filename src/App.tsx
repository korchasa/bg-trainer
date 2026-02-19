import { useState, useEffect, useCallback } from "react";
import { ACCENT } from "./constants";
import { ALL_MODES } from "./data";
import { loadHistory, saveHistory, clearHistory } from "./utils/history";
import { ENGINES } from "./components/engines";
import { NavHeader } from "./components/ui/NavHeader";
import { ResultsScreen } from "./components/screens/ResultsScreen";
import { AnalyticsScreen } from "./components/screens/AnalyticsScreen";
import type { HistoryEntry, GameResult, Screen } from "./types";

export default function App() {
  const [screen, setScreen] = useState<Screen>("menu");
  const [modeId, setModeId] = useState<string | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRef, setShowRef] = useState(false);

  useEffect(() => { setHistory(loadHistory()); setLoading(false); }, []);

  const handleComplete = useCallback((score: number, time: number, errors = 0) => {
    const entry: HistoryEntry = { mode: modeId!, score, time, errors, ts: Date.now() };
    const nh = [...history, entry];
    setHistory(nh);
    saveHistory(nh);
    setResult({ score, time, errors });
    setScreen("results");
  }, [modeId, history]);

  const startGame = (id: string) => {
    setModeId(id);
    setScreen("game");
    setGameKey(k => k + 1);
    setShowRef(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 font-semibold">Загрузка...</div>
      </div>
    );
  }

  const currentMode = ALL_MODES.find(m => m.id === modeId);
  const Engine = currentMode ? ENGINES[currentMode.type] : null;
  const isVerb = modeId?.startsWith("sym") || modeId?.startsWith("imam") || modeId?.startsWith("iskam");

  return (
    <div className="h-screen overflow-hidden bg-white flex flex-col items-center">
      <div className="relative w-full h-screen max-w-md mx-auto flex flex-col overflow-hidden bg-white">

        {/* HOME / MENU */}
        {screen === "menu" && (
          <div className="flex-1 flex flex-col px-4 pt-2 pb-6 overflow-y-auto no-scrollbar">
            <div className="flex flex-col items-center justify-center mt-4 mb-8">
              <div className="w-8 h-6 rounded overflow-hidden relative mb-3 shadow-sm ring-1 ring-black/5">
                <div className="absolute top-0 w-full h-1/3 bg-white" />
                <div className="absolute top-1/3 w-full h-1/3 bg-[#00966E]" />
                <div className="absolute bottom-0 w-full h-1/3 bg-[#D62612]" />
              </div>
              <h1 className="text-3xl font-black text-center text-gray-900 tracking-tight leading-tight">
                Български
              </h1>
              <p className="text-sm font-semibold text-gray-400 mt-1">Ниво А0 • Тренажёр</p>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
              {ALL_MODES.map(m => (
                <button
                  key={m.id}
                  onClick={() => startGame(m.id)}
                  className="bg-[#F2F2F2] rounded-[28px] aspect-square flex flex-col items-center justify-center p-3 group transition-all active:scale-[0.96] active:bg-[#E0E0E0]"
                >
                  <div className="mb-2 p-3 rounded-full bg-white text-gray-900 shadow-sm group-hover:scale-110 transition-transform text-2xl leading-none flex items-center justify-center">
                    {m.icon}
                  </div>
                  <span className="text-[11px] font-bold text-center leading-tight text-gray-800">
                    {m.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => startGame(ALL_MODES[Math.floor(Math.random() * ALL_MODES.length)].id)}
              className="w-full py-4 flex items-center justify-center gap-2 mt-auto mb-3 rounded-full font-bold text-white text-base transition-all active:scale-[0.98] active:opacity-90 bg-[#111111]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" />
                <line x1="4" y1="20" x2="21" y2="3" />
                <polyline points="21 16 21 21 16 21" />
                <line x1="15" y1="15" x2="21" y2="21" />
              </svg>
              <span>Случайное упражнение</span>
            </button>

            <button
              onClick={() => setScreen("analytics")}
              className="w-full py-4 flex items-center justify-center gap-2 mb-2 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] active:opacity-90"
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
        )}

        {/* GAME */}
        {screen === "game" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader
              title={currentMode?.label ?? ""}
              onBack={() => setScreen("menu")}
              right={isVerb ? (
                <button
                  onClick={() => setShowRef(s => !s)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  📖
                </button>
              ) : undefined}
            />

            {showRef && currentMode && (() => {
              const verbData = currentMode.data() as Array<{ q: string; answer: string }>;
              return (
                <div className="mx-4 mt-3 bg-gray-50 rounded-[20px] border border-gray-100 overflow-hidden">
                  <div className="grid grid-cols-3">
                    {verbData.map((form, i) => (
                      <div key={form.q} className={`px-3 py-2 text-center text-sm ${i % 3 !== 2 ? "border-r border-gray-100" : ""} ${i < verbData.length - 3 ? "border-b border-gray-100" : ""}`}>
                        <span className="text-gray-400 font-semibold">{form.q} </span>
                        <span className="text-gray-900 font-black">{form.answer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })()}

            {Engine && <Engine key={gameKey} data={currentMode!.data} onComplete={handleComplete} />}
          </div>
        )}

        {/* RESULTS */}
        {screen === "results" && result && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader title="Результат" onBack={() => setScreen("menu")} />
            <ResultsScreen
              score={result.score}
              time={result.time}
              errors={result.errors}
              onRestart={() => { setGameKey(k => k + 1); setScreen("game"); }}
              onMenu={() => setScreen("menu")}
            />
          </div>
        )}

        {/* ANALYTICS */}
        {screen === "analytics" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader
              title="Аналитика"
              onBack={() => setScreen("menu")}
              right={
                <button
                  onClick={() => { clearHistory(); setHistory([]); }}
                  className="text-xs font-bold text-gray-400 hover:text-[#E60023] transition-colors"
                >
                  Сброс
                </button>
              }
            />
            <AnalyticsScreen
              history={history}
              onBack={() => setScreen("menu")}
              onClear={() => { clearHistory(); setHistory([]); }}
            />
          </div>
        )}

      </div>
    </div>
  );
}
