interface Props {
  text?: string;
}

export function TaskPrompt({ text }: Props) {
  if (!text) return null;
  return (
    <div className="text-xs font-semibold text-gray-500 text-center mb-4 px-2">
      {text}
    </div>
  );
}
