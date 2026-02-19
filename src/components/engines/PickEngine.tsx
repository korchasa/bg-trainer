import { useState, useEffect } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  accent?: boolean;
}

export function PickEngine({ data, onComplete, accent = false }: Props) {
  const items = data();
  const [qs] = useState(() => shuffle(items));
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, corr, reaction, score, answer } = useGame(qs, onComplete, 10, 1800);

  useEffect(() => { setOptions(shuffle(items)); }, [cur]);

  const item = qs[cur];
  const shownAnswer = corr || item.answer;
  const shownHint = items.find(x => x.answer === shownAnswer)?.hint || item.hint;

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={cur} total={qs.length} score={score} accent={accent} />
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        <p className="text-lg font-semibold text-gray-400">({item.hint})</p>
        {sel !== null && (
          <div className="text-center mt-6">
            <div className="text-3xl font-black text-gray-900">{shownAnswer}</div>
            <div className="text-base text-gray-400 mt-1">{shownHint}</div>
          </div>
        )}
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-3 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={shownAnswer}
            onClick={() => answer(o.answer, item.answer)} className="h-16 text-lg" />
        )}
      </div>
    </div>
  );
}
