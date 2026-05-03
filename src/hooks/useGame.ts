import { useState, useCallback, useRef } from "react";
import type { DataItem } from "../types";
import { pickOK, pickFail } from "../utils/shuffle";
import { itemKey } from "../utils/itemKey";
import { hapticCorrect, hapticWrong } from "../utils/nativeUx";
import { prefersReducedMotion } from "../utils/motion";

export interface AnswerOpts {
  extraPts?: number;
  hinted?: boolean;
}

type AnswerArg = AnswerOpts | number;

export interface Reactions {
  ok: string[];
  fail: string[];
}

// FR-GAME-SESSION, FR-MASTERY: session runs exactly `qsTotal` correctly-answered slots.
// FR-RETRY: on a wrong answer the question stays — user must retry until correct.
// Only the first attempt per question is scored / recorded as an error / sent to mastery;
// subsequent retries are silent (no score, no mastery, no error increment).
export function useGame(
  qs: DataItem[],
  onComplete: (score: number, time: number, errors: number) => void,
  reactions: Reactions,
  pts = 10,
  delay = 1000,
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void,
) {
  const reactionsRef = useRef(reactions);
  reactionsRef.current = reactions;
  const qsTotalRef = useRef(qs.length);
  const planRef = useRef<number[]>(qs.map((_, i) => i));
  const planPosRef = useRef(1);
  const errSet = useRef<Set<number>>(new Set());
  const sRef = useRef(0);
  const answeredRef = useRef(0);
  const finishedRef = useRef(false);
  const firstWrongRef = useRef(false);
  const lockedRef = useRef(false);

  const [cur, setCur] = useState(() => planRef.current[0] ?? 0);
  const [answered, setAnswered] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [corr, setCorr] = useState<string | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [errorPending, setErrorPending] = useState(false);
  const [t0] = useState(Date.now());

  const pickNext = (): number => {
    if (planPosRef.current < planRef.current.length) {
      return planRef.current[planPosRef.current++];
    }
    return -1;
  };

  const finish = useCallback(() => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    onComplete(sRef.current, Date.now() - t0, errSet.current.size);
  }, [onComplete, t0]);

  const advance = useCallback(() => {
    if (finishedRef.current) return;
    const a = answeredRef.current;
    if (a >= qsTotalRef.current) { finish(); return; }
    const next = pickNext();
    if (next < 0) { finish(); return; }
    setCur(next);
    setSel(null);
    setCorr(null);
    setReaction("");
    setErrorPending(false);
    firstWrongRef.current = false;
    lockedRef.current = false;
  }, [finish]);

  const dismissError = useCallback(() => {
    // Reset visual state so the user can attempt the same question again.
    // firstWrongRef stays set — subsequent attempts won't be scored.
    setSel(null);
    setCorr(null);
    setReaction("");
    setErrorPending(false);
  }, []);

  const answer = useCallback(
    (val: string, correctVal: string, opts: AnswerArg = {}) => {
      if (lockedRef.current) return false;
      if (errorPending) return false;
      if (sel !== null) return false;

      setSel(val);
      const o: AnswerOpts = typeof opts === "number" ? { extraPts: opts } : opts;
      const extraPts = o.extraPts ?? 0;
      const hinted = o.hinted ?? false;
      const ok = val === correctVal;

      if (ok) {
        if (!firstWrongRef.current) {
          // First-attempt correct → award score and mastery.
          const ns = sRef.current + pts + extraPts;
          setScore(ns);
          sRef.current = ns;
          if (onItemAnswer) {
            try { onItemAnswer(itemKey(qs[cur]), true, extraPts > 0, hinted); }
            catch { /* unknown item shape — skip mastery */ }
          }
        }
        // Retry-success path silently advances: no score, no mastery event.
        setReaction(pickOK(reactionsRef.current.ok));
        answeredRef.current += 1;
        setAnswered(answeredRef.current);
        lockedRef.current = true;
        hapticCorrect();
        // FR-IOS-UX: skip the celebratory pause when Reduce Motion is on.
        const effectiveDelay = prefersReducedMotion() ? 0 : delay;
        setTimeout(advance, effectiveDelay);
      } else {
        setCorr(correctVal);
        setReaction(pickFail(reactionsRef.current.fail));
        if (!firstWrongRef.current) {
          // First-attempt wrong → record error and fire mastery once.
          errSet.current.add(cur);
          if (onItemAnswer) {
            try { onItemAnswer(itemKey(qs[cur]), false, false, hinted); }
            catch { /* unknown item shape — skip mastery */ }
          }
          firstWrongRef.current = true;
        }
        hapticWrong();
        setErrorPending(true);
      }
      return ok;
    },
    [sel, pts, delay, advance, onItemAnswer, qs, cur, errorPending],
  );

  return {
    cur,
    sel,
    corr,
    reaction,
    score,
    answered,
    qsTotal: qsTotalRef.current,
    advance,
    answer,
    errorPending,
    dismissError,
  };
}
