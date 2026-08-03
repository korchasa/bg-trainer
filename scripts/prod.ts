/**
 * `deno task prod` — build the web app and serve that build locally, which is
 * the closest local equivalent of what visitors get.
 */

import { section } from "./lib.ts";
import { nodeTool } from "./node.ts";
import { build } from "./build.ts";

await build("web");
section("vite preview (Ctrl-C to stop)");
await nodeTool("vite", ["preview", ...Deno.args]);
