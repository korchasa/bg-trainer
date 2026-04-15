import { useState, useEffect } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { ACCENT, OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { TaskPrompt } from "../ui/TaskPrompt";

function makeNegDecoys(corr: string): string[] {
  const words = corr.split(" ");
  const decoys = new Set<string>();
  let attempts = 0;
  while (decoys.size < 2 && attempts < 40) {
    attempts++;
    const shuffled = shuffle(words).join(" ");
    if (shuffled !== corr) decoys.add(shuffled);
  }
  return [...decoys].slice(0, 2);
}

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
}

export function NegEngine({ data, onComplete, onItemAnswer, prompt }: Props) {
  const { L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const items = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 12));
  const [options, setOptions] = useState<DataItem[]>([]);
  const { cur, sel, reaction, score, answered, qsTotal, answer } = useGame(qs, onComplete, reactions, 15, 1200, onItemAnswer);

  useEffect(() => {
    const decoys = makeNegDecoys(qs[cur].answer).map(a => ({ ...qs[cur], answer: a }));
    setOptions(shuffle([qs[cur], ...decoys]));
  }, [cur]);

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} accent />
      <div className="flex-1 flex flex-col items-center justify-center mb-6 text-center">
        <TaskPrompt text={prompt} />
        <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">{item.q}</h1>
        <p className="text-base font-medium text-gray-500">({L(item.hint)})</p>
      </div>
      <Reaction text={reaction} />
      <div className="w-full flex flex-col gap-3 mb-4">
        {options.map((o, j) => {
          let btnCls = "bg-white border-2 border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer";
          let circleStyle = "border-gray-200";
          if (sel !== null) {
            if (o.answer === item.answer) {
              btnCls = "bg-emerald-500 text-white border-emerald-500 cursor-default";
              circleStyle = "border-white bg-white/30";
            } else if (o.answer === sel) {
              btnCls = `text-white border-[${ACCENT}] cursor-default`;
              circleStyle = "border-white bg-white/30";
            } else {
              btnCls = "bg-white text-gray-300 border-[#E9E9E9] cursor-default";
              circleStyle = "border-gray-100";
            }
          }
          return (
            <button
              key={o.answer + j}
              onClick={sel === null ? () => answer(o.answer, item.answer) : undefined}
              style={sel !== null && o.answer === sel && o.answer !== item.answer ? { backgroundColor: ACCENT } : undefined}
              className={`w-full p-5 text-left text-base font-semibold flex items-center gap-3 rounded-[20px] transition-all ${btnCls}`}
            >
              <span className="flex-1">{o.answer}</span>
              <div className={`w-5 h-5 rounded-full border-2 shrink-0 transition-all ${circleStyle}`} />
            </button>
          );
        })}
      </div>
    </div>
  );
}
