// FR-IAP, FR-FREEMIUM
// Platform-aware IAP service.
//   web    → permanently unlocked (web is fully free per FR-FREEMIUM); no SDK loaded.
//   native → RevenueCat SDK; cached `proUnlocked` honored offline; live updates via listener.
//
// Public surface stays sync-friendly: components subscribe via `useIap()` and call
// `purchaseLifetime()` / `restorePurchases()`. The RC SDK module is loaded via
// dynamic import only on native, so the web bundle does not pay for native code.

import { useEffect, useState } from "react";
import type { CustomerInfo, PurchasesPackage } from "@revenuecat/purchases-typescript-internal-esm";
import { IS_NATIVE } from "../utils/platform";
import { getRaw, setRaw } from "../utils/storage";

const PRO_ENTITLEMENT_ID = "pro";
const LIFETIME_PACKAGE_ID = "$rc_lifetime";
const PRO_UNLOCKED_CACHE_KEY = "bg-trainer-pro-unlocked-v1";

interface IapState {
  ready: boolean;
  proUnlocked: boolean;
  packages: PurchasesPackage[];
  configError: string | null;
}

let state: IapState = {
  ready: !IS_NATIVE,
  proUnlocked: !IS_NATIVE, // web boots unlocked; native overlays cached value below
  packages: [],
  configError: null,
};

const listeners = new Set<() => void>();
const notify = () => listeners.forEach(l => l());
const setState = (patch: Partial<IapState>) => { state = { ...state, ...patch }; notify(); };

function readCachedProUnlocked(): boolean {
  if (!IS_NATIVE) return true;
  return getRaw(PRO_UNLOCKED_CACHE_KEY) === "1";
}

function writeCachedProUnlocked(v: boolean): void {
  if (!IS_NATIVE) return;
  setRaw(PRO_UNLOCKED_CACHE_KEY, v ? "1" : "0");
}

function applyCustomerInfo(info: CustomerInfo): void {
  const unlocked = info.entitlements.active[PRO_ENTITLEMENT_ID] !== undefined;
  if (unlocked !== state.proUnlocked) writeCachedProUnlocked(unlocked);
  setState({ proUnlocked: unlocked });
}

let initStarted = false;

export async function initIap(): Promise<void> {
  if (!IS_NATIVE) {
    setState({ ready: true, proUnlocked: true });
    return;
  }
  if (initStarted) return;
  initStarted = true;

  // Hydrate from cache so offline / pre-RC-fetch state is honored on the first paint.
  setState({ proUnlocked: readCachedProUnlocked() });

  const apiKey = import.meta.env.VITE_REVENUECAT_KEY_IOS;
  if (!apiKey) {
    setState({ ready: true, configError: "missing-api-key" });
    return;
  }

  try {
    const { Purchases, LOG_LEVEL } = await import("@revenuecat/purchases-capacitor");
    if (import.meta.env.DEV) {
      await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
    }
    await Purchases.configure({ apiKey });
    await Purchases.addCustomerInfoUpdateListener(info => applyCustomerInfo(info));
    const { customerInfo } = await Purchases.getCustomerInfo();
    applyCustomerInfo(customerInfo);
    const offerings = await Purchases.getOfferings();
    if (offerings.current) {
      setState({ packages: offerings.current.availablePackages });
    }
    setState({ ready: true });
  } catch (e) {
    // Init failure is non-fatal: cached proUnlocked stays in effect; UI shows "try again later".
    const msg = e instanceof Error ? e.message : "unknown";
    setState({ ready: true, configError: msg });
  }
}

export interface PurchaseOutcome {
  ok: boolean;
  /** Apple sandbox / RC error code; "user-cancelled" when the user dismissed the sheet. */
  error?: string;
}

export async function purchaseLifetime(): Promise<PurchaseOutcome> {
  if (!IS_NATIVE) return { ok: true };
  const target = state.packages.find(p => p.identifier === LIFETIME_PACKAGE_ID) ?? state.packages[0];
  if (!target) return { ok: false, error: "no-packages" };
  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const result = await Purchases.purchasePackage({ aPackage: target });
    applyCustomerInfo(result.customerInfo);
    return { ok: state.proUnlocked };
  } catch (e: unknown) {
    const err = e as { userCancelled?: boolean; message?: string };
    if (err?.userCancelled) return { ok: false, error: "user-cancelled" };
    return { ok: false, error: err?.message ?? "unknown" };
  }
}

export async function restorePurchases(): Promise<PurchaseOutcome> {
  if (!IS_NATIVE) return { ok: true };
  try {
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    const { customerInfo } = await Purchases.restorePurchases();
    applyCustomerInfo(customerInfo);
    return { ok: state.proUnlocked };
  } catch (e: unknown) {
    const err = e as { message?: string };
    return { ok: false, error: err?.message ?? "unknown" };
  }
}

export function getLifetimePriceString(): string | null {
  const target = state.packages.find(p => p.identifier === LIFETIME_PACKAGE_ID) ?? state.packages[0];
  return target?.product?.priceString ?? null;
}

export function useIap() {
  const [, force] = useState(0);
  useEffect(() => {
    const listener = () => force(n => n + 1);
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  }, []);
  return {
    ready: state.ready,
    proUnlocked: state.proUnlocked,
    packages: state.packages,
    configError: state.configError,
    priceString: getLifetimePriceString(),
    purchase: purchaseLifetime,
    restore: restorePurchases,
  };
}
