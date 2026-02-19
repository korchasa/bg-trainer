import { useState, useEffect } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
}

export function PickFromEngine({ data, onComplete }: Props) {
  const items = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 15));
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, reaction, score, answer } = useGame(qs, onComplete, 10, 1000);

  useEffect(() => {
    const item = qs[cur];
    const wrongAnswers = item.decoys
      ? shuffle(item.decoys).slice(0, 3).map(a => ({ ...item, answer: a }))
      : shuffle(items.filter(x => x.answer !== item.answer)).slice(0, 3);
    setOptions(shuffle([item, ...wrongAnswers]));
  }, [cur]);

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{item.label}</div>}
        <p className="text-base font-medium text-gray-400">({item.hint})</p>
        <Correction show={sel !== null && sel !== item.answer} text={item.answer} />
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={item.answer}
            onClick={() => answer(o.answer, item.answer)} className="py-4 text-lg" />
        )}
      </div>
    </div>
  );
}
