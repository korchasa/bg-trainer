import { useCallback, useEffect, useRef, useState } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { useTimer } from "../../hooks/useTimer";
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
import { itemKey } from "../../utils/itemKey";

interface TimedItem extends DataItem {
  options: DataItem[];
}

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  levelLookup?: (itemId: string) => number;
  prompt?: string;
  example?: string;
}

// FR-ENGINES: timed multiple-choice with speed bonus.
// FR-MASTERY speed-gate: if the current item's mastery level < 5, the timer is disabled
// and no speed bonus is awarded. New learners should not be pushed into System-1 guessing.
const SPEED_GATE_LEVEL = 5;

export function TimedEngine(
  { data, onComplete, onItemAnswer, levelLookup, prompt, example }: Props,
) {
  const { t, L, Lq } = useI18n();
  const reactions = { ok: L(OK) };
  const items = data();
  const [qs] = useState<TimedItem[]>(() =>
    shuffle(items).map((item) => {
      const wrong = shuffle(items.filter((x) => x.answer !== item.answer)).slice(0, 3);
      return { ...item, options: shuffle([item, ...wrong]) };
    })
  );
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
    advance,
    answer,
    errorPending,
    dismissError,
  } = useGame(qs, onComplete, reactions, 10, 1200, onItemAnswer);

  const { timeLeft, stop, reset } = useTimer(useCallback(() => {
    advance();
  }, [advance]));

  const curItem = qs[cur];
  const curLevel = levelLookup
    ? (() => {
      try {
        return levelLookup(itemKey(curItem));
      } catch {
        return 0;
      }
    })()
    : 0;
  const gated = curLevel < SPEED_GATE_LEVEL;

  // FR-HINT-MODAL: hand this question s hint to the header button.
  useEffect(() => {
    const q = qs[cur];
    hintCh.publish({ hint: L(q.hint), rule: q.rule ? L(q.rule) : undefined });
    if (gated) stop();
    else reset();
  }, [cur, gated]);

  useEffect(() => () => hintCh.publish(null), []);

  const go = (o: DataItem) => {
    stop();
    const bonus = gated ? 0 : Math.max(0, timeLeft * 2);
    answer(o.answer, qs[cur].answer, { extraPts: bonus, hinted: hintCh.wasUsed() });
  };

  const item = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6">
        {gated
          ? (
            <div className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 text-center">
              {t("noTimerNewItem")}
            </div>
          )
          : (
            <div
              className={`text-2xl font-mono font-black mb-6 ${
                timeLeft <= 3 ? "text-red-600" : "text-gray-600"
              }`}
            >
              ⏱ {timeLeft}с
            </div>
          )}
        <TaskPrompt text={prompt} example={example} />
      </div>
      <StickyQuestion>
        <h1 className="text-5xl font-black text-gray-900 tracking-tight text-center break-words max-w-full">
          {Lq(item.q)} ___
        </h1>
      </StickyQuestion>
      <div className="flex-1 mb-6" />
      <Reaction text={reaction} ok={reactionOk} />
      <AnswerGrid options={item.options.map((o) => o.answer)}>
        {item.options.map((o, j) => (
          <AnswerBtn
            key={o.answer + j}
            val={o.answer}
            sel={sel}
            correctVal={corr || item.answer}
            onClick={() => go(o)}
            className="text-xl"
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
