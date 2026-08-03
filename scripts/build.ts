/**
 * `deno task build` / `deno task build:ios` — type-check, then bundle.
 *
 * Two flavours of the same pipeline:
 *   web — the deployed app; `VITE_BASE_PATH` / `VITE_OUT_DIR` come from the
 *         workflow (root deploy, or a /preview/<branch>/ subdirectory).
 *   ios — the bundle Capacitor copies into the Xcode project. Paths must be
 *         relative (`./`) because the WebView loads the files off disk, not
 *         from a server root.
 */

import { section } from "./lib.ts";
import { nodeTool } from "./node.ts";

export type Flavour = "web" | "ios";

function envFor(flavour: Flavour): Record<string, string> {
  if (flavour !== "ios") return {};
  return { VITE_BASE_PATH: "./", VITE_PLATFORM: "ios" };
}

export async function build(flavour: Flavour): Promise<void> {
  const env = envFor(flavour);

  section(`Type-check (tsc, ${flavour})`);
  await nodeTool("tsc", [], { env });

  section(`Bundle (vite build, ${flavour})`);
  await nodeTool("vite", ["build"], { env });
}

if (import.meta.main) {
  const flavour = Deno.args[0] === "ios" ? "ios" : "web";
  await build(flavour);
}
