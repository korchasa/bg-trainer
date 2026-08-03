/**
 * Bridge to the Node toolchain.
 *
 * Deno is the command runner, but the app itself is a Vite/React bundle wrapped
 * by Capacitor, so the actual builders (`tsc`, `vite`, `cap`) stay Node
 * binaries installed by npm. Resolving them from `node_modules/.bin` directly
 * skips an npm process per call and, more importantly, turns a missing install
 * into one clear message instead of an npm error page.
 */

import { exists, fail, run, type RunOptions, type RunResult } from "./lib.ts";

const BIN_DIR = "node_modules/.bin";

/** Run a locally installed Node CLI, failing clearly when deps are missing. */
export async function nodeTool(
  tool: string,
  args: string[],
  opts: Omit<RunOptions, "args"> = {},
): Promise<RunResult> {
  const bin = `${BIN_DIR}/${tool}`;
  if (!(await exists(bin))) {
    fail(`${bin} is missing — run \`npm ci\` first (Node dependencies are not vendored)`);
  }
  return await run(bin, { ...opts, args });
}

/** Install Node dependencies exactly as the lockfile pins them. */
export async function npmCi(): Promise<void> {
  await run("npm", { args: ["ci"] });
}
