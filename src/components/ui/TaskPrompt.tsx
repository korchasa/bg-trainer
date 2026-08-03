import { useI18n } from "../../i18n/context";

interface Props {
  text?: string;
  example?: string;
}

// FR-A11Y-TEXT: this is the screen's main instruction — it used to be the
// smallest text on it (12px gray-500). Now 17px at 10.31:1 contrast.
// FR-TASK-MODEL: the worked example sits right under the instruction and
// repeats on every question, the way the textbook prints «Примерен образец»
// above the whole exercise.
export function TaskPrompt({ text, example }: Props) {
  const { t } = useI18n();
  if (!text && !example) return null;
  return (
    <div className="mb-4 px-2">
      {text && (
        <div className="text-base font-semibold text-gray-700 text-center leading-snug">
          {text}
        </div>
      )}
      {example && (
        <div className="mt-1.5 text-sm text-gray-600 text-center leading-snug">
          <span className="font-bold uppercase tracking-wide text-xs">{t("modelLabel")}: </span>
          <span className="font-semibold">{example}</span>
        </div>
      )}
    </div>
  );
}
