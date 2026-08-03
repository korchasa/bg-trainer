import { useState, useEffect, useRef } from "react";
import type { DataItem, PickOptData } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { AnswerBtn } from "../ui/AnswerBtn";
import { AnswerGrid } from "../ui/AnswerGrid";
import { TaskPrompt } from "../ui/TaskPrompt";
import { ErrorDialog } from "../ui/ErrorDialog";
import { useHintChannel } from "../../hooks/useHintChannel";

interface Props {
  data: () => PickOptData;
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  prompt?: string;
  example?: string;
}

export function PickOptEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L, Lq } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const { items, opts: options } = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 15));
  const hintCh = useHintChannel();
  const { cur, sel, reaction, score, answered, qsTotal, answer, errorPending, dismissError } =
    useGame(qs, onComplete, reactions, 10, 1000, onItemAnswer);

  // FR-HINT-MODAL: hand this question s hint to the header button.
  useEffect(() => {
    const q = qs[cur];
    hintCh.publish({ hint: L(q.hint), rule: q.rule ? L(q.rule) : undefined });
  }, [cur]);

  useEffect(() => () => hintCh.publish(null), []);

  const item = qs[cur];

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <TaskPrompt text={prompt} example={example} />
        <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter text-center break-words max-w-full">{Lq(item.q)}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-600 mb-1">{L(item.label)}</div>}
        <Correction show={sel !== null && sel !== item.answer} text={`${item.answer} → ${L(item.hint)}`} rule={item.rule ? L(item.rule) : undefined} />
      </div>
      <Reaction text={reaction} />
      <AnswerGrid options={options}>
        {options.map(o =>
          <AnswerBtn key={o} val={o} sel={sel} correctVal={item.answer}
            onClick={() => answer(o, item.answer, { hinted: hintCh.wasUsed() })} className="text-lg" />
        )}
      </AnswerGrid>
      {errorPending && (
        <ErrorDialog
          title={t("errorTitle")}
          correctLabel={t("correctAnswer")}
          correct={item.answer}
          hint={L(item.hint)}
          rule={item.rule ? L(item.rule) : undefined}
          continueLabel={t("continue")}
          onContinue={dismissError}
        />
      )}
    </div>
  );
}
