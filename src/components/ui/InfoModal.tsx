interface Props {
  title: string;
  closeLabel: string;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * FR-HINT-MODAL: reference sheet shown over the game — the hint and the verb
 * table both use it. Unlike `ErrorDialog` it is opened by the learner, so it
 * carries no accent frame and dismisses on a backdrop tap too.
 */
export function InfoModal({ title, closeLabel, onClose, children }: Props) {
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-white rounded-[28px] p-6 shadow-2xl max-h-full overflow-y-auto no-scrollbar"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">{title}</div>
        {children}
        <button
          onClick={onClose}
          className="w-full mt-6 py-4 rounded-full bg-[#111111] text-white font-bold text-base active:opacity-90"
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}
