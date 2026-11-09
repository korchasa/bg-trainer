// FR-IOS-REVIEW
// iOS-only adapter around the local `StoreReview` Capacitor plugin
// (ios/App/App/StoreReviewPlugin.swift). On web every call returns at once and
// the plugin is never registered. Bridge failures are logged, never thrown: a
// missing rating sheet must not disturb the results screen.

import { registerPlugin } from "@capacitor/core";
import { IS_IOS } from "./platform";
import { getRaw, setRaw } from "./storage";
import { countFinished, isReviewDue, markRequested, parseReviewState } from "./reviewPrompt";

export const REVIEW_STORAGE_KEY = "bg-trainer-review-v1";

interface StoreReviewPlugin {
  appVersion(): Promise<{ version: string }>;
  requestReview(): Promise<void>;
}

let plugin: StoreReviewPlugin | null = null;
let version: Promise<string> | null = null;

function bridge(): StoreReviewPlugin {
  plugin ??= registerPlugin<StoreReviewPlugin>("StoreReview");
  return plugin;
}

function appVersion(): Promise<string> {
  version ??= bridge().appVersion().then((r) => r.version);
  return version;
}

/** Counts one finished session; resolves `true` when the rating request is due. */
export async function countFinishedSession(): Promise<boolean> {
  if (!IS_IOS) return false;
  try {
    const v = await appVersion();
    const next = countFinished(parseReviewState(getRaw(REVIEW_STORAGE_KEY)), v);
    setRaw(REVIEW_STORAGE_KEY, JSON.stringify(next));
    return isReviewDue(next, v);
  } catch (e) {
    console.warn("[review] could not count the finished session:", e);
    return false;
  }
}

/** Remembers this version as asked, then asks iOS for its rating sheet. */
export async function requestStoreReview(): Promise<void> {
  if (!IS_IOS) return;
  try {
    const v = await appVersion();
    setRaw(REVIEW_STORAGE_KEY, JSON.stringify(markRequested(parseReviewState(getRaw(REVIEW_STORAGE_KEY)), v)));
    await bridge().requestReview();
  } catch (e) {
    console.warn("[review] rating request failed:", e);
  }
}
