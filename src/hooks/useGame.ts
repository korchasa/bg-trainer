import { useState, useCallback, useRef } from "react";
import type { DataItem } from "../types";
import { pickOK, pickFail } from "../utils/shuffle";
import { itemKey } from "../utils/itemKey";

export interface AnswerOpts {
  extraPts?: number;
  hinted?: boolean;
}

type AnswerArg = AnswerOpts | number;

export interface Reactions {
  ok: string[];
  fail: string[];
}

// FR-GAME-SESSION, FR-MASTERY: session runs exactly `qsTotal` answers; wrong items are
// re-queued 3..5 positions later without mutating `qs`. Errors count unique wrong indices.
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
  const retryRef = useRef<{ idx: number; dueAt: number }[]>([]);
  const errSet = useRef<Set<number>>(new Set());
  const sRef = useRef(0);
  const answeredRef = useRef(0);
  const finishedRef = useRef(false);

  const [cur, setCur] = useState(() => planRef.current[0] ?? 0);
  const [answered, setAnswered] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [corr, setCorr] = useState<string | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());

  const pickNext = (answeredNow: number): number => {
    const rb = retryRef.current;
    const dueIdx = rb.findIndex(r => r.dueAt <= answeredNow);
    if (dueIdx >= 0) {
      const [item] = rb.splice(dueIdx, 1);
      return item.idx;
    }
    if (planPosRef.current < planRef.current.length) {
      return planRef.current[planPosRef.current++];
    }
    if (rb.length > 0) {
      rb.sort((a, b) => a.dueAt - b.dueAt);
      const [item] = rb.splice(0, 1);
      return item.idx;
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
    // Strict cap: session always ends at qsTotal answers. Retries replace future
    // plan slots; overflow retries are dropped rather than extending the session.
    if (a >= qsTotalRef.current) { finish(); return; }
    const next = pickNext(a);
    if (next < 0) { finish(); return; }
    setCur(next);
    setSel(null);
    setCorr(null);
    setReaction("");
  }, [finish]);

  const answer = useCallback(
    (val: string, correctVal: string, opts: AnswerArg = {}) => {
      if (sel !== null) return false;
      setSel(val);
      const o: AnswerOpts = typeof opts === "number" ? { extraPts: opts } : opts;
      const extraPts = o.extraPts ?? 0;
      const hinted = o.hinted ?? false;
      const ok = val === correctVal;
      if (ok) {
        const ns = sRef.current + pts + extraPts;
        setScore(ns);
        sRef.current = ns;
        setReaction(pickOK(reactionsRef.current.ok));
      } else {
        setCorr(correctVal);
        errSet.current.add(cur);
        setReaction(pickFail(reactionsRef.current.fail));
        retryRef.current.push({
          idx: cur,
          dueAt: answeredRef.current + 1 + 3 + Math.floor(Math.random() * 3),
        });
      }
      answeredRef.current += 1;
      setAnswered(answeredRef.current);
      if (onItemAnswer) {
        try {
          onItemAnswer(itemKey(qs[cur]), ok, extraPts > 0, hinted);
        } catch {
          // Unknown item shape — skip mastery update, keep gameplay running.
        }
      }
      setTimeout(advance, delay);
      return ok;
    },
    [sel, pts, delay, advance, onItemAnswer, qs, cur],
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
  };
}
