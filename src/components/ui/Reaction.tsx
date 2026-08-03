/**
 * FR-FEEDBACK-CENTRED: the verdict on an answer, shown over the middle of the
 * visible game area rather than in the document flow.
 *
 * `absolute inset-0` resolves against the game wrapper in `App.tsx` — no engine
 * root is positioned, and `overflow-y-auto` alone does not make one a
 * containing block — so the overlay covers the area below the header and stays
 * put while the play area scrolls under it. `pointer-events-none` keeps the
 * tiles beneath tappable, so the verdict never blocks an answer in progress.
 *
 * The live region is always mounted and only its content changes: a region that
 * appears together with its text is announced unreliably.
 */
export function Reaction({ text }: { text: string }) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {text
        ? (
          <div className="animate-bounce rounded-full bg-white px-6 py-3 text-xl font-black text-gray-900 shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] ring-1 ring-black/5">
            {text}
          </div>
        )
        : null}
    </div>
  );
}
