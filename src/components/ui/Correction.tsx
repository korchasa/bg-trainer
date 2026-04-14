// FR-FEEDBACK-RULE: show the correct form and, if available, a short rule.
export function Correction({ show, text, rule }: { show: boolean; text: string; rule?: string }) {
  if (!show) return <div className="h-6" />;
  return (
    <div className="flex flex-col items-center gap-1 min-h-6">
      <span className="text-emerald-600 text-sm font-semibold">✓ {text}</span>
      {rule && <span className="text-xs text-gray-500 text-center max-w-xs">{rule}</span>}
    </div>
  );
}
