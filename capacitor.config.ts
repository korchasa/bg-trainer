import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'dev.korchasa.bgtrainer',
  appName: 'BG Trainer',
  webDir: 'dist',
  ios: {
    contentInset: 'never',
    backgroundColor: '#ffffff',
    limitsNavigationsToAppBoundDomains: true,
  },
}

export default config
