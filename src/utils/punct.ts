// FR-BUILD: in sentence-construction drills punctuation is engine-rendered
// furniture, never a learner tile. The learner practises word order; hunting a
// "." among the words teaches nothing.
//
// The set is exactly the five marks a Bulgarian A0 sentence can carry. ";" and
// ":" are left out on purpose — the data has none, and listing marks nobody
// writes is a guess, not a contract. "!" and "…" are absent today but stay in:
// a future author writing one must get template behaviour, not a stray tile.
export const PUNCT = new Set([".", ",", "?", "!", "…"]);

export const isPunct = (token: string): boolean => PUNCT.has(token);

/** Join sentence tokens for display: no space before a punctuation token. */
export function joinTokens(tokens: string[]): string {
  return tokens.reduce(
    (acc, tok, i) => (i === 0 || isPunct(tok) ? acc + tok : acc + " " + tok),
    "",
  );
}

export interface Template {
  /** Tokens the learner places, in correct order. Pool source and comparison sequence. */
  target: string[];
  /** Index-parallel to the input: slot index for a word, -1 for punctuation. */
  slotOf: number[];
}

/**
 * Split a sentence into the words the learner places and the punctuation the
 * engine renders in fixed positions.
 *
 * Derived at render time so the underlying `words` arrays stay byte-identical —
 * a `BuildItem`'s mastery key is `words.join("|")` (see `itemKey.ts`), and
 * rewriting the data would silently drop the learner's progress.
 */
export function buildTemplate(tokens: string[]): Template {
  const target: string[] = [];
  const slotOf = tokens.map(tok => (isPunct(tok) ? -1 : target.push(tok) - 1));
  return { target, slotOf };
}
