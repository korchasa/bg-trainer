import Capacitor
import StoreKit
import UIKit

/// FR-IOS-REVIEW: local Capacitor plugin behind `src/utils/storeReview.ts`.
/// Two calls only: the marketing version (for the once-per-version rule, kept in JS)
/// and the system rating sheet. Apple decides whether the sheet actually appears.
@objc(StoreReviewPlugin)
public class StoreReviewPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "StoreReviewPlugin"
    public let jsName = "StoreReview"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "appVersion", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "requestReview", returnType: CAPPluginReturnPromise)
    ]

    @objc func appVersion(_ call: CAPPluginCall) {
        guard let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String,
              !version.isEmpty else {
            call.reject("CFBundleShortVersionString is missing from Info.plist")
            return
        }
        call.resolve(["version": version])
    }

    @objc func requestReview(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let scene = self.bridge?.viewController?.view.window?.windowScene else {
                call.reject("no window scene to present the rating sheet in")
                return
            }
            if #available(iOS 16.0, *) {
                AppStore.requestReview(in: scene)
            } else {
                SKStoreReviewController.requestReview(in: scene)
            }
            call.resolve()
        }
    }
}
