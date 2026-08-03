/**
 * `deno task ios:sync` — rebuild the iOS web bundle and copy it into the Xcode
 * project. `deno task ios:open` — open that project in Xcode.
 */

import { fail, section } from "./lib.ts";
import { nodeTool } from "./node.ts";
import { build } from "./build.ts";

const action = Deno.args[0];

if (action === "sync") {
  await build("ios");
  section("cap sync ios");
  await nodeTool("cap", ["sync", "ios"]);
} else if (action === "open") {
  section("cap open ios");
  await nodeTool("cap", ["open", "ios"]);
} else {
  fail(`unknown action "${action ?? ""}" — expected "sync" or "open"`);
}
