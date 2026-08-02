#!/usr/bin/env node
// FR-BUILD: punctuation is engine-rendered furniture, never a learner tile.
//
// Asserts the template invariants over every `words: [...]` array in src/data.
// The punctuation set and the derivation live in src/utils/punct.ts and are
// imported, not copied — a rename there breaks this script loudly.
//
// Run: node scripts/check-build-punct.mjs
// (Node <22.18 needs `node --experimental-strip-types`.)

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { PUNCT, isPunct, joinTokens, buildTemplate } from "../src/utils/punct.ts";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "src", "data");

const WORDS_RE = /words:\s*\[([^\]]*)\]/;
const CONST_RE = /^export const (\w+)/;
const TOKEN_RE = /"([^"]*)"/g;

/** Every `words: [...]` literal in src/data, tagged with its constant and origin. */
function collectArrays() {
  const out = [];
  for (const file of readdirSync(DATA_DIR).filter(f => f.endsWith(".ts")).sort()) {
    let constant = "<file scope>";
    const lines = readFileSync(join(DATA_DIR, file), "utf8").split("\n");
    lines.forEach((line, i) => {
      const c = CONST_RE.exec(line);
      if (c) constant = c[1];
      const w = WORDS_RE.exec(line);
      if (!w) return;
      const tokens = [...w[1].matchAll(TOKEN_RE)].map(m => m[1]);
      if (tokens.length) out.push({ where: `src/data/${file}:${i + 1}`, constant, tokens });
    });
  }
  return out;
}

const arrays = collectArrays();
if (arrays.length === 0) {
  console.error("FAIL: no `words: [...]` arrays found — the scan regex is broken.");
  process.exit(1);
}

const failures = [];
const fail = (where, msg) => failures.push(`${where} — ${msg}`);

for (const { where, tokens } of arrays) {
  const { target, slotOf } = buildTemplate(tokens);

  // The pool is built from `target`, so a punctuation token there is a learner tile.
  // Checked against the PUNCT set, not via isPunct(): routing the assertion through
  // the predicate under test makes it blind to that predicate breaking.
  const leaked = target.filter(tok => PUNCT.has(tok));
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

// Census: what the template will render, per data constant. Useful when authoring
// a new mode (see the "Adding a new mode" checklist in CLAUDE.md).
const census = new Map();
for (const { constant, tokens } of arrays) {
  for (const tok of tokens.filter(isPunct)) {
    const key = `${constant} ${tok}`;
    census.set(key, (census.get(key) ?? 0) + 1);
  }
}
console.log(`Scanned ${arrays.length} words[] arrays in src/data.`);
console.log("Punctuation rendered by the template (never offered as a tile):");
if (census.size === 0) console.log("  (none)");
for (const [key, count] of [...census.entries()].sort()) {
  const [constant, tok] = key.split(" ");
  console.log(`  ${constant.padEnd(24)} ${tok}  ×${count}`);
}

if (failures.length) {
  console.error(`\nFAIL: ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  ${f}`);
  process.exit(1);
}
console.log("\nOK: no punctuation reaches the pool; every template round-trips.");
