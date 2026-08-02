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
// FR-A11Y-TEXT: the rule text is why this dialog exists — 17px at 10.31:1.
//
// `correct` is rendered verbatim. Choice engines strip the sentence-final period
// before passing it; TypeEngine must not, because there the string is the exact
// target the learner has to type.
export function ErrorDialog({ title, correctLabel, correct, hint, rule, continueLabel, onContinue }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm p-4 pb-6">
      <div
        className="w-full max-w-sm bg-white rounded-[28px] p-6"
        style={{ boxShadow: `0 0 0 2px ${ACCENT}, 0 24px 60px -12px rgba(0,0,0,0.5)` }}
      >
        <div className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>
          ✕ {title}
        </div>
        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">{correctLabel}</div>
        <div className="text-3xl font-black text-gray-900 mb-2 break-words">{correct}</div>
        {hint && <div className="text-base font-medium text-gray-600 mb-1">{hint}</div>}
        {rule && <div className="text-base text-gray-700 mt-2 leading-snug">{rule}</div>}
        <button
          onClick={onContinue}
          className="w-full mt-6 py-4 rounded-full text-white font-bold text-base active:opacity-90"
          style={{ backgroundColor: ACCENT }}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  );
}
