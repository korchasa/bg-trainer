// FR-IOS-UX
// Thin native-UX adapter. All calls are no-ops on web; native-only calls are
// fire-and-forget (failures swallowed) so a flaky plugin can't block boot.

import { Haptics, ImpactStyle, NotificationType } from "@capacitor/haptics";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar, Style } from "@capacitor/status-bar";
import { IS_ANDROID, IS_NATIVE } from "./platform";

export async function hideNativeSplash(): Promise<void> {
  if (!IS_NATIVE) return;
  try {
    await SplashScreen.hide({ fadeOutDuration: 200 });
  } catch {
    // ignore
  }
}

export async function applyStatusBarStyle(): Promise<void> {
  if (!IS_NATIVE) return;
  try {
    // App background is #ffffff → dark glyphs/text on light background.
    await StatusBar.setStyle({ style: Style.Dark });
  } catch {
    // ignore
  }
  if (IS_ANDROID) {
    try {
      await StatusBar.setBackgroundColor({ color: "#ffffff" });
    } catch {
      // ignore — setBackgroundColor is Android-only; iOS status bar is transparent
    }
  }
}

export function hapticCorrect(): void {
  if (!IS_NATIVE) return;
  void Haptics.impact({ style: ImpactStyle.Light }).catch(() => {});
}

export function hapticWrong(): void {
  if (!IS_NATIVE) return;
  void Haptics.impact({ style: ImpactStyle.Medium }).catch(() => {});
}

export function hapticRoundFinished(): void {
  if (!IS_NATIVE) return;
  void Haptics.notification({ type: NotificationType.Success }).catch(() => {});
}
