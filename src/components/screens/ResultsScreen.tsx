import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";
import type { GameResult } from "../../types";

interface Props extends GameResult {
  onRestart: () => void;
  onMenu: () => void;
}

export function ResultsScreen({ score, time, errors, onRestart, onMenu }: Props) {
  const { t } = useI18n();
  const seconds = Math.floor(time / 1000);
  const accuracy = Math.max(0, Math.round((1 - errors / (errors + 8)) * 100));
  const emoji = score >= 80 ? "🏆" : score >= 40 ? "👍" : "💪";
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 gap-6 text-center">
      <div className="text-7xl">{emoji}</div>
      <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t("done")}</h1>
      <div className="text-6xl font-black" style={{ color: ACCENT }}>{score}</div>
      <div className="flex gap-6 text-gray-500 text-sm font-semibold">
        <span>⏱ {seconds}с</span>
        <span>❌ {errors}</span>
        <span>🎯 {accuracy}%</span>
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
