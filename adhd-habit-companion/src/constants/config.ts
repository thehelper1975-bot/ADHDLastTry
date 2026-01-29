import { Platform } from 'react-native';

export const CONFIG = {
  APP_NAME: 'ADHD Habit Companion',
  APP_VERSION: '1.0.0',
  BUNDLE_ID: 'com.medapps.adhdhabit',

  URLS: {
    PRIVACY: 'https://medappspolicies.blogspot.com/2026/01/privacy-policy.html',
    EULA: 'https://medappspolicies.blogspot.com/2026/01/end-user-license-agreement.html',
    TERMS: 'https://medappspolicies.blogspot.com/2026/01/terms-of-use.html',
    DISCLAIMER: 'https://medappspolicies.blogspot.com/2026/01/disclaimer.html',
    SUPPORT: 'https://medappspolicies.blogspot.com/2026/01/support.html',
  },

  REVENUECAT: {
    API_KEY: Platform.select({
      ios: 'appl_placeholder_key',
      android: 'goog_placeholder_key',
    }),
    ENTITLEMENT_ID: 'premium',
  },

  ONBOARDING_KEY: '@onboarding_complete_v1',
};
