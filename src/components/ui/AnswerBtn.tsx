import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";

export function AnswerBtn({ val, sel, correctVal, onClick, className = "", children }: {
  val: string;
  sel: string | null;
  correctVal: string;
  onClick: () => void;
  className?: string;
  children?: React.ReactNode;
}) {
  const { t } = useI18n();
  let cls = "bg-white border-2 border-[#E9E9E9] text-[#111111] hover:border-[#111111] cursor-pointer active:bg-[#111111] active:text-white active:border-[#111111]";
  if (sel !== null) {
    if (val === correctVal) {
      cls = "bg-emerald-500 text-white border-emerald-500 cursor-default";
    } else if (val === sel) {
      cls = `bg-[${ACCENT}] text-white border-[${ACCENT}] cursor-default`;
    } else {
      cls = "bg-white text-gray-300 border-[#E9E9E9] cursor-default";
    }
  }
  const isAnswered = sel !== null;
  const ariaLabel = isAnswered
    ? `${val} — ${val === correctVal ? t("a11yAnswerCorrect") : val === sel ? t("a11yAnswerWrong") : ""}`.trim().replace(/—\s*$/, "")
    : val;
  return (
    <button
      onClick={isAnswered ? undefined : onClick}
      aria-label={ariaLabel}
      aria-disabled={isAnswered}
      className={`rounded-[20px] font-semibold transition-all ${cls} ${className}`}
    >
      {children ?? val}
    </button>
  );
}
