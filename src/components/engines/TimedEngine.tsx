import { useState, useEffect, useCallback, useRef } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { useTimer } from "../../hooks/useTimer";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";
import { TaskPrompt } from "../ui/TaskPrompt";
import { itemKey } from "../../utils/itemKey";

interface TimedItem extends DataItem {
  options: DataItem[];
}

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  levelLookup?: (itemId: string) => number;
  prompt?: string;
}

// FR-ENGINES: timed multiple-choice with speed bonus.
// FR-MASTERY speed-gate: if the current item's mastery level < 5, the timer is disabled
// and no speed bonus is awarded. New learners should not be pushed into System-1 guessing.
const SPEED_GATE_LEVEL = 5;

export function TimedEngine({ data, onComplete, onItemAnswer, levelLookup, prompt }: Props) {
  const { t, L, Lq } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const items = data();
  const [qs] = useState<TimedItem[]>(() =>
    shuffle(items).map(item => {
      const wrong = shuffle(items.filter(x => x.answer !== item.answer)).slice(0, 3);
      return { ...item, options: shuffle([item, ...wrong]) };
    })
  );
  const [showHint, setShowHint] = useState(false);
  const hintedRef = useRef(false);
  const { cur, sel, corr, reaction, score, answered, qsTotal, advance, answer } =
    useGame(qs, onComplete, reactions, 10, 1200, onItemAnswer);

  const { timeLeft, stop, reset } = useTimer(useCallback(() => {
    advance();
  }, [advance]));

  const curItem = qs[cur];
  const curLevel = levelLookup ? (() => { try { return levelLookup(itemKey(curItem)); } catch { return 0; } })() : 0;
  const gated = curLevel < SPEED_GATE_LEVEL;

  useEffect(() => {
    setShowHint(false);
    hintedRef.current = false;
    if (gated) { stop(); } else { reset(); }
  }, [cur, gated]);

  const go = (o: DataItem) => {
    stop();
    const bonus = gated ? 0 : Math.max(0, timeLeft * 2);
    answer(o.answer, qs[cur].answer, { extraPts: bonus, hinted: hintedRef.current });
  };

  const revealHint = () => { setShowHint(true); hintedRef.current = true; };

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        {gated
          ? <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">{t("noTimerNewItem")}</div>
          : <div className={`text-2xl font-mono font-black mb-6 ${timeLeft <= 3 ? "text-red-500" : "text-gray-400"}`}>
              ⏱ {timeLeft}с
            </div>}
        <TaskPrompt text={prompt} />
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">{Lq(item.q)} ___</h1>
        {showHint || sel !== null
          ? <p className="text-base font-medium text-gray-400">({L(item.hint)})</p>
          : (
            <button onClick={revealHint} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
              {t("hintBtn")}
            </button>
          )}
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {item.options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={corr || item.answer}
            onClick={() => go(o)} className="h-16 text-xl" />
        )}
      </div>
    </div>
  );
}
