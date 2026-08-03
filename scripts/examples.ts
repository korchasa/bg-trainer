/**
 * FR-TASK-MODEL: every mode carries a worked example, shown under the task
 * prompt on every question the way the textbook prints «Примерен образец».
 *
 * `tsc` already forces the field to exist (Mode.example is required); what it
 * cannot see is an empty string, a copy of the instruction, or an example that
 * forgot to show the answer. Scanned as text — src/data/index.ts uses
 * extensionless imports, so importing it here would need --sloppy-imports.
 *
 * Run: `deno task test` (or `deno run -A scripts/examples.ts`).
 */

const FILE = "src/data/index.ts";

const MODE_RE = /^\s*\{ id: "([a-z0-9_]+)",/;
const DESC_RE = /desc: \{ ru: "([^"]*)", uk: "([^"]*)" \}/;
const EXAMPLE_RE = /example: \{ ru: "([^"]*)", uk: "([^"]*)" \}/;
const TYPE_RE = /type: "(\w+)"/;

/** Arrow forms an example may use to separate stimulus from answer. */
const ARROWS = ["→", "↔"];

/** Engines that render a whole sentence: their example is the finished sentence. */
const SENTENCE_ENGINES = new Set(["build"]);

/**
 * `paradigm` carries no text model on purpose: the engine pre-fills the 1sg row
 * and labels it «пример», so a model above the table would spell out forms the
 * learner still has to place (FR-PARADIGM).
 */
const SELF_MODELLING_ENGINES = new Set(["paradigm"]);

export async function checkExamples(): Promise<void> {
  const lines = (await Deno.readTextFile(FILE)).split("\n");
  const failures: string[] = [];
  let count = 0;

  lines.forEach((line, i) => {
    const mode = MODE_RE.exec(line);
    if (!mode) return;
    const id = mode[1];
    const where = `${FILE}:${i + 1} ${id}`;
    count++;

    const example = EXAMPLE_RE.exec(line);
    const type = TYPE_RE.exec(line)?.[1] ?? "";
    if (SELF_MODELLING_ENGINES.has(type)) {
      if (example) {
        failures.push(
          `${where} — ${type} models itself via the pre-filled 1sg row; drop the example`,
        );
      }
      return;
    }
    if (!example) {
      failures.push(`${where} — no example: { ru, uk }`);
      return;
    }
    const [, ru, uk] = example;
    const desc = DESC_RE.exec(line);

    if (!ru.trim() || !uk.trim()) failures.push(`${where} — empty example`);
    if (desc && (ru === desc[1] || uk === desc[2])) {
      failures.push(`${where} — example repeats desc instead of working it out`);
    }
    // An example is prose the learner reads, not a `words[]` row: no space may
    // precede a mark, and one arrow per example keeps «stimulus → answer» legible.
    for (const [lang, text] of [["ru", ru], ["uk", uk]]) {
      const stray = /\s[,.?!…](\s|$)/.exec(text);
      if (stray) failures.push(`${where} — ${lang} example spaces a mark: ${text}`);
    }
    if (!SENTENCE_ENGINES.has(type)) {
      for (const [lang, text] of [["ru", ru], ["uk", uk]]) {
        if (!ARROWS.some((a) => text.includes(a))) {
          failures.push(`${where} — ${lang} example shows no answer (expected → or ↔): ${text}`);
        }
      }
    }
  });

  if (count === 0) {
    console.error(`FAIL: no modes found in ${FILE} — the scan regex is broken.`);
    Deno.exit(1);
  }

  console.log(`Scanned ${count} modes in ${FILE}.`);
  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log(
    `OK: every mode carries a worked example on both languages (${SELF_MODELLING_ENGINES.size} self-modelling engine type excluded).`,
  );
}

if (import.meta.main) await checkExamples();
