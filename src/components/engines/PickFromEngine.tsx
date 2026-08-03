import { useEffect, useRef, useState } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { FAIL, OK } from "../../constants";
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
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  prompt?: string;
  example?: string;
}

export function PickFromEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L, Lq } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const items = data();
  const [qs] = useState<DataItem[]>(() => shuffle(items).slice(0, 15));
  const [options, setOptions] = useState<DataItem[]>([]);
  const hintCh = useHintChannel();
  const {
    cur,
    sel,
    reaction,
    reactionOk,
    score,
    answered,
    qsTotal,
    answer,
    errorPending,
    dismissError,
  } = useGame(qs, onComplete, reactions, 10, 1000, onItemAnswer);

  useEffect(() => {
    const item = qs[cur];
    const wrongAnswers = item.decoys
      ? shuffle(item.decoys).slice(0, 3).map((a) => ({ ...item, answer: a }))
      : shuffle(items.filter((x) => x.answer !== item.answer)).slice(0, 3);
    setOptions(shuffle([item, ...wrongAnswers]));
    // FR-HINT-MODAL: hand this question s hint to the header button.
    hintCh.publish({ hint: L(item.hint), rule: item.rule ? L(item.rule) : undefined });
  }, [cur]);

  useEffect(() => () => hintCh.publish(null), []);

  const item = qs[cur];

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        <TaskPrompt text={prompt} example={example} />
        <h1 className="text-5xl font-black text-gray-900 mb-2 tracking-tighter text-center break-words max-w-full">
          {Lq(item.q)}
        </h1>
        {item.label && (
          <div className="text-sm font-semibold text-gray-600 mb-1">{L(item.label)}</div>
        )}
        <Correction
          show={sel !== null && sel !== item.answer}
          text={item.answer}
          rule={item.rule ? L(item.rule) : undefined}
        />
      </div>
      <Reaction text={reaction} ok={reactionOk} />
      <AnswerGrid options={options.map((o) => o.answer)}>
        {options.map((o, j) => (
          <AnswerBtn
            key={o.answer + j}
            val={o.answer}
            sel={sel}
            correctVal={item.answer}
            onClick={() => answer(o.answer, item.answer, { hinted: hintCh.wasUsed() })}
            className="text-lg"
          />
        ))}
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
