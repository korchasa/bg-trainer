interface Props {
  text?: string;
}

// FR-A11Y-TEXT: this is the screen's main instruction — it used to be the
// smallest text on it (12px gray-500). Now 17px at 10.31:1 contrast.
export function TaskPrompt({ text }: Props) {
  if (!text) return null;
  return (
    <div className="text-base font-semibold text-gray-700 text-center mb-4 px-2 leading-snug">
      {text}
    </div>
  );
}
