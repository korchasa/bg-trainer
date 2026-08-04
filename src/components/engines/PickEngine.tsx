import { useEffect, useRef, useState } from "react";
import type { DataItem, SessionComplete } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { AnswerBtn } from "../ui/AnswerBtn";
import { AnswerGrid } from "../ui/AnswerGrid";
import { TaskPrompt } from "../ui/TaskPrompt";
import { StickyQuestion } from "../ui/StickyQuestion";
import { ErrorDialog } from "../ui/ErrorDialog";
import { useHintChannel } from "../../hooks/useHintChannel";

interface Props {
  data: () => DataItem[];
  onComplete: SessionComplete;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  accent?: boolean;
  prompt?: string;
  example?: string;
}

export function PickEngine(
  { data, onComplete, onItemAnswer, accent = false, prompt, example }: Props,
) {
  const { t, L, Lq } = useI18n();
  const reactions = { ok: L(OK) };
  const [qs] = useState(() => shuffle(data()));
  const [options, setOptions] = useState<DataItem[]>([]);
  const hintCh = useHintChannel();
  const {
    cur,
    sel,
    corr,
    reaction,
    reactionOk,
    score,
    answered,
    qsTotal,
    answer,
    errorPending,
    dismissError,
  } = useGame(qs, onComplete, reactions, 10, 1800, onItemAnswer);

  // FR-HINT-MODAL: the header owns the hint button, so each question hands its
  // hint to the channel; unmounting clears it so the button leaves with the game.
  useEffect(() => {
    setOptions(shuffle(qs));
    const q = qs[cur];
    hintCh.publish({ hint: L(q.hint), rule: q.rule ? L(q.rule) : undefined });
  }, [cur]);

  useEffect(() => () => hintCh.publish(null), []);

  const item = qs[cur];
  const shownAnswer = corr || item.answer;
  const shownItem = qs.find((x) => x.answer === shownAnswer) ?? item;

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} accent={accent} />
      {
        /* Slack above as well as below: on a screen that fits, the question group
          stays centred; when it overflows both spacers collapse to nothing. */
      }
      <div className="flex-1" />
      <TaskPrompt text={prompt} example={example} />
      <StickyQuestion>
        <h1 className="text-7xl font-black text-gray-900 tracking-tighter text-center break-words max-w-full">
          {Lq(item.q)}
        </h1>
      </StickyQuestion>
      <div className="flex-1 flex flex-col items-center justify-center mb-8">
        {sel !== null && (
          <div className="text-center mt-6">
            <div className="text-3xl font-black text-gray-900 break-words">{shownAnswer}</div>
            {item.rule && sel !== item.answer && (
              <div className="text-sm text-gray-700 mt-3 max-w-xs mx-auto leading-snug">
                {L(item.rule)}
              </div>
            )}
          </div>
        )}
      </div>
      <Reaction text={reaction} ok={reactionOk} />
      <AnswerGrid options={options.map((o) => o.answer)}>
        {options.map((o, j) => (
          <AnswerBtn
            key={o.answer + j}
            val={o.answer}
            sel={sel}
            correctVal={shownAnswer}
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
