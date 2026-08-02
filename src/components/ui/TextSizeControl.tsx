import { useState } from "react";
import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";
import { TEXT_SCALES, type TextScale } from "../../utils/textScale";
import type { StringKey } from "../../i18n/strings";

const OPTION_LABEL: Record<TextScale, StringKey> = {
  system: "textSizeSystem",
  normal: "textSizeNormal",
  large: "textSizeLarge",
  xlarge: "textSizeXLarge",
};

// Preview sizes are deliberately fixed px, not rem: the sample glyph has to show
// the relative step even while the UI around it is already scaled.
const OPTION_PREVIEW_PX: Record<TextScale, number> = {
  system: 15,
  normal: 15,
  large: 17,
  xlarge: 20,
};

interface Props {
  value: TextScale;
  onChange: (s: TextScale) => void;
}

// FR-A11Y-TEXT: text size control. Collapsed to a single "Aa" button so it costs
// no room next to the language switch; expands to the full choice on tap.
export function TextSizeControl({ value, onChange }: Props) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={t("textSizeAria")}
        aria-expanded={open}
        className={`px-3 py-1 min-h-[2rem] rounded-full text-base font-bold transition-all ${open ? "text-white" : "bg-[#F2F2F2] text-gray-700"}`}
        style={open ? { backgroundColor: ACCENT } : undefined}
      >
        Aa
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 z-50 w-56 bg-white rounded-3xl border border-gray-200 shadow-xl p-2">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-wider px-3 py-2">{t("textSizeLabel")}</div>
          {TEXT_SCALES.map(s => {
            const active = s === value;
            return (
              <button
                key={s}
                onClick={() => { onChange(s); setOpen(false); }}
                className={`w-full flex items-center justify-between gap-2 px-3 py-3 min-h-[2.75rem] rounded-2xl text-left transition-all ${active ? "text-white" : "text-gray-800 active:bg-gray-100"}`}
                style={active ? { backgroundColor: ACCENT } : undefined}
              >
                <span className="text-base font-semibold">{t(OPTION_LABEL[s])}</span>
                <span className="font-black shrink-0" style={{ fontSize: OPTION_PREVIEW_PX[s] }}>Aa</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
