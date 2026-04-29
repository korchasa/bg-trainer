import { ACCENT } from "../../constants";

interface Props {
  title: string;
  correctLabel: string;
  correct: string;
  hint?: string;
  rule?: string;
  continueLabel: string;
  onContinue: () => void;
}

// FR-RETRY: error explanation modal shown after the first wrong attempt on a question.
// Blocks further answers until dismissed; subsequent retries are not scored.
export function ErrorDialog({ title, correctLabel, correct, hint, rule, continueLabel, onContinue }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/40">
      <div className="w-full bg-white rounded-t-[28px] shadow-2xl p-6 pb-8 animate-[slideUp_.18s_ease-out]">
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          ✕ {title}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{correctLabel}</div>
        <div className="text-3xl font-black text-gray-900 mb-2 break-words">{correct}</div>
        {hint && <div className="text-base font-medium text-gray-500 mb-1">{hint}</div>}
        {rule && <div className="text-sm text-gray-500 mt-2">{rule}</div>}
        <button
          onClick={onContinue}
          className="w-full mt-6 py-3 rounded-full text-white font-bold active:opacity-90"
          style={{ backgroundColor: ACCENT }}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
