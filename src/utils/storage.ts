// FR-IOS-STORAGE
// Unified storage adapter:
//   web    → localStorage (sync, no migration)
//   native → Capacitor Preferences (async on disk) backed by an in-memory cache,
//            with one-time idempotent migration of legacy localStorage keys.
//
// Public API stays synchronous so existing callers (history/mastery/pace/locale)
// don't need to become async. Native writes are mirrored to disk via fire-and-forget
// promises; on app foreground/background the cache is the source of truth.

import { Preferences } from "@capacitor/preferences";
import { IS_NATIVE } from "./platform";

const MIGRATED_FLAG_PREFIX = "__migrated__:";

const TRACKED_KEYS = [
  "bg-trainer-v3",
  "bg-trainer-mastery-v1",
  "bg-trainer-pace-v1",
  "bg-trainer-lang-v1",
] as const;

const nativeCache = new Map<string, string | null>();
let initialized = false;
let initPromise: Promise<void> | null = null;

export function initStorage(): Promise<void> {
  if (initialized) return Promise.resolve();
  if (initPromise) return initPromise;
  initPromise = (IS_NATIVE ? initNative() : Promise.resolve()).then(() => {
    initialized = true;
  });
  return initPromise;
}

async function initNative(): Promise<void> {
  for (const key of TRACKED_KEYS) {
    const flagKey = MIGRATED_FLAG_PREFIX + key;
    let migrated = false;
    try {
      const flag = await Preferences.get({ key: flagKey });
      migrated = flag.value === "1";
    } catch {
      migrated = false;
    }

    let value: string | null = null;
    try {
      const got = await Preferences.get({ key });
      value = got.value ?? null;
    } catch {
      value = null;
    }

    if (!migrated) {
      let legacy: string | null = null;
      try {
        legacy = localStorage.getItem(key);
      } catch {
        legacy = null;
      }
      if (legacy !== null && value === null) {
        try {
          await Preferences.set({ key, value: legacy });
          value = legacy;
        } catch {
          // ignore — fall back to legacy in cache, retry next boot
          value = legacy;
        }
      }
      try {
        if (legacy !== null) localStorage.removeItem(key);
      } catch {
        // ignore
      }
      try {
        await Preferences.set({ key: flagKey, value: "1" });
      } catch {
        // ignore — migration flag is best-effort; idempotent re-runs are safe
      }
    }

    nativeCache.set(key, value);
  }
}

export function getRaw(key: string): string | null {
  if (!IS_NATIVE) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }
  return nativeCache.get(key) ?? null;
}

export function setRaw(key: string, value: string): void {
  if (!IS_NATIVE) {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Quota exceeded — silently ignore
    }
    return;
  }
  nativeCache.set(key, value);
  void Preferences.set({ key, value }).catch(() => {
    // ignore — cache holds latest value; next boot rehydrates from disk
  });
}

export function removeRaw(key: string): void {
  if (!IS_NATIVE) {
    try {
      localStorage.removeItem(key);
    } catch {
      // ignore
    }
    return;
  }
  nativeCache.set(key, null);
  void Preferences.remove({ key }).catch(() => {
    // ignore
  });
}
