import { useState, useEffect, useRef } from "react";
import type { OddItem, DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";
import { TaskPrompt } from "../ui/TaskPrompt";

interface Props {
  data: () => OddItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  prompt?: string;
}

// FR-ODD: user taps the single word that doesn't belong to the paradigm/category.
export function OddOneOutEngine({ data, onComplete, onItemAnswer, prompt }: Props) {
  const { L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const items = data();
  const [qs] = useState<OddItem[]>(() => shuffle(items));
  const [tiles, setTiles] = useState<string[]>([]);
  const hintedRef = useRef(false);
  const { cur, sel, reaction, score, answered, qsTotal, answer } =
    useGame(qs as unknown as DataItem[], onComplete, reactions, 10, 1200, onItemAnswer);

  useEffect(() => {
    setTiles(shuffle(qs[cur].words));
    hintedRef.current = false;
  }, [cur]);

  const item = qs[cur];
  const correct = item.odd;

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6 text-center">
        <TaskPrompt text={prompt} />
        <p className="text-base font-medium text-gray-500 mb-2">({L(item.hint)})</p>
        {sel !== null && item.rule && sel !== correct && (
          <div className="text-xs text-gray-500 mt-3 max-w-xs mx-auto">{L(item.rule)}</div>
        )}
      </div>
      <Reaction text={reaction} />
      <div className="w-full grid grid-cols-2 gap-3 mb-4">
        {tiles.map((w, j) =>
          <AnswerBtn key={w + j} val={w} sel={sel} correctVal={correct}
            onClick={() => answer(w, correct, { hinted: hintedRef.current })} className="h-16 text-xl" />
        )}
      </div>
    </div>
  );
}
