// FR-FREEMIUM
export type Platform = "web" | "ios" | "android";

export const PLATFORM: Platform =
  (import.meta.env.VITE_PLATFORM as Platform | undefined) ?? "web";

export const IS_WEB = PLATFORM === "web";
export const IS_IOS = PLATFORM === "ios";
export const IS_ANDROID = PLATFORM === "android";
export const IS_NATIVE = IS_IOS || IS_ANDROID;
