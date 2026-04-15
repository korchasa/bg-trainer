import { useState, useEffect, useRef } from "react";
import type { DataItem } from "../../types";
import { shuffle } from "../../utils/shuffle";
import { useGame } from "../../hooks/useGame";
import { OK, FAIL } from "../../constants";
import { useI18n } from "../../i18n/context";
import { Progress } from "../ui/Progress";
import { Reaction } from "../ui/Reaction";
import { Correction } from "../ui/Correction";

// FR-TYPE: keyboard-input engine.
// Whitelist normalization ONLY: trim, lowercase, collapse internal whitespace.
// No character substitutions (preserves `ѝ` vs `и`, stress marks, etc.).
function normalize(s: string): string {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

interface Props {
  data: () => DataItem[];
  onComplete: (score: number, time: number, errors: number) => void;
  onItemAnswer?: (itemId: string, ok: boolean, fast: boolean, hinted?: boolean) => void;
}

export function TypeEngine({ data, onComplete, onItemAnswer }: Props) {
  const { t, L } = useI18n();
  const reactions = { ok: L(OK), fail: L(FAIL) };
  const [qs] = useState<DataItem[]>(() => shuffle(data()));
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const hintedRef = useRef(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { cur, sel, reaction, score, answered, qsTotal, answer } =
    useGame(qs, onComplete, reactions, 10, 1400, onItemAnswer);

  useEffect(() => {
    setInput("");
    setShowHint(false);
    hintedRef.current = false;
    inputRef.current?.focus();
  }, [cur]);

  const item = qs[cur];
  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const normalized = normalize(input);
    if (normalized.length === 0) return;
    answer(normalized, normalize(item.answer), { hinted: hintedRef.current });
  };
  const revealHint = () => { setShowHint(true); hintedRef.current = true; };

  return (
    <div className="flex-1 flex flex-col p-6 items-center overflow-y-auto no-scrollbar">
      <Progress cur={answered} total={qsTotal} score={score} />
      <div className="flex-1 flex flex-col items-center justify-center mb-6 w-full">
        <h1 className="text-6xl font-black text-gray-900 mb-2 tracking-tighter">{item.q}</h1>
        {item.label && <div className="text-sm font-semibold text-gray-400 mb-1">{L(item.label)}</div>}
        {showHint || sel !== null
          ? <p className="text-base font-medium text-gray-400 mb-4">({L(item.hint)})</p>
          : (
            <button onClick={revealHint} className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-gray-900 transition-colors mb-4">
              {t("hintBtn")}
            </button>
          )}
        <form onSubmit={submit} className="w-full max-w-xs">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={sel !== null}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            className="w-full px-4 py-3 text-2xl font-black text-center bg-gray-50 border-2 border-gray-200 rounded-[20px] focus:outline-none focus:border-gray-900 disabled:opacity-60"
            placeholder={t("typeHere")}
          />
        </form>
        <Correction show={sel !== null && sel !== normalize(item.answer)} text={item.answer} rule={item.rule ? L(item.rule) : undefined} />
      </div>
      <Reaction text={reaction} />
      <div className="w-full mb-4">
        <button
          onClick={() => submit()}
          disabled={sel !== null || normalize(input).length === 0}
          className="w-full h-14 rounded-[20px] bg-[#111111] text-white font-bold text-lg disabled:opacity-40"
        >
          {t("check")}
        </button>
      </div>
    </div>
  );
}
