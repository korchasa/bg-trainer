import Capacitor
import UIKit

/// Registers the app's local Capacitor plugins, which `cap sync` does not discover
/// (it only wires npm plugins into CapApp-SPM). `Main.storyboard` instantiates this class.
class BridgeViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(StoreReviewPlugin()) // FR-IOS-REVIEW
    }
}
