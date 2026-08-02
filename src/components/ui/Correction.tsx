// FR-FEEDBACK-RULE: show the correct form and, if available, a short rule.
// FR-A11Y-TEXT: the rule is the teaching payload of a wrong answer, so it is
// 15px at 10.31:1 rather than the former 12px at 4.83:1.
//
// `text` is passed through verbatim: callers compose it (some join the answer
// with a hint) and only they know whether a trailing period ends a sentence or
// an abbreviation like "ж.р.". Stripping here would eat the latter.
export function Correction({ show, text, rule }: { show: boolean; text: string; rule?: string }) {
  if (!show) return <div className="h-6" />;
  return (
    <div className="flex flex-col items-center gap-1 min-h-6">
      <span className="text-emerald-700 text-base font-semibold text-center break-words">✓ {text}</span>
      {rule && <span className="text-sm text-gray-700 text-center max-w-xs leading-snug">{rule}</span>}
    </div>
  );
}
