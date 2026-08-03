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
 * The colour is the message: a white pill over white content is on screen and
 * still missed. Green for right, accent red for wrong — the same two colours
 * the answer tiles already use, so the verdict reads before the word does. Both
 * carry white text (5.0:1 and 5.1:1, FR-A11Y-CONTRAST).
 *
 * `ok` is required rather than defaulted: a call site that forgets it is a
 * compile error, not a verdict silently rendered as praise.
 *
 * The live region is always mounted and only its content changes: a region that
 * appears together with its text is announced unreliably.
 */
export function Reaction({ text, ok }: { text: string; ok: boolean }) {
  return (
    <div
      className="absolute inset-0 z-40 flex items-center justify-center pointer-events-none"
      role="status"
      aria-live="polite"
    >
      {text
        ? (
          <div
            className={`animate-bounce rounded-full px-6 py-3 text-xl font-black text-white shadow-[0_12px_32px_-8px_rgba(0,0,0,0.45)] ${
              ok ? "bg-emerald-700" : "bg-[#E60023]"
            }`}
          >
            {text}
          </div>
        )
        : null}
    </div>
  );
}
