import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";
import type { GameResult } from "../../types";

interface Props extends GameResult {
  onRestart: () => void;
  onMenu: () => void;
}

/**
 * FR-RESULTS: the share of answers the learner got right on the first attempt.
 *
 * Both figures below are built from it rather than from the score, because the
 * score is in points and points per answer differ by mode — at 15 a piece a
 * 35-question `q_build` session cleared the old 80-point trophy with six answers
 * right out of thirty-five, while an 8-question `l2_frame` session at 10 a piece
 * needed all eight.
 */
const shareCorrect = (errors: number, qsTotal: number) =>
  qsTotal > 0 ? Math.max(0, 1 - errors / qsTotal) : null;

export function ResultsScreen({ score, time, errors, qsTotal, onRestart, onMenu }: Props) {
  const { t } = useI18n();
  const seconds = Math.floor(time / 1000);
  const share = shareCorrect(errors, qsTotal);
  const emoji = share === null ? "👍" : share >= 0.8 ? "🏆" : share >= 0.5 ? "👍" : "💪";
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 text-center">
      <div className="text-7xl">{emoji}</div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t("done")}</h1>
      <div className="text-6xl font-black" style={{ color: ACCENT }}>{score}</div>
      <div className="flex gap-6 text-gray-700 text-base font-semibold">
        <span>⏱ {seconds}с</span>
        <span>❌ {errors}/{qsTotal}</span>
        {share !== null && <span>🎯 {Math.round(share * 100)}%</span>}
      </div>
      <div className="flex gap-3 mt-2 w-full max-w-xs">
        <button
          onClick={onRestart}
          className="flex-1 py-4 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98]"
          style={{ backgroundColor: ACCENT }}
        >
          {t("again")}
        </button>
        <button
          onClick={onMenu}
          className="flex-1 py-4 rounded-full font-bold text-gray-900 bg-[#F2F2F2] text-base transition-all active:scale-[0.98] active:bg-[#E0E0E0]"
        >
          {t("menu")}
        </button>
      </div>
    </div>
  );
}
