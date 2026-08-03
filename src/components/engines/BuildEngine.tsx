import { useState, useEffect, useRef, useMemo } from "react";
import type { BuildItem } from "../../types";
import { shuffle, pickOK, pickFail } from "../../utils/shuffle";
import { buildTemplate, joinTokens } from "../../utils/punct";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { itemKey } from "../../utils/itemKey";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";
import { TaskPrompt } from "../ui/TaskPrompt";

interface Props {
  data: () => BuildItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean) => void;
  prompt?: string;
  example?: string;
}

export function BuildEngine({ data, onComplete, onItemAnswer, prompt, example }: Props) {
  const { t, L } = useI18n();
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

  const item = qs[cur];
  // FR-BUILD: the sentence renders as a template — punctuation sits in fixed
  // positions and only `target` reaches the pool, so the learner never places a mark.
  const { target, slotOf } = useMemo(() => buildTemplate(item.words), [item]);

  // A mark and the word it follows render as one unwrappable unit, so a line break
  // can never orphan a "." at the start of the next row.
  const groups = useMemo(() => {
    const acc: { slot: number; marks: string[] }[] = [];
    item.words.forEach((token, i) => {
      if (slotOf[i] !== -1) acc.push({ slot: slotOf[i], marks: [] });
      else if (acc.length) acc[acc.length - 1].marks.push(token);
      else acc.push({ slot: -1, marks: [token] });
    });
    return acc;
  }, [item, slotOf]);

  useEffect(() => {
    setPool(shuffle(target));
    setPlaced([]);
    setDone(false);
    setReaction("");
  }, [cur]);

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
        setReaction(pickOK(L(OK)));
      } else {
        eRef.current++;
        setReaction(pickFail(L(FAIL)));
      }
      onItemAnswer?.(itemKey(item), ok, false);
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
    <div className="flex-1 flex flex-col p-4 xs:p-6 items-center overflow-y-auto no-scrollbar">
      <div className="flex justify-between w-full text-xs font-bold text-gray-500 mb-3">
        <span>{cur + 1}/{qs.length}</span><span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-8">
        <div className="h-full rounded-full transition-all duration-300 bg-[#111111]" style={{ width: `${(cur / qs.length) * 100}%` }} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center w-full mb-4">
        <TaskPrompt text={prompt} example={example} />
        <p className="text-base font-semibold text-gray-600 mb-4 text-center leading-snug">{L(item.translation)}</p>
        {placed.length === 0 && <p className="text-gray-500 text-sm font-medium mb-2">{t("tapWordsBelow")}</p>}
        <div className="flex flex-wrap gap-2 min-h-[60px] p-4 bg-gray-50 rounded-[20px] border-2 border-dashed border-gray-200 w-full justify-center items-center mb-3">
          {groups.map(({ slot, marks }, g) => {
            const word = slot === -1 ? undefined : placed[slot];
            return (
              <div key={g} className="flex items-end">
                {slot !== -1 && (word === undefined
                  ? <span aria-hidden className="w-12 h-10 rounded-[14px] border-2 border-dashed border-gray-300" />
                  : <button onClick={() => removeWord(word, slot)}
                      className={`px-3 py-2 rounded-[14px] font-bold text-base transition-all cursor-pointer shadow-sm ${done ? (word === target[slot] ? "bg-emerald-500 text-white" : "bg-[#E60023] text-white") : "bg-[#111111] text-white hover:bg-gray-800"}`}>
                      {word}
                    </button>)}
                {/* Punctuation: template furniture. gray-600 is 7.56:1 (FR-A11Y-CONTRAST).
                    Sits on the tiles' baseline — vertically centred, a "." would read as
                    a separator dot rather than a full stop. */}
                {marks.map((mark, j) =>
                  <span key={j} className="pb-1 pl-0.5 text-gray-600 font-bold text-xl leading-none select-none">{mark}</span>
                )}
              </div>
            );
          })}
        </div>
        <Correction show={done && placed.join(" ") !== target.join(" ")} text={joinTokens(item.words)} />
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
