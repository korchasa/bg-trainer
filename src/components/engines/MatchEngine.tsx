import { useState, useRef, useEffect } from "react";
import type { MatchItem } from "../../types";
import { shuffle, pickOK, pickFail } from "../../utils/shuffle";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { itemKey } from "../../utils/itemKey";
import { Reaction } from "../ui/Reaction";
import { TaskPrompt } from "../ui/TaskPrompt";

interface Props {
  data: () => MatchItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
}

type SlotState = "idle" | "matched" | "flash-ok" | "flash-fail";

// FR-MATCH: relational encoding via pair tapping (left ↔ right). Session = all pairs once.
export function MatchEngine({ data, onComplete, onItemAnswer, prompt }: Props) {
  const { L } = useI18n();
  const items = data();
  const [pairs] = useState<MatchItem[]>(() => shuffle(items));
  const [leftOrder] = useState<number[]>(() => shuffle(pairs.map((_, i) => i)));
  const [rightOrder] = useState<number[]>(() => shuffle(pairs.map((_, i) => i)));
  const [selLeft, setSelLeft] = useState<number | null>(null);
  const [leftState, setLeftState] = useState<Record<number, SlotState>>({});
  const [rightState, setRightState] = useState<Record<number, SlotState>>({});
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [matched, setMatched] = useState(0);
  const [t0] = useState(Date.now());
  const errRef = useRef<Set<number>>(new Set());
  const sRef = useRef(0);
  const mRef = useRef(0);
  const attemptedRef = useRef<Set<number>>(new Set());
  const finishedRef = useRef(false);

  const finish = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete(sRef.current, Date.now() - t0, errRef.current.size);
  };

  const handleLeft = (idx: number) => {
    if (leftState[idx] === "matched") return;
    setSelLeft(idx);
  };

  const handleRight = (idx: number) => {
    if (rightState[idx] === "matched" || selLeft === null) return;
    const ok = selLeft === idx;
    if (ok) {
      setLeftState(s => ({ ...s, [selLeft]: "matched" }));
      setRightState(s => ({ ...s, [idx]: "matched" }));
      setSelLeft(null);
      if (!attemptedRef.current.has(selLeft)) {
        const ns = sRef.current + 10;
        setScore(ns);
        sRef.current = ns;
      }
      attemptedRef.current.add(selLeft);
      setReaction(pickOK(L(OK)));
      onItemAnswer?.(itemKey(pairs[selLeft]), true, false);
      const nm = mRef.current + 1;
      mRef.current = nm;
      setMatched(nm);
      if (nm >= pairs.length) {
        setTimeout(finish, 800);
      }
    } else {
      errRef.current.add(selLeft);
      attemptedRef.current.add(selLeft);
      const leftWas = selLeft;
      setLeftState(s => ({ ...s, [leftWas]: "flash-fail" }));
      setRightState(s => ({ ...s, [idx]: "flash-fail" }));
      setReaction(pickFail(L(FAIL)));
      onItemAnswer?.(itemKey(pairs[selLeft]), false, false);
      setSelLeft(null);
      setTimeout(() => {
        setLeftState(s => {
          if (s[leftWas] !== "flash-fail") return s;
          const ns = { ...s }; delete ns[leftWas]; return ns;
        });
        setRightState(s => {
          if (s[idx] !== "flash-fail") return s;
          const ns = { ...s }; delete ns[idx]; return ns;
        });
      }, 600);
    }
  };

  useEffect(() => {
    if (pairs.length === 0) finish();
  }, []);

  const cellCls = (s: SlotState | undefined, selected: boolean) => {
    if (s === "matched") return "bg-emerald-500 text-white border-emerald-500 cursor-default";
    if (s === "flash-fail") return "bg-[#E60023] text-white border-[#E60023]";
    if (selected) return "bg-[#111111] text-white border-[#111111]";
    return "bg-white border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer";
  };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{matched}/{pairs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(matched / pairs.length) * 100}%` }} />
      </div>
      <TaskPrompt text={prompt} />
      <div className="w-full grid grid-cols-2 gap-3 mb-6 mt-2">
        <div className="flex flex-col gap-2">
          {leftOrder.map(i =>
            <button key={`L${i}`} onClick={() => handleLeft(i)}
              className={`px-3 py-3 border-2 rounded-[14px] font-bold text-base text-center transition-all ${cellCls(leftState[i], selLeft === i)}`}>
              {pairs[i].left}
            </button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          {rightOrder.map(i =>
            <button key={`R${i}`} onClick={() => handleRight(i)}
              className={`px-3 py-3 border-2 rounded-[14px] font-bold text-base text-center transition-all ${cellCls(rightState[i], false)}`}>
              {pairs[i].right}
            </button>
          )}
        </div>
      </div>
      <Reaction text={reaction} />
    </div>
  );
}
