import { useState, useEffect, useRef } from "react";
import type { ParadigmItem } from "../../types";
import { shuffle, pickOK, pickFail } from "../../utils/shuffle";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { itemKey } from "../../utils/itemKey";
import { Reaction } from "../ui/Reaction";
import { TaskPrompt } from "../ui/TaskPrompt";

interface Props {
  data: () => ParadigmItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
}

// FR-PARADIGM: whole-paradigm completion trains schema, not isolated forms.
// One item = one 6-slot paradigm. Score = +5 per correct slot.
export function ParadigmEngine({ data, onComplete, onItemAnswer, prompt }: Props) {
  const { L, t } = useI18n();
  const items = data();
  const [qs] = useState<ParadigmItem[]>(() => shuffle(items));
  const [cur, setCur] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[] | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0);
  const eRef = useRef(0);

  useEffect(() => {
    const item = qs[cur];
    setSlots(item.pronouns.map(() => null));
    setPool(shuffle(item.forms));
    setChecked(null);
    setReaction("");
  }, [cur]);

  if (qs.length === 0) return null;
  const item = qs[cur];

  const fillNext = (form: string, poolIdx: number) => {
    if (checked) return;
    const nextSlotIdx = slots.findIndex(s => s === null);
    if (nextSlotIdx < 0) return;
    const newSlots = [...slots];
    newSlots[nextSlotIdx] = form;
    const newPool = pool.filter((_, i) => i !== poolIdx);
    setSlots(newSlots);
    setPool(newPool);
    if (newSlots.every(s => s !== null)) {
      const marks = newSlots.map((s, i) => s === item.forms[i]);
      setChecked(marks);
      const correctCount = marks.filter(Boolean).length;
      const pts = correctCount * 5;
      const ns = sRef.current + pts;
      setScore(ns);
      sRef.current = ns;
      const allOk = marks.every(Boolean);
      if (!allOk) eRef.current++;
      setReaction(allOk ? pickOK(L(OK)) : pickFail(L(FAIL)));
      onItemAnswer?.(itemKey(item), allOk, false);
      setTimeout(() => {
        if (cur + 1 < qs.length) setCur(c => c + 1);
        else onComplete(sRef.current, Date.now() - t0, eRef.current);
      }, 2200);
    }
  };

  const unsetSlot = (idx: number) => {
    if (checked) return;
    const val = slots[idx];
    if (!val) return;
    const newSlots = [...slots];
    newSlots[idx] = null;
    setSlots(newSlots);
    setPool([...pool, val]);
  };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{qs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(cur / qs.length) * 100}%` }} />
      </div>
      <TaskPrompt text={prompt} />
      <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight">{item.verb}</h1>
      <p className="text-sm font-medium text-gray-400 mb-4">({L(item.hint)})</p>
      <div className="w-full flex flex-col gap-2 mb-5">
        {item.pronouns.map((p, i) => {
          const val = slots[i];
          const ok = checked?.[i];
          const cls = checked
            ? (ok ? "bg-emerald-500 text-white border-emerald-500" : "bg-[#E60023] text-white border-[#E60023]")
            : (val ? "bg-[#111111] text-white border-[#111111] cursor-pointer" : "bg-gray-50 border-gray-200 text-gray-400");
          return (
            <div key={p} className="flex items-center gap-3">
              <span className="w-24 text-right text-sm font-semibold text-gray-500 shrink-0">{p}</span>
              <button onClick={() => val && unsetSlot(i)}
                className={`flex-1 px-4 py-3 border-2 rounded-[14px] font-bold text-base text-left transition-all ${cls}`}>
                {val ?? "___"}
                {checked && !ok && <span className="ml-2 text-white/80 text-xs font-semibold">→ {item.forms[i]}</span>}
              </button>
            </div>
          );
        })}
      </div>
      <Reaction text={reaction} />
      {checked && item.rule && checked.some(c => !c) && (
        <div className="text-xs text-gray-500 mt-1 mb-2 max-w-xs mx-auto text-center">{L(item.rule)}</div>
      )}
      <div className="flex flex-wrap gap-2 justify-center w-full min-h-[56px] items-start">
        {pool.length === 0 && !checked && <span className="text-gray-400 text-sm font-medium">{t("tapWordsBelow")}</span>}
        {pool.map((f, i) =>
          <button key={f + i} onClick={() => fillNext(f, i)}
            className="px-4 py-3 bg-white border-2 border-[#E9E9E9] text-[#111111] rounded-[14px] font-bold text-base hover:border-[#111111] cursor-pointer transition-all">
            {f}
          </button>
        )}
      </div>
    </div>
  );
}
