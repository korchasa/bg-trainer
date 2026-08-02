import type { ReactNode } from "react";

// FR-RESPONSIVE-LAYOUT: column count follows the longest option, not the device.
//
// Budget on the narrowest supported window (320pt) inside `p-4`:
//   3 columns -> 88pt per button, minus 32pt inner padding = 56pt of text
//   2 columns -> 140pt per button, minus 32pt = 108pt of text
// At 17px roughly 5 and 11 Cyrillic characters fit. Anything longer drops to a
// single column rather than wrapping into a cramped two-line cell.
const THREE_COL_MAX_LEN = 5;
const TWO_COL_MAX_LEN = 11;

export function answerColumns(options: string[]): 1 | 2 | 3 {
  const longest = options.reduce((m, o) => Math.max(m, o.length), 0);
  if (longest > TWO_COL_MAX_LEN) return 1;
  if (longest > THREE_COL_MAX_LEN) return 2;
  return 3;
}

export function AnswerGrid({ options, children }: { options: string[]; children: ReactNode }) {
  const cols = answerColumns(options);
  const colClass = cols === 3 ? "grid-cols-3" : cols === 2 ? "grid-cols-2" : "grid-cols-1";
  return <div className={`w-full grid ${colClass} gap-3 mb-4`}>{children}</div>;
}
