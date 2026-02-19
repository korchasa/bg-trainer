import { useState, useEffect, useRef } from "react";
import type { BuildItem } from "../../types";
import { shuffle, pickOK, pickFail } from "../../utils/shuffle";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";

interface Props {
  data: () => BuildItem[];
  onComplete: (score: number, time: number, errors: number) => void;
}

export function BuildEngine({ data, onComplete }: Props) {
  const items = data();
  const [qs] = useState<BuildItem[]>(() => shuffle(items).slice(0, 12));
  const [cur, setCur] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [pool, setPool] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [reaction, setReaction] = useState("");
  const [score, setScore] = useState(0);
  const [t0] = useState(Date.now());
  const sRef = useRef(0);
  const eRef = useRef(0);

  useEffect(() => {
    setPool(shuffle(qs[cur].words.filter(w => w !== "?")));
    setPlaced([]);
    setDone(false);
    setReaction("");
  }, [cur]);

  const target = qs[cur].words.filter(w => w !== "?");

  const addWord = (word: string, index: number) => {
    if (done) return;
    const np = [...placed, word];
    setPlaced(np);
    setPool(pool.filter((_, j) => j !== index));
    if (np.length === target.length) {
      const ok = np.every((w, j) => w === target[j]);
      setDone(true);
      if (ok) {
        const ns = score + 15;
        setScore(ns);
        sRef.current = ns;
        setReaction(pickOK());
      } else {
        eRef.current++;
        setReaction(pickFail());
      }
      setTimeout(() => {
        if (cur + 1 < qs.length) setCur(c => c + 1);
        else onComplete(sRef.current, Date.now() - t0, eRef.current);
      }, 1200);
    }
  };

  const removeWord = (word: string, index: number) => {
    if (done) return;
    setPool([...pool, word]);
    setPlaced(placed.filter((_, j) => j !== index));
  };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{qs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(cur / qs.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full mb-4">
        <p className="text-sm font-semibold text-gray-400 mb-4">{qs[cur].translation}</p>
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-200 w-full justify-center items-center mb-3">
          {placed.length === 0 && <span className="text-gray-400 text-sm font-medium">Нажми на слова ниже...</span>}
          {placed.map((word, i) =>
            <button key={word + i} onClick={() => removeWord(word, i)}
              className={`px-3 py-2 rounded-[14px] font-bold text-base transition-all cursor-pointer shadow-sm ${done ? (i < target.length && word === target[i] ? "bg-emerald-500 text-white" : "bg-[#E60023] text-white") : "bg-[#111111] text-white hover:bg-gray-800"}`}>
              {word}
            </button>
          )}
          {placed.length > 0 && <span className="text-gray-400 font-bold text-xl">?</span>}
        </div>
        <Correction show={done && placed.join(" ") + " ?" !== qs[cur].words.join(" ")} text={qs[cur].words.join(" ")} />
      </div>
      <Reaction text={reaction} />
      <div className="flex flex-wrap gap-2 justify-center w-full min-h-[56px] items-start">
        {pool.map((word, i) =>
          <button key={word + i} onClick={() => addWord(word, i)}
            className="px-4 py-3 bg-white border-2 border-[#E9E9E9] text-[#111111] rounded-[14px] font-bold text-base hover:border-[#111111] cursor-pointer transition-all">
            {word}
          </button>
        )}
      </div>
    </div>
  );
}
