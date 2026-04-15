import { useState, useEffect, useCallback, useRef } from "react";
import { ALL_MODES } from "./data";
import { LESSON_BY_ID } from "./data/lessons";
import { loadHistory, saveHistory, clearHistory } from "./utils/history";
import { loadMastery, saveMastery, clearMastery, applyAnswer } from "./utils/mastery";
import { loadPace, savePace } from "./utils/pace";
import { shuffle } from "./utils/shuffle";
import { sliceData } from "./utils/sliceData";
import { SESSION_SIZE_BY_PACE, ROUND_GAMES, DEFAULT_PACE } from "./constants";
import { ENGINES } from "./components/engines";
import { NavHeader } from "./components/ui/NavHeader";
import { ConfirmBar } from "./components/ui/ConfirmBar";
import { ResultsScreen } from "./components/screens/ResultsScreen";
import { AnalyticsScreen } from "./components/screens/AnalyticsScreen";
import { LessonsScreen } from "./components/screens/LessonsScreen";
import { LessonScreen } from "./components/screens/LessonScreen";
import { useI18n } from "./i18n/context";
import type { HistoryEntry, GameResult, Screen, MasteryStore, MasteryEvent, SessionPace } from "./types";

interface RoundState {
  lessonId: string;
  queue: string[];
  idx: number;
  size: number;
  totals: { score: number; time: number; errors: number; qsTotal: number };
}

export default function App() {
  const { t, f, L } = useI18n();
  const [screen, setScreen] = useState<Screen>("lessons");
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [modeId, setModeId] = useState<string | null>(null);
  const [round, setRound] = useState<RoundState | null>(null);
  const [result, setResult] = useState<GameResult | null>(null);
  const [resultMode, setResultMode] = useState<string | null>(null);
  const [gameKey, setGameKey] = useState(0);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mastery, setMastery] = useState<MasteryStore>({});
  const [pace, setPace] = useState<SessionPace>(DEFAULT_PACE);
  const [loading, setLoading] = useState(true);
  const [showRef, setShowRef] = useState(false);
  const [showAbortBar, setShowAbortBar] = useState(false);
  const pendingRef = useRef<MasteryEvent[]>([]);
  const modeIdRef = useRef<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  modeIdRef.current = modeId;

  useEffect(() => {
    setHistory(loadHistory());
    setMastery(loadMastery());
    setPace(loadPace());
    setLoading(false);
  }, []);

  const changePace = useCallback((p: SessionPace) => {
    setPace(p);
    savePace(p);
  }, []);

  const onItemAnswer = useCallback((itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => {
    const mid = modeIdRef.current;
    if (!mid) return;
    pendingRef.current.push({ modeId: mid, itemId, ok, fast, ts: Date.now(), hinted });
  }, []);

  const flushMastery = useCallback(() => {
    const events = pendingRef.current;
    if (events.length === 0) return;
    pendingRef.current = [];
    setMastery(prev => {
      let next = prev;
      for (const e of events) {
        next = applyAnswer(next, e.modeId, e.itemId, e.ok, e.fast, e.ts, e.hinted ?? false);
      }
      saveMastery(next);
      return next;
    });
  }, []);

  const appendHistory = useCallback((entry: HistoryEntry) => {
    setHistory(prev => {
      const next = [...prev, entry];
      saveHistory(next);
      return next;
    });
  }, []);

  const handleComplete = useCallback((score: number, time: number, errors = 0) => {
    if (pendingRef.current.length === 0) {
      console.warn(`[mastery] engine ${modeIdRef.current} produced zero item events`);
    }
    flushMastery();
    if (round) {
      const nextTotals = {
        score: round.totals.score + score,
        time: round.totals.time + time,
        errors: round.totals.errors + errors,
        qsTotal: round.totals.qsTotal + round.size,
      };
      const nextIdx = round.idx + 1;
      if (nextIdx < round.queue.length) {
        setRound({ ...round, idx: nextIdx, totals: nextTotals });
        setModeId(round.queue[nextIdx]);
        setGameKey(k => k + 1);
        return;
      }
      const roundMode = `round:${round.lessonId}`;
      appendHistory({
        mode: roundMode,
        score: nextTotals.score,
        time: nextTotals.time,
        errors: nextTotals.errors,
        ts: Date.now(),
        lessonId: round.lessonId,
        round: true,
        qsTotal: nextTotals.qsTotal,
      });
      setResult({ score: nextTotals.score, time: nextTotals.time, errors: nextTotals.errors });
      setResultMode(roundMode);
      setRound(null);
      setScreen("results");
      return;
    }
    const mid = modeId!;
    appendHistory({
      mode: mid,
      score,
      time,
      errors,
      ts: Date.now(),
      lessonId: lessonId ?? undefined,
    });
    setResult({ score, time, errors });
    setResultMode(mid);
    setScreen("results");
  }, [round, modeId, lessonId, appendHistory]);

  const openLesson = (id: string) => {
    const lesson = LESSON_BY_ID[id];
    if (!lesson?.available) return;
    setLessonId(id);
    setScreen("lesson");
  };

  const startGame = (id: string) => {
    pendingRef.current = [];
    setRound(null);
    setModeId(id);
    setScreen("game");
    setGameKey(k => k + 1);
    setShowRef(false);
    setShowAbortBar(false);
  };

  const startRound = () => {
    if (!lessonId) return;
    const lesson = LESSON_BY_ID[lessonId];
    if (!lesson || lesson.modeIds.length === 0) return;
    pendingRef.current = [];
    const count = Math.min(ROUND_GAMES, lesson.modeIds.length);
    const queue = shuffle(lesson.modeIds).slice(0, count);
    const size = SESSION_SIZE_BY_PACE[pace];
    setRound({ lessonId, queue, idx: 0, size, totals: { score: 0, time: 0, errors: 0, qsTotal: 0 } });
    setModeId(queue[0]);
    setScreen("game");
    setGameKey(k => k + 1);
    setShowRef(false);
    setShowAbortBar(false);
  };

  const backFromGame = () => {
    if (round) {
      setShowAbortBar(true);
      return;
    }
    flushMastery();
    setScreen(lessonId ? "lesson" : "lessons");
  };

  const abortRound = () => {
    flushMastery();
    setRound(null);
    setShowAbortBar(false);
    setScreen(lessonId ? "lesson" : "lessons");
  };

  const backFromResults = () => {
    setResultMode(null);
    setScreen(lessonId ? "lesson" : "lessons");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-400 font-semibold">{t("loading")}</div>
      </div>
    );
  }

  const currentMode = ALL_MODES.find(m => m.id === modeId);
  const Engine = currentMode ? ENGINES[currentMode.type] : null;
  const isVerb = modeId?.startsWith("sym") || modeId?.startsWith("imam") ||
    modeId?.startsWith("iskam") || modeId === "kazvam_pick" || modeId === "govorya_pick";
  const currentLesson = lessonId ? LESSON_BY_ID[lessonId] : null;
  const sessionSize = currentMode ? (round?.size ?? SESSION_SIZE_BY_PACE[pace]) : undefined;
  const gameDataFn = currentMode
    ? sliceData(currentMode, sessionSize, mastery)
    : null;
  const levelLookup = currentMode
    ? (itemId: string) => mastery[currentMode.id]?.[itemId]?.level ?? 0
    : undefined;
  const currentLabel = currentMode ? L(currentMode.label) : "";
  const gameTitle = round && currentMode
    ? f("gameOfRound", currentLabel, round.idx + 1, round.queue.length)
    : currentLabel;

  return (
    <div
      className="h-screen overflow-hidden bg-white flex flex-col items-center"
      onWheel={(e) => {
        if (scrollRef.current && !scrollRef.current.contains(e.target as Node)) {
          scrollRef.current.scrollTop += e.deltaY;
        }
      }}
    >
      <div ref={scrollRef} className="relative w-full h-screen max-w-md mx-auto flex flex-col overflow-y-auto no-scrollbar bg-white">

        {screen === "lessons" && (
          <LessonsScreen
            history={history}
            mastery={mastery}
            onPickLesson={openLesson}
            onAnalytics={() => setScreen("analytics")}
          />
        )}

        {screen === "lesson" && currentLesson && (
          <>
            <NavHeader title={f("lessonNum", currentLesson.num)} onBack={() => { setLessonId(null); setScreen("lessons"); }} />
            <LessonScreen lesson={currentLesson} mastery={mastery} pace={pace} onChangePace={changePace} onPickGame={startGame} onStartRound={startRound} />
          </>
        )}

        {screen === "game" && currentMode && gameDataFn && Engine && (
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <NavHeader
              title={gameTitle}
              onBack={backFromGame}
              right={isVerb && !round ? (
                <button
                  onClick={() => setShowRef(s => !s)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-900 transition-colors"
                >
                  📖
                </button>
              ) : undefined}
            />

            {showRef && currentMode && !round && (() => {
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

            <Engine key={gameKey} data={gameDataFn} onComplete={handleComplete} onItemAnswer={onItemAnswer} levelLookup={levelLookup} prompt={currentMode.desc ? L(currentMode.desc) : undefined} />

            {showAbortBar && (
              <ConfirmBar
                text={t("confirmAbortRound")}
                confirmLabel={t("abort")}
                cancelLabel={t("continue")}
                onConfirm={abortRound}
                onCancel={() => setShowAbortBar(false)}
              />
            )}
          </div>
        )}

        {screen === "results" && result && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader title={resultMode?.startsWith("round:") ? t("roundFinished") : t("result")} onBack={backFromResults} />
            <ResultsScreen
              score={result.score}
              time={result.time}
              errors={result.errors}
              onRestart={() => {
                if (resultMode?.startsWith("round:")) { startRound(); return; }
                setGameKey(k => k + 1);
                setScreen("game");
              }}
              onMenu={backFromResults}
            />
          </div>
        )}

        {screen === "analytics" && (
          <div className="flex-1 flex flex-col overflow-hidden">
            <NavHeader title={t("analytics")} onBack={() => setScreen("lessons")} />
            <AnalyticsScreen
              history={history}
              onBack={() => setScreen("lessons")}
              onClearHistory={() => { clearHistory(); setHistory([]); }}
              onClearMastery={() => { clearMastery(); setMastery({}); }}
            />
          </div>
        )}

      </div>
    </div>
  );
}

