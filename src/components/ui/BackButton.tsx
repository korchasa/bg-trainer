import { useI18n } from "../../i18n/context";

export function BackButton({ onClick }: { onClick: () => void }) {
  const { t } = useI18n();
  return (
    <button
      onClick={onClick}
      aria-label={t("a11yBack")}
      className="w-10 h-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-900 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" />
      </svg>
    </button>
  );
}
