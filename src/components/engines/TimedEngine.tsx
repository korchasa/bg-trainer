import { useState, useEffect, useCallback } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { useTimer } from "../../hooks/useTimer";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface TimedItem extends DataItem {
  options: DataItem[];
}

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
}

export function TimedEngine({ data, onComplete }: Props) {
  const items = data();
  const [qs] = useState<TimedItem[]>(() =>
    shuffle(items).map(item => {
      const wrong = shuffle(items.filter(x => x.answer !== item.answer)).slice(0, 3);
      return { ...item, options: shuffle([item, ...wrong]) };
    })
  );
  const { cur, sel, corr, reaction, score, advance, answer } = useGame(qs, onComplete, 10, 1200);

  const { timeLeft, stop, reset } = useTimer(useCallback(() => {
    advance();
  }, [advance]));

  useEffect(() => { reset(); }, [cur]);

  const go = (o: DataItem) => {
    stop();
    const bonus = Math.max(0, timeLeft * 2);
    answer(o.answer, qs[cur].answer, bonus);
  };

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <div className={`text-2xl font-mono font-black mb-6 ${timeLeft <= 3 ? "text-red-500" : "text-gray-400"}`}>
          ⏱ {timeLeft}с
        </div>
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tight">{item.q} ___</h1>
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
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
