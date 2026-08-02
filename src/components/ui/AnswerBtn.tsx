import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";
import { stripFinalPeriod } from "../../utils/displayText";

export function AnswerBtn({ val, sel, correctVal, onClick, className = "", children }: {
  val: string;
  sel: string | null;
  correctVal: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const { t } = useI18n();
  // FR-A11Y-CONTRAST: dimmed options keep 4.83:1 (gray-500) instead of 1.47:1
  // (gray-300) — after answering they still have to be readable.
  let cls = "bg-white border-2 border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer active:bg-[#111111] active:text-white active:border-[#111111]";
  if (sel !== null) {
    if (val === correctVal) {
      cls = "bg-emerald-500 text-white border-emerald-500 cursor-default";
    } else if (val === sel) {
      cls = `bg-[${ACCENT}] text-white border-[${ACCENT}] cursor-default`;
    } else {
      cls = "bg-gray-50 text-gray-500 border-[#E9E9E9] cursor-default";
    }
  }
  const isAnswered = sel !== null;
  const label = stripFinalPeriod(val);
  const ariaLabel = isAnswered
    ? `${label} — ${val === correctVal ? t("a11yAnswerCorrect") : val === sel ? t("a11yAnswerWrong") : ""}`.trim().replace(/—\s*$/, "")
    : label;
  return (
    <button
      onClick={isAnswered ? undefined : onClick}
      aria-label={ariaLabel}
      aria-disabled={isAnswered}
      // FR-A11Y-TEXT: horizontal padding and wrapping live here, not at the call
      // sites — four of five engines used to pass height only, so long Bulgarian
      // words ran into both borders.
      className={`px-4 py-3 min-h-[3.5rem] flex items-center justify-center text-center rounded-[20px] font-semibold leading-tight break-words transition-all ${cls} ${className}`}
    >
      {children ?? label}
    </button>
  );
}
