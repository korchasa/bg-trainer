export function Correction({ show, text }: { show: boolean; text: string }) {
  return (
    <div className="h-6 flex items-center justify-center">
      {show ? <span className="text-emerald-600 text-sm font-semibold">✓ {text}</span> : null}
    </div>
  );
}
