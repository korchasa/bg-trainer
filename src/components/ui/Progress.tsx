import { ACCENT } from "../../constants";

export function Progress({ cur, total, score, accent = false }: {
  cur: number;
  total: number;
  score: number;
  accent?: boolean;
}) {
  return (
    <>
      <div className="flex justify-between w-full text-xs font-bold text-gray-400 mb-3">
        <span>{cur + 1}/{total}</span>
        <span>{score} pts</span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-10">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${(cur / total) * 100}%`, backgroundColor: accent ? ACCENT : "#111111" }}
        />
      </div>
    </>
  );
}
