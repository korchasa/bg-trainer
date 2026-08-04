import { useEffect, useState } from "react";
import type { DataItem, OddItem, SessionComplete } from "../../types";
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

interface Props {
  data: () => OddItem[];
  onComplete: SessionComplete;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  prompt?: string;
  example?: string;
}

// FR-ODD: user taps the single word that doesn't belong to the paradigm/category.
export function OddOneOutEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L } = useI18n();
  const reactions = { ok: L(OK) };
  const items = data();
  const [qs] = useState<OddItem[]>(() => shuffle(items));
  const [tiles, setTiles] = useState<string[]>([]);
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
  } = useGame(qs as unknown as DataItem[], onComplete, reactions, 10, 1200, onItemAnswer);

  useEffect(() => {
    setTiles(shuffle(qs[cur].words));
  }, [cur]);

  const item = qs[cur];
  const correct = item.odd;

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      {
        /* Slack above as well as below: on a screen that fits, the question group
          stays centred; when it overflows both spacers collapse to nothing. */
      }
      <div className="flex-1" />
      <TaskPrompt text={prompt} example={example} />
      <StickyQuestion>
        <p className="text-base font-medium text-gray-600 text-center">({L(item.hint)})</p>
      </StickyQuestion>
      <div className="flex-1 flex flex-col items-center justify-center mb-6 text-center">
        {sel !== null && item.rule && sel !== correct && (
          <div className="text-sm text-gray-700 mt-3 max-w-xs mx-auto leading-snug">
            {L(item.rule)}
          </div>
        )}
      </div>
      <Reaction text={reaction} ok={reactionOk} />
      <AnswerGrid options={tiles}>
        {tiles.map((w, j) => (
          <AnswerBtn
            key={w + j}
            val={w}
            sel={sel}
            correctVal={correct}
            onClick={() => answer(w, correct)}
            className="text-xl"
          />
        ))}
      </AnswerGrid>
      {errorPending && (
        <ErrorDialog
          title={t("errorTitle")}
          correctLabel={t("correctAnswer")}
          correct={correct}
          hint={L(item.hint)}
          rule={item.rule ? L(item.rule) : undefined}
          continueLabel={t("continue")}
          onContinue={dismissError}
        />
      )}
    </div>
  );
}
