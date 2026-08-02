// FR-A11Y-TEXT: render-time punctuation trim.
//
// A sentence-final period carries no information in a drill: the stimulus is
// always one sentence, and on a button ("Да.") the dot is pure noise at 60px.
// `?` and `!` stay — several modes ask the learner to tell a question from a
// statement, so the final mark is part of the task. `…` stays too.
//
// This runs at render time only. `itemKey()` derives mastery keys from the raw
// `q` string, so editing the data would orphan every stored progress record.

export function stripFinalPeriod(s: string): string {
  if (!s.endsWith(".")) return s;
  // Guard against "..." — a lookbehind would be cleaner but Safari only
  // supports it from 16.4, and the deployment target is iOS 15.
  if (s.length >= 2 && s[s.length - 2] === ".") return s;
  return s.slice(0, -1);
}
