import { useEffect, useMemo, useRef, useState } from "react";
import type { DataItem, FrameData, FrameItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { FAIL, OK } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { TaskPrompt } from "../ui/TaskPrompt";
import { StickyQuestion } from "../ui/StickyQuestion";
import { ErrorDialog } from "../ui/ErrorDialog";
import { useHintChannel } from "../../hooks/useHintChannel";

interface Props {
  data: () => FrameData;
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
  prompt?: string;
  example?: string;
}

/**
 * The bank holds one tile per word, in lower case, so "тук" is a single tile no
 * matter where in a sentence it lands. The sentence-initial capital is therefore
 * presentation, applied at render time — never stored, never compared.
 */
const cap = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);
const rawSentence = (item: FrameItem) => item.slots.map((s) => s.word).join(" ");
/** What is shown back to the learner. */
const sentence = (item: FrameItem) => cap(rawSentence(item));
/**
 * Comparison form. Case and sentence-final punctuation are presentation, and at
 * step 4 the learner types both by hand, so neither may decide right from wrong.
 */
const norm = (s: string) => s.trim().replace(/\s+/g, " ").replace(/[.!?…]+$/, "").toLowerCase();

const GREEN = "border-emerald-500 bg-emerald-50";
const RED = "border-[#E60023] bg-red-50";

/**
 * FR-FRAME, FR-FRAME-LADDER: sentence production with support that fades.
 *
 * The learner always sees an L1 translation and must produce the Bulgarian
 * sentence. What surrounds that task depends on the lesson's step: labelled
 * roles (1), bare slots (2), an empty line plus the mode's word bank (3), or
 * nothing but a text field (4). The bank belongs to the whole mode and is
 * several times larger than any single sentence, so choosing a word is recall,
 * not the ordering puzzle `build` already offers.
 */
export function FrameEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const { step, items, bank } = data();
  const [qs] = useState<FrameItem[]>(() => shuffle(items));
  // Shuffled once per session: a stable order would let the learner memorise
  // positions instead of words.
  const shuffledBank = useMemo(() => shuffle(bank), [bank]);

  // Steps 1–2 give the number of words away, so the sentence under construction
  // is a fixed-length array with holes. From step 3 it grows as the learner taps.
  const fixed = step <= 2;
  const typing = step === 4;

  const [filled, setFilled] = useState<(string | null)[]>([]);
  // Two taps inside one React batch would both read the same stale `filled` and
  // target the same slot. The ref is the authority for what is placed; state
  // only drives rendering.
  const filledRef = useRef<(string | null)[]>([]);
  const commit = (next: (string | null)[]) => {
    filledRef.current = next;
    setFilled(next);
  };
  const [typed, setTyped] = useState("");
  // Which question the state above belongs to. Drives the render-time reset.
  const [filledFor, setFilledFor] = useState(-1);
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
  } = useGame(qs as unknown as DataItem[], onComplete, reactions, 10, 1400, onItemAnswer);

  // FR-HINT-MODAL: a hint belongs in the header, never beside the sentence being
  // built. Most frame items carry none — publishing null then keeps the lamp off.
  const hintCh = useHintChannel();
  useEffect(() => {
    const q = qs[cur];
    hintCh.publish(q?.hint ? { hint: L(q.hint), rule: q.rule ? L(q.rule) : undefined } : null);
  }, [cur]);
  useEffect(() => () => hintCh.publish(null), []);

  const item = qs[cur];

  // Reset during render, not in an effect: an effect commits one frame first, and
  // that frame paints the previous sentence's words into the new sentence's slots.
  if (item && filledFor !== cur) {
    const blank = fixed ? item.slots.map(() => null) : [];
    filledRef.current = blank;
    setFilled(blank);
    setTyped("");
    setFilledFor(cur);
  }

  if (!item || filledFor !== cur) return null;
  if (fixed && filled.length !== item.slots.length) return null;

  const checked = sel !== null;
  const canonical = norm(rawSentence(item));
  const accepted = new Set([canonical, ...(item.alt ?? []).map(norm)]);

  /**
   * useGame decides by comparing the two strings it is handed. When the learner
   * produced an equally correct word order we hand it the canonical form on both
   * sides — the variant counts as correct without useGame knowing about variants.
   * `sel === canonical` is therefore "this attempt was right".
   */
  const submit = (raw: string) => {
    const v = norm(raw);
    answer(accepted.has(v) ? canonical : v, canonical, { hinted: hintCh.wasUsed() });
  };

  const lineOk = checked && sel === canonical;
  const nextEmpty = filled.findIndex((v) => v === null);
  // One tile per bank entry. The bank holds each word once (the lexicon checker
  // bans duplicates), so a sentence may not use the same word twice — it would
  // be unfillable, with no way to submit. The checker asserts that too.
  const usedCount = (word: string) => filled.filter((v) => v === word).length;
  const availableCount = (word: string) => shuffledBank.filter((w) => w === word).length;
  const exhausted = (w: string) => usedCount(w) >= availableCount(w);

  const place = (word: string) => {
    if (checked) return;
    const prev = filledRef.current;
    if (!fixed) {
      commit([...prev, word]);
      return;
    }
    const idx = prev.findIndex((v) => v === null);
    if (idx < 0) return;
    const next = [...prev];
    next[idx] = word;
    commit(next);
    // With the length given, the sentence is finished the moment it is full.
    if (next.every((v) => v !== null)) submit(next.join(" "));
  };

  const removeAt = (i: number) => {
    if (checked) return;
    const prev = filledRef.current;
    if (!fixed) {
      commit(prev.filter((_, j) => j !== i));
      return;
    }
    if (prev[i] === null) return;
    const next = [...prev];
    next[i] = null;
    commit(next);
  };

  const retry = () => {
    commit(fixed ? item.slots.map(() => null) : []);
    setTyped("");
    dismissError();
  };

  const tileCls = (i: number, val: string | null) => {
    if (checked) {
      // Without a fixed length there is no slot to compare against — the whole
      // line is right or wrong.
      if (!fixed) return lineOk ? GREEN : RED;
      return val === item.slots[i].word ? GREEN : RED;
    }
    if (val !== null) return "border-[#E9E9E9] bg-white";
    return i === nextEmpty ? "border-[#111111] bg-white" : "border-gray-300 bg-gray-50";
  };

  const canCheck = !checked && (typing ? typed.trim().length > 0 : filled.length > 0);

  // The sentence under construction. Pinned with the stimulus
  // (FR-QUESTION-PINNED); steps 1-3 only, since step 4 has no bank and its input
  // belongs above the keyboard rather than under a pinned header.
  const answerArea = (
    <>
      {step === 1 && (
        // Step 1: one labelled row per word. The label names the job the word
        // does, so the learner recalls the word, not the structure.
        <div className="w-full flex flex-col gap-2 mb-4">
          {item.slots.map((slot, i) => {
            const val = filled[i];
            return (
              <div
                key={i}
                className={`flex items-center gap-3 px-3 py-2 border-2 rounded-[16px] transition-all ${
                  tileCls(i, val)
                }`}
              >
                <span className="w-24 xs:w-28 shrink-0 text-xs font-bold uppercase tracking-wide text-gray-600 leading-tight">
                  {L(slot.role)}
                </span>
                <button
                  onClick={() => removeAt(i)}
                  disabled={checked || val === null}
                  className={`flex-1 min-w-0 text-left text-base font-bold min-h-[2.25rem] break-words ${
                    val === null
                      ? "text-gray-500 border-b-2 border-dashed border-gray-300"
                      : "text-[#111111]"
                  }`}
                >
                  {val === null ? " " : (i === 0 ? cap(val) : val)}
                </button>
                {checked && val !== slot.word && (
                  <span className="shrink-0 text-sm font-bold text-[#E60023]">
                    {i === 0 ? cap(slot.word) : slot.word}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}

      {(step === 2 || step === 3) && (
        // Steps 2–3: the sentence as a line of tiles. Step 2 still shows one
        // blank per word; step 3 starts empty, so length and order are decided
        // by the learner.
        <div className="w-full mb-4">
          <div className="flex flex-wrap gap-2 items-center justify-center min-h-[3.25rem] px-2 py-2 border-2 border-dashed border-gray-300 rounded-[16px]">
            {filled.length === 0 && (
              <span className="text-sm font-medium text-gray-500">{t("frameLineEmpty")}</span>
            )}
            {filled.map((val, i) => (
              <button
                key={i}
                onClick={() => removeAt(i)}
                disabled={checked || val === null}
                className={`px-3 py-2 border-2 rounded-[14px] font-bold text-base min-w-[3rem] transition-all ${
                  tileCls(i, val)
                }`}
              >
                {val === null ? " " : (i === 0 ? cap(val) : val)}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <TaskPrompt text={prompt} example={example} />
      <StickyQuestion>
        {
          /* FR-QUESTION-PINNED: the sentence to produce is what changes per
            question, so it is what has to survive the scroll down to the bank —
            which in this engine can be 940px tall. */
        }
        <p className="text-lg font-bold text-gray-900 text-center leading-snug">
          {L(item.translation)}
        </p>
        {!typing && <div className="w-full mt-3">{answerArea}</div>}
      </StickyQuestion>

      {typing && (
        // Step 4: nothing but the translation and a field.
        <div className="w-full mb-4">
          <input
            type="text"
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canCheck) submit(typed);
            }}
            disabled={checked}
            placeholder={t("typeHere")}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            className={`w-full px-4 py-3 border-2 rounded-[16px] text-base font-bold text-[#111111] outline-none transition-all ${
              checked ? (lineOk ? GREEN : RED) : "border-[#E9E9E9] focus:border-[#111111] bg-white"
            }`}
          />
        </div>
      )}

      {/* Steps 1–2 submit themselves when the last blank is filled. */}
      {!fixed && (
        <button
          onClick={() => submit(typing ? typed : filled.join(" "))}
          disabled={!canCheck}
          className="w-full py-3 mb-4 bg-[#111111] text-white rounded-[16px] font-bold text-base disabled:opacity-30 transition-all"
        >
          {t("check")}
        </button>
      )}

      <Reaction text={reaction} ok={reactionOk} />

      {!typing && (
        <div className="w-full mt-2">
          <p className="text-xs font-bold uppercase tracking-wide text-gray-600 mb-2">
            {t("frameBank")}
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {shuffledBank.map((w, i) => (
              <button
                key={w + i}
                onClick={() => place(w)}
                disabled={checked || exhausted(w) || (fixed && nextEmpty < 0)}
                className="px-3 py-2 bg-white border-2 border-[#E9E9E9] text-[#111111] rounded-[14px] font-bold text-base hover:border-[#111111] disabled:opacity-30 transition-all"
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {errorPending && (
        <ErrorDialog
          title={t("errorTitle")}
          correctLabel={t("correctAnswer")}
          correct={sentence(item)}
          hint={item.hint ? L(item.hint) : L(item.translation)}
          rule={item.rule ? L(item.rule) : undefined}
          continueLabel={t("continue")}
          onContinue={retry}
        />
      )}
    </div>
  );
}
