/**
 * No Tailwind class may be assembled from a variable.
 *
 * Tailwind generates CSS by scanning the source for **complete class strings**.
 * It does not evaluate JavaScript, so `` `bg-[${ACCENT}]` `` produces no rule at
 * all — and the failure is silent in the worst way: the element still carries a
 * plausible-looking class, the build succeeds, and nothing warns.
 *
 * What made this worth a scan is how it hid. Three files built their wrong-answer
 * colour this way and all three looked correct on screen, because four *other*
 * files spell `bg-[#E60023]` and `border-[#E60023]` out in full and those rules
 * land in the bundle for everyone. Delete the last literal use somewhere else in
 * the app and a wrong answer in «Вставь ли» quietly stops turning red, with the
 * change and the breakage in unrelated files.
 *
 * The pattern below catches the arbitrary-value form specifically — a `-[`
 * opened straight into an interpolation — which is where the colour constants
 * were going. Ordinary interpolation that picks between whole class strings
 * (`${ok ? "bg-emerald-500" : "bg-red-500"}`) is fine and stays legal: both
 * strings are there for the scanner to find.
 *
 * Run: `deno task test` (or `deno run -A scripts/classnames.ts`).
 */

import { walk } from "./lib.ts";

const SRC = "src";

/** `bg-[${…}]`, `border-[${…}]`, `text-[${…}]` — an arbitrary value built at runtime. */
const INTERPOLATED_ARBITRARY = /[\w-]-\[\$\{/;

/**
 * Comment lines are skipped, and not as a convenience: a class name written in a
 * comment reaches neither the scanner nor the DOM, so it is text about the rule
 * rather than a breach of it. Documenting the trap — which `constants.ts` does,
 * next to the constant that fell into it — has to be legal.
 */
const COMMENT = /^\s*(\/\/|\/\*|\*)/;

export async function checkClassNames(): Promise<void> {
  const failures: string[] = [];
  let files = 0;

  for await (const path of walk(SRC, [".ts", ".tsx"])) {
    files++;
    const src = await Deno.readTextFile(path);
    src.split("\n").forEach((line, i) => {
      if (!COMMENT.test(line) && INTERPOLATED_ARBITRARY.test(line)) {
        failures.push(
          `${path}:${i + 1} — Tailwind class built from a variable: \`${line.trim()}\`. ` +
            `The scanner never sees it, so no rule is generated; write the value out in full.`,
        );
      }
    });
  }

  console.log(`Scanned ${files} source files.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("OK: every Tailwind class is written out in full.");
}

if (import.meta.main) await checkClassNames();
