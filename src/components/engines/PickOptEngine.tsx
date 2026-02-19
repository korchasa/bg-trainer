import { useState } from "react";
import type { DataItem, PickOptData } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface Props {
  data: () => PickOptData;
  onComplete: (score: number, time: number, errors: number) => void;
}

export function PickOptEngine({ data, onComplete }: Props) {
  const { items, opts: options } = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 15));
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 10, 1000);

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{item.label}</div>}
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
        <Correction show={sel !== null && sel !== item.answer} text={`${item.answer} → ${item.hint}`} />
      </div>
      <Reaction text={reaction} />
      <div className="flex flex-wrap gap-3 justify-center w-full mb-4">
        {options.map(o =>
          <AnswerBtn key={o} val={o} sel={sel} correctVal={item.answer}
            onClick={() => answer(o, item.answer)} className="px-6 py-4 text-lg" />
        )}
      </div>
    </div>
  );
}
