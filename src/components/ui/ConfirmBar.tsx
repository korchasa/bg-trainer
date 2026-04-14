import { ACCENT } from "../../constants";

interface Props {
  text: string;
  confirmLabel: string;
  cancelLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmBar({ text, confirmLabel, cancelLabel, onConfirm, onCancel }: Props) {
  return (
    <div className="absolute left-0 right-0 bottom-0 p-4 bg-white border-t border-gray-100 shadow-2xl z-50">
      <div className="text-sm font-bold text-gray-800 mb-3 text-center">{text}</div>
      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 py-3 rounded-full bg-[#F2F2F2] text-gray-900 font-bold active:bg-[#E0E0E0]"
        >
          {cancelLabel}
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 py-3 rounded-full text-white font-bold active:opacity-90"
          style={{ backgroundColor: ACCENT }}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  );
}
