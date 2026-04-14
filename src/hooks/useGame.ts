import { useState, useCallback, useRef } from "react";
import type { DataItem } from "../types";
import { pickOK, pickFail } from "../utils/shuffle";
import { itemKey } from "../utils/itemKey";

export function useGame(
  qs: DataItem[],
  onComplete: (score: number, time: number, errors: number) => void,
  pts = 10,
  delay = 1000,
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void,
) {
  const [cur, setCur] = useState(0);
  const [sel, setSel] = useState<string | null>(null);
  const [corr, setCorr] = useState<string | null>(null);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0);
  const eRef = useRef(0);

  const advance = useCallback(() => {
    if (cur + 1 < qs.length) {
      setCur(c => c + 1);
      setSel(null);
      setCorr(null);
      setReaction("");
    } else {
      onComplete(sRef.current, Date.now() - t0, eRef.current);
    }
  }, [cur, qs.length, onComplete, t0]);

  const answer = useCallback((val: string, correctVal: string, extraPts = 0) => {
    if (sel !== null) return false;
    setSel(val);
    const ok = val === correctVal;
    if (ok) {
      const ns = score + pts + extraPts;
      setScore(ns);
      sRef.current = ns;
      setReaction(pickOK());
    } else {
      setCorr(correctVal);
      eRef.current++;
      setReaction(pickFail());
    }
    if (onItemAnswer) {
      try {
        onItemAnswer(itemKey(qs[cur]), ok, extraPts > 0);
      } catch {
        // Unknown item shape — skip mastery update, keep gameplay running
      }
    }
    setTimeout(advance, delay);
    return ok;
  }, [sel, score, pts, delay, advance, onItemAnswer, qs, cur]);

  return { cur, sel, corr, reaction, score, advance, answer };
}
