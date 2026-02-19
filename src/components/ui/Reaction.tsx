export function Reaction({ text }: { text: string }) {
  return (
    <div className="h-9 flex items-center justify-center">
      {text ? <div className="text-xl font-black text-gray-900 animate-bounce">{text}</div> : null}
    </div>
  );
}
