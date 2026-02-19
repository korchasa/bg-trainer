import { BackButton } from "./BackButton";

export function NavHeader({ title, onBack, right }: {
  title: string;
  onBack: () => void;
  right?: React.ReactNode;
}) {
  return (
    <div className="bg-white/95 border-b border-[#f0f0f0] sticky top-0 z-50 h-14 flex items-center justify-between px-4 shrink-0">
      <BackButton onClick={onBack} />
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
      <div className="w-10 flex items-center justify-end">{right}</div>
    </div>
  );
}
