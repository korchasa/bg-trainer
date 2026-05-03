import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";

export function Progress({ cur, total, score, accent = false }: {
  cur: number;
  total: number;
  score: number;
  accent?: boolean;
}) {
  const { f } = useI18n();
  return (
    <>
      <div
        className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={cur + 1}
        aria-label={f("a11yProgress", cur + 1, total, score)}
      >
        <span>{cur + 1}/{total}</span>
        <span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-10" aria-hidden="true">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(cur / total) * 100}%`, backgroundColor: accent ? ACCENT : "#111111" }}
        />
      </div>
    </>
  );
}
