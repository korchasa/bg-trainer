import { useRef, useState } from "react";
import type { LiItem } from "../../types";
import { pickFail, pickOK, shuffle } from "../../utils/shuffle";
import { ACCENT, FAIL, OK } from "../../constants";
import { useI18n } from "../../i18n/context";
import { itemKey } from "../../utils/itemKey";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { TaskPrompt } from "../ui/TaskPrompt";

interface Props {
  data: () => LiItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
  example?: string;
}

export function LiEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L } = useI18n();
  const items = data();
  const [qs] = useState<LiItem[]>(() => shuffle(items).slice(0, 12));
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<number | null>(null);
  const [reaction, setReaction] = useState("");
  // FR-FEEDBACK-CENTRED: the overlay colours itself by verdict, so the verdict
  // travels with the text.
  const [reactionOk, setReactionOk] = useState(false);
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0);
  const eRef = useRef(0);

  const go = (position: number) => {
    if (sel !== null) return;
    setSel(position);
    const ok = position === qs[cur].liPosition;
    if (ok) {
      const ns = score + 15;
      setScore(ns);
      sRef.current = ns;
      setReaction(pickOK(L(OK)));
      setReactionOk(true);
    } else {
      eRef.current++;
      setReaction(pickFail(L(FAIL)));
      setReactionOk(false);
    }
    onItemAnswer?.(itemKey(qs[cur]), ok, false);
    setTimeout(() => {
      if (cur + 1 < qs.length) {
        setCur((c) => c + 1);
        setSel(null);
        setReaction("");
      } else {
        onComplete(sRef.current, Date.now() - t0, eRef.current);
      }
    }, 1500);
  };

  const q = qs[cur];
  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-500 mb-3">
        <span>{cur + 1}/{qs.length}</span>
        <span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-10">
        <div
          className="h-full rounded-full transition-all duration-300 bg-[#111111]"
          style={{ width: `${(cur / qs.length) * 100}%` }}
        />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full mb-6">
        <TaskPrompt text={prompt} example={example} />
        <p className="text-base font-semibold text-gray-600 mb-2 text-center leading-snug">
          {L(q.translation).split(/(\*[^*]+\*)/g).map((part, i) =>
            part.startsWith("*") && part.endsWith("*")
              ? (
                <span key={i} className="underline decoration-2 underline-offset-2 text-gray-900">
                  {part.slice(1, -1)}
                </span>
              )
              : <span key={i}>{part}</span>
          )}
        </p>
        <p className="text-base font-medium text-gray-700 mb-6 text-center">
          {t("tapPositionFor")} <span className="font-bold text-gray-900">ли</span>
        </p>
        <div className="flex flex-wrap items-center gap-2 justify-center w-full">
          {q.words.map((word, i) => (
            <div key={i} className="flex items-center gap-1">
              <span className="px-3 py-2 bg-[#F2F2F2] rounded-[14px] text-gray-900 font-bold text-lg">
                {word}
              </span>
              <button
                onClick={() => go(i)}
                className={`w-10 h-10 rounded-[14px] font-bold text-sm transition-all flex items-center justify-center border-2 border-dashed
                  ${
                  sel === null
                    ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white cursor-pointer"
                    : ""
                }
                  ${
                  sel === i && i === q.liPosition
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : ""
                }
                  ${
                  sel === i && i !== q.liPosition
                    ? `bg-[${ACCENT}] text-white border-[${ACCENT}]`
                    : ""
                }
                  ${
                  sel !== null && sel !== i && i === q.liPosition
                    ? "bg-emerald-500 text-white border-emerald-500 animate-pulse"
                    : ""
                }
                  ${
                  sel !== null && sel !== i && i !== q.liPosition
                    ? "border-gray-300 text-gray-500"
                    : ""
                }`}
              >
                ли
              </button>
            </div>
          ))}
          <span className="text-gray-600 font-bold text-xl ml-1">?</span>
        </div>
        <div className="mt-4">
          <Correction show={sel !== null} text={q.result} />
        </div>
      </div>
      <Reaction text={reaction} ok={reactionOk} />
    </div>
  );
}
