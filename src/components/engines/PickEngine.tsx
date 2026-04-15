import { useState, useEffect, useRef } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  accent?: boolean;
}

export function PickEngine({ data, onComplete, onItemAnswer, accent = false }: Props) {
  const { t, L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const [qs] = useState(() => shuffle(data()));
  const [options, setOptions] = useState<DataItem[]>([]);
  const [showHint, setShowHint] = useState(false);
  const hintedRef = useRef(false);
  const { cur, sel, corr, reaction, score, answered, qsTotal, answer } =
    useGame(qs, onComplete, reactions, 10, 1800, onItemAnswer);

  useEffect(() => {
    setOptions(shuffle(qs));
    setShowHint(false);
    hintedRef.current = false;
  }, [cur]);

  const item = qs[cur];
  const shownAnswer = corr || item.answer;
  const shownItem = qs.find(x => x.answer === shownAnswer) ?? item;
  const shownHint = L(shownItem.hint);
  const revealHint = () => { setShowHint(true); hintedRef.current = true; };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} accent={accent} />
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        <h1 className="text-7xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {showHint || sel !== null
          ? <p className="text-lg font-semibold text-gray-400">({L(item.hint)})</p>
          : (
            <button onClick={revealHint} className="mt-2 text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors">
              {t("hintBtn")}
            </button>
          )}
        {sel !== null && (
          <div className="text-center mt-6">
            <div className="text-3xl font-black text-gray-900">{shownAnswer}</div>
            <div className="text-base text-gray-400 mt-1">{shownHint}</div>
            {item.rule && sel !== item.answer && (
              <div className="text-xs text-gray-500 mt-3 max-w-xs mx-auto">{L(item.rule)}</div>
            )}
          </div>
        )}
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-3 gap-3 mb-4">
        {options.map((o, j) =>
          <AnswerBtn key={o.answer + j} val={o.answer} sel={sel} correctVal={shownAnswer}
            onClick={() => answer(o.answer, item.answer, { hinted: hintedRef.current })} className="h-16 text-lg" />
        )}
      </div>
    </div>
  );
}
