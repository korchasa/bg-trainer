/**
 * FR-IOS-UX: where a typing drill leaves its scroll when the keyboard opens.
 *
 * The drill scrolls its play area to the end so the check button comes up
 * above the keyboard, and the pinned question (FR-QUESTION-PINNED) stays on
 * top. At the largest text sizes the field and the button no longer fit under
 * the pinned question together, and scrolling to the end slid the field under
 * it: what the learner typed was hidden. The field wins over the button, and
 * the rule lives in a pure module so it can be replayed here with numbers.
 *
 * Run: `deno task test` (or `deno run -A scripts/keyboard.ts`).
 */

import { fail } from "./lib.ts";
import { FIELD_GAP, keyboardScrollTop } from "../src/utils/keyboardScroll.ts";

const HOOK = "src/hooks/useScrollToEndOnKeyboard.ts";
const STICKY = "src/components/ui/StickyQuestion.tsx";

interface Case {
  name: string;
  input: Parameters<typeof keyboardScrollTop>[0];
  want: number;
}

const CASES: Case[] = [
  {
    name: "default text: the field sits well below the question at the end",
    input: { end: 120, fieldTop: 300, pinnedBottom: 220 },
    want: 120,
  },
  {
    name: "largest text: the field would slide 60px under the question",
    input: { end: 200, fieldTop: 240 - 60, pinnedBottom: 240 },
    want: 200 - 60 - FIELD_GAP,
  },
  {
    name: "the field touching the question still gets its gap",
    input: { end: 50, fieldTop: 240, pinnedBottom: 240 },
    want: 50 - FIELD_GAP,
  },
  {
    name: "never scrolls above the top",
    input: { end: 30, fieldTop: 100, pinnedBottom: 240 },
    want: 0,
  },
  {
    name: "no field in the play area: scroll to the end as before",
    input: { end: 80, fieldTop: null, pinnedBottom: 240 },
    want: 80,
  },
  {
    name: "no pinned question: scroll to the end as before",
    input: { end: 80, fieldTop: 10, pinnedBottom: null },
    want: 80,
  },
];

export async function checkKeyboardScroll(): Promise<void> {
  const errors: string[] = [];
  for (const c of CASES) {
    const got = keyboardScrollTop(c.input);
    if (got !== c.want) errors.push(`${c.name}: got ${got}, want ${c.want}`);
  }

  const hook = await Deno.readTextFile(HOOK);
  if (!hook.includes("keyboardScrollTop(")) {
    errors.push(`${HOOK} does not ask keyboardScrollTop where to stop`);
  }
  if (!hook.includes("[data-pinned-question]")) {
    errors.push(`${HOOK} does not measure the pinned question`);
  }
  const sticky = await Deno.readTextFile(STICKY);
  if (!sticky.includes("data-pinned-question")) {
    errors.push(`${STICKY} does not mark itself with data-pinned-question`);
  }

  if (errors.length > 0) fail(errors.join("\n"));
  console.log(`OK: ${CASES.length} keyboard scroll cases; the field stays below the question.`);
}

if (import.meta.main) await checkKeyboardScroll();
