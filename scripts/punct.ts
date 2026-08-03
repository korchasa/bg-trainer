/**
 * FR-BUILD: punctuation is engine-rendered furniture, never a learner tile.
 *
 * Asserts the template invariants over every `words: [...]` array in src/data.
 * The punctuation set and the derivation live in src/utils/punct.ts and are
 * imported, not copied — a rename there breaks this check loudly.
 *
 * Run: `deno task test` (or `deno run -A scripts/punct.ts`).
 */

import { buildTemplate, isPunct, joinTokens, PUNCT } from "../src/utils/punct.ts";

const DATA_DIR = "src/data";

const WORDS_RE = /words:\s*\[([^\]]*)\]/;
const CONST_RE = /^export const (\w+)/;
const TOKEN_RE = /"([^"]*)"/g;

interface WordsArray {
  where: string;
  constant: string;
  tokens: string[];
}

/** Every `words: [...]` literal in src/data, tagged with its constant and origin. */
async function collectArrays(): Promise<WordsArray[]> {
  const out: WordsArray[] = [];
  const files: string[] = [];
  for await (const entry of Deno.readDir(DATA_DIR)) {
    if (entry.isFile && entry.name.endsWith(".ts")) files.push(entry.name);
  }
  for (const file of files.sort()) {
    let constant = "<file scope>";
    const lines = (await Deno.readTextFile(`${DATA_DIR}/${file}`)).split("\n");
    lines.forEach((line, i) => {
      const c = CONST_RE.exec(line);
      if (c) constant = c[1];
      const w = WORDS_RE.exec(line);
      if (!w) return;
      const tokens = [...w[1].matchAll(TOKEN_RE)].map((m) => m[1]);
      if (tokens.length) out.push({ where: `${DATA_DIR}/${file}:${i + 1}`, constant, tokens });
    });
  }
  return out;
}

export async function checkPunctuation(): Promise<void> {
  const arrays = await collectArrays();
  if (arrays.length === 0) {
    console.error("FAIL: no `words: [...]` arrays found — the scan regex is broken.");
    Deno.exit(1);
  }

  const failures: string[] = [];
  const fail = (where: string, msg: string) => failures.push(`${where} — ${msg}`);

  for (const { where, tokens } of arrays) {
    const { target, slotOf } = buildTemplate(tokens);

    // The pool is built from `target`, so a punctuation token there is a learner
    // tile. Checked against the PUNCT set, not via isPunct(): routing the
    // assertion through the predicate under test makes it blind to that
    // predicate breaking.
    const leaked = target.filter((tok) => PUNCT.has(tok));
    if (leaked.length) fail(where, `pool would offer punctuation tiles: ${leaked.join(" ")}`);

    // An all-punctuation item would render a template with nothing to place.
    if (target.length === 0) fail(where, "no placeable words — pool would be empty");

    // The template must lose nothing: refilling its slots reproduces the original.
    const roundTrip = slotOf.map((slot, i) => (slot === -1 ? tokens[i] : target[slot]));
    if (roundTrip.join(" ") !== tokens.join(" ")) {
      fail(where, `template round-trip differs: ${roundTrip.join(" ")} != ${tokens.join(" ")}`);
    }

    // The correction line is composed with joinTokens; no space may precede a mark.
    const joined = joinTokens(tokens);
    const stray = new RegExp(`\\s[${[...PUNCT].join("")}]`).exec(joined);
    if (stray) fail(where, `joinTokens leaves a space before "${stray[0].trim()}": ${joined}`);
  }

  // Census: what the template will render, per data constant. Useful when
  // authoring a new mode (see the "Adding a new mode" checklist in CLAUDE.md).
  const census = new Map<string, number>();
  for (const { constant, tokens } of arrays) {
    for (const tok of tokens.filter(isPunct)) {
      const key = `${constant} ${tok}`;
      census.set(key, (census.get(key) ?? 0) + 1);
    }
  }
  console.log(`Scanned ${arrays.length} words[] arrays in ${DATA_DIR}.`);
  console.log("Punctuation rendered by the template (never offered as a tile):");
  if (census.size === 0) console.log("  (none)");
  for (const [key, count] of [...census.entries()].sort()) {
    const [constant, tok] = key.split(" ");
    console.log(`  ${constant.padEnd(24)} ${tok}  ×${count}`);
  }

  if (failures.length) {
    console.error(`\nFAIL: ${failures.length} problem(s):`);
    for (const f of failures) console.error(`  ${f}`);
    Deno.exit(1);
  }
  console.log("\nOK: no punctuation reaches the pool; every template round-trips.");
}

if (import.meta.main) await checkPunctuation();
