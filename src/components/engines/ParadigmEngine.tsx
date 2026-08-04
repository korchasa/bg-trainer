import { useEffect, useRef, useState } from "react";
import type { ParadigmItem } from "../../types";
import { pickFail, pickOK, shuffle } from "../../utils/shuffle";
import { FAIL, OK } from "../../constants";
import { useI18n } from "../../i18n/context";
import { itemKey } from "../../utils/itemKey";
import { Reaction } from "../ui/Reaction";
import { TaskPrompt } from "../ui/TaskPrompt";
import { StickyQuestion } from "../ui/StickyQuestion";
import { StickyPool } from "../ui/StickyPool";

interface Props {
  data: () => ParadigmItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
}

// FR-PARADIGM / FR-TASK-MODEL: the 1sg row is pre-filled as the worked example —
// it anchors the pattern the learner extends, so it is not tappable and earns no
// points. This row IS the mode's model, which is why no `example` text is shown
// above the paradigm: spelling more forms out there would solve the open slots.
const GIVEN = 0;

// FR-PARADIGM: whole-paradigm completion trains schema, not isolated forms.
// One item = one 6-slot paradigm. Score = +5 per correct slot the learner fills.
export function ParadigmEngine({ data, onComplete, onItemAnswer, prompt }: Props) {
  const { L, t } = useI18n();
  const items = data();
  const [qs] = useState<ParadigmItem[]>(() => shuffle(items));
  const [cur, setCur] = useState(0);
  const [slots, setSlots] = useState<(string | null)[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [checked, setChecked] = useState<boolean[] | null>(null);
  const [reaction, setReaction] = useState("");
  // FR-FEEDBACK-CENTRED: the overlay colours itself by verdict, so the verdict
  // travels with the text.
  const [reactionOk, setReactionOk] = useState(false);
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0);
  const eRef = useRef(0);

  useEffect(() => {
    const item = qs[cur];
    setSlots(item.pronouns.map((_, i) => (i === GIVEN ? item.forms[GIVEN] : null)));
    setPool(shuffle(item.forms.filter((_, i) => i !== GIVEN)));
    setChecked(null);
    setReaction("");
  }, [cur]);

  if (qs.length === 0) return null;
  const item = qs[cur];

  const fillNext = (form: string, poolIdx: number) => {
    if (checked) return;
    const nextSlotIdx = slots.findIndex((s) => s === null);
    if (nextSlotIdx < 0) return;
    const newSlots = [...slots];
    newSlots[nextSlotIdx] = form;
    const newPool = pool.filter((_, i) => i !== poolIdx);
    setSlots(newSlots);
    setPool(newPool);
    if (newSlots.every((s) => s !== null)) {
      const marks = newSlots.map((s, i) => s === item.forms[i]);
      setChecked(marks);
      const correctCount = marks.filter((m, i) => m && i !== GIVEN).length;
      const pts = correctCount * 5;
      const ns = sRef.current + pts;
      setScore(ns);
      sRef.current = ns;
      const allOk = marks.every(Boolean);
      if (!allOk) eRef.current++;
      setReaction(allOk ? pickOK(L(OK)) : pickFail(L(FAIL)));
      setReactionOk(allOk);
      onItemAnswer?.(itemKey(item), allOk, false);
      setTimeout(() => {
        if (cur + 1 < qs.length) setCur((c) => c + 1);
        else onComplete(sRef.current, Date.now() - t0, eRef.current);
      }, 2200);
    }
  };

  const unsetSlot = (idx: number) => {
    if (checked || idx === GIVEN) return;
    const val = slots[idx];
    if (!val) return;
    const newSlots = [...slots];
    newSlots[idx] = null;
    setSlots(newSlots);
    setPool([...pool, val]);
  };

  // One pronoun and its form. Lifted out of the map so the worked-example row can
  // be rendered inside the pinned header while the rest stay in the scrolling
  // block — see the pinning note at the call site.
  const row = (p: string, i: number) => {
    const val = slots[i];
    const ok = checked?.[i];
    const given = i === GIVEN;
    const cls = given
      ? "bg-gray-100 border-dashed border-gray-400 text-gray-700"
      : checked
      ? (ok
        ? "bg-emerald-500 text-white border-emerald-500"
        : "bg-[#E60023] text-white border-[#E60023]")
      : (val
        ? "bg-[#111111] text-white border-[#111111] cursor-pointer"
        : "bg-gray-50 border-gray-300 text-gray-500");
    return (
      <div key={p} className="flex items-center gap-3">
        <span className="w-20 xs:w-24 text-right text-sm font-semibold text-gray-600 shrink-0">
          {p}
        </span>
        <button
          // Keyed by the form it holds, so one arriving mounts a new node and the
          // landing animation plays. The worked-example row keeps a constant key:
          // it is filled before the learner does anything, so animating it would
          // announce a placement that never happened.
          key={given ? "given" : (val ?? "empty")}
          onClick={() => val && unsetSlot(i)}
          disabled={given}
          className={`flex-1 min-w-0 px-4 py-3 min-h-[3rem] border-2 rounded-[14px] font-bold text-base text-left leading-tight break-words transition-all ${cls} ${
            val && !given ? "slot-drop" : ""
          }`}
        >
          {val ?? "___"}
          {given && (
            <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
              {t("exampleLabel")}
            </span>
          )}
          {!given && checked && !ok && (
            <span className="ml-2 text-white/90 text-sm font-semibold">
              → {item.forms[i]}
            </span>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-500 mb-3">
        <span>{cur + 1}/{qs.length}</span>
        <span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
        <div
          className="h-full rounded-full transition-all duration-300 bg-[#111111]"
          style={{ width: `${(cur / qs.length) * 100}%` }}
        />
      </div>
      <TaskPrompt text={prompt} />
      <StickyQuestion>
        <h1 className="text-4xl font-black text-gray-900 mb-1 tracking-tight break-words max-w-full text-center">
          {item.verb}
        </h1>
        <p className="text-base font-medium text-gray-600 text-center">({L(item.hint)})</p>
        {
          /* FR-QUESTION-PINNED: the 1sg row is this mode's model — it is why no
            worked example is printed above the paradigm. Left in the scrolling
            block it left the screen exactly while the last rows were being
            filled, which is when a learner most wants to check the pattern. */
        }
        <div className="w-full mt-3">{row(item.pronouns[GIVEN], GIVEN)}</div>
      </StickyQuestion>
      <div className="h-4" />
      <div className="w-full flex flex-col gap-2 mb-5">
        {item.pronouns.map((p, i) => (i === GIVEN ? null : row(p, i)))}
      </div>
      <Reaction text={reaction} ok={reactionOk} />
      {checked && item.rule && checked.some((c) => !c) && (
        <div className="text-sm text-gray-700 mt-1 mb-2 max-w-xs mx-auto text-center leading-snug">
          {L(item.rule)}
        </div>
      )}
      {
        /* FR-QUESTION-PINNED, bottom end: the forms stay under the thumb while the
          rows they fill — the worked-example row first among them — stay in view.
          Must remain the last child; see StickyPool. */
      }
      <StickyPool>
        <div className="flex flex-wrap gap-2 justify-center w-full min-h-[56px] items-start">
          {pool.map((f, i) => (
            <button
              key={f + i}
              onClick={() => fillNext(f, i)}
              className="px-3 py-2 bg-white border-2 border-[#E9E9E9] text-[#111111] rounded-[14px] font-bold text-sm hover:border-[#111111] cursor-pointer transition-all"
            >
              {f}
            </button>
          ))}
        </div>
      </StickyPool>
    </div>
  );
}
