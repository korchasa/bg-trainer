import { useState } from "react";
import { ACCENT } from "../../constants";
import { useI18n } from "../../i18n/context";
import { useIap } from "../../services/iap";

const EULA_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
// FR-IOS-APPSTORE: privacy policy is hosted on the public site of this app.
const PRIVACY_URL = "https://bgtrainer.korchasa.dev/privacy.html";

interface Props {
  onClose: () => void;
}

type Status =
  | { kind: "idle" }
  | { kind: "buying" }
  | { kind: "restoring" }
  | { kind: "success" }
  | { kind: "error"; message: string };

export function PaywallScreen({ onClose }: Props) {
  const { t } = useI18n();
  const { proUnlocked, priceString, configError, purchase, restore } = useIap();
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const handleBuy = async () => {
    if (status.kind === "buying" || status.kind === "restoring") return;
    setStatus({ kind: "buying" });
    const r = await purchase();
    if (r.ok) {
      setStatus({ kind: "success" });
      setTimeout(onClose, 1200);
    } else if (r.error === "user-cancelled") {
      setStatus({ kind: "idle" });
    } else {
      setStatus({ kind: "error", message: t("paywallErrorGeneric") });
    }
  };

  const handleRestore = async () => {
    if (status.kind === "buying" || status.kind === "restoring") return;
    setStatus({ kind: "restoring" });
    const r = await restore();
    if (r.ok) {
      setStatus({ kind: "success" });
      setTimeout(onClose, 1200);
    } else {
      setStatus({ kind: "error", message: t("paywallErrorRestoreNothing") });
    }
  };

  const buying = status.kind === "buying";
  const restoring = status.kind === "restoring";
  const busy = buying || restoring;

  // Buy button is disabled when there's no price (offerings still loading or RC misconfigured)
  // OR when proUnlocked is already true (user opened paywall but doesn't need it).
  const buyLabel = buying
    ? t("paywallBuying")
    : priceString
      ? `${t("paywallBuy")} · ${priceString}`
      : t("paywallBuy");
  const buyDisabled = busy || !priceString || proUnlocked || !!configError;

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto">
      <button
        onClick={onClose}
        className="self-end text-gray-500 text-2xl leading-none p-2 -mr-2 -mt-2"
        aria-label={t("menu")}
      >
        ×
      </button>

      <div className="flex flex-col items-center text-center mt-2 mb-6">
        <div className="text-6xl mb-3">🔓</div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t("paywallTitle")}</h1>
        <p className="text-sm font-semibold text-gray-500 mt-2 max-w-xs">{t("paywallSubtitle")}</p>
      </div>

      <ul className="flex flex-col gap-3 mb-8">
        {[t("paywallBenefit1"), t("paywallBenefit2"), t("paywallBenefit3")].map((b, i) => (
          <li key={i} className="flex items-start gap-3 bg-[#F2F2F2] rounded-2xl p-3">
            <span className="font-black text-lg shrink-0" style={{ color: ACCENT }}>✓</span>
            <span className="text-sm font-semibold text-gray-900">{b}</span>
          </li>
        ))}
      </ul>

      {status.kind === "error" && (
        <div className="mb-3 px-4 py-3 rounded-2xl bg-red-50 text-red-700 text-sm font-semibold text-center">
          {status.message}
        </div>
      )}
      {status.kind === "success" && (
        <div className="mb-3 px-4 py-3 rounded-2xl bg-green-50 text-green-700 text-sm font-semibold text-center">
          {t("paywallSuccess")}
        </div>
      )}

      <button
        onClick={handleBuy}
        disabled={buyDisabled}
        className="w-full py-4 rounded-full font-bold text-white text-base shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
        style={{ backgroundColor: ACCENT }}
      >
        {buyLabel}
      </button>

      <button
        onClick={handleRestore}
        disabled={busy}
        className="w-full py-3 mt-3 rounded-full font-bold text-gray-900 bg-[#F2F2F2] text-sm transition-all active:scale-[0.98] active:bg-[#E0E0E0] disabled:opacity-50"
      >
        {restoring ? t("paywallRestoring") : t("paywallRestore")}
      </button>

      <div className="flex justify-center gap-4 mt-6 mb-2 text-xs font-semibold text-gray-400">
        <a href={EULA_URL} target="_blank" rel="noopener noreferrer" className="underline">
          {t("paywallEula")}
        </a>
        <a href={PRIVACY_URL} target="_blank" rel="noopener noreferrer" className="underline">
          {t("paywallPrivacy")}
        </a>
      </div>
    </div>
  );
}
