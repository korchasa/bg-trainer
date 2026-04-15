import { useState, useEffect, useRef } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
}

export function PickFromEngine({ data, onComplete, onItemAnswer }: Props) {
  const { t, L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const items = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 15));
  const [options, setOptions] = useState<DataItem[]>([]);
  const [showHint, setShowHint] = useState(false);
  const hintedRef = useRef(false);
  const { cur, sel, reaction, score, answered, qsTotal, answer } =
    useGame(qs, onComplete, reactions, 10, 1000, onItemAnswer);

  useEffect(() => {
    const item = qs[cur];
    const wrongAnswers = item.decoys
      ? shuffle(item.decoys).slice(0, 3).map(a => ({ ...item, answer: a }))
      : shuffle(items.filter(x => x.answer !== item.answer)).slice(0, 3);
    setOptions(shuffle([item, ...wrongAnswers]));
    setShowHint(false);
    hintedRef.current = false;
  }, [cur]);

  const item = qs[cur];
  const revealHint = () => { setShowHint(true); hintedRef.current = true; };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{L(item.label)}</div>}
        {showHint || sel !== null
          ? <p className="text-base font-medium text-gray-400">({L(item.hint)})</p>
          : (
            <button onClick={revealHint} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
              {t("hintBtn")}
            </button>
          )}
        <Correction show={sel !== null && sel !== item.answer} text={item.answer} rule={item.rule ? L(item.rule) : undefined} />
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={item.answer}
            onClick={() => answer(o.answer, item.answer, { hinted: hintedRef.current })} className="py-4 text-lg" />
        )}
      </div>
    </div>
  );
}
