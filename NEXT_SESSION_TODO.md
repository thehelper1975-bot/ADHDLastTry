# Next Session TODO - In sha Allah

**Date Created:** 2026-02-02
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow (4 screens).
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add Habit), Flexible Progress (Streaks).
- Implemented Paywall and Settings screens.
- Created Fastlane configuration files.
- Configuration for `app.json` updated with Bundle ID.
- **Improved Code Quality:** Added Jest testing infrastructure, Accessibility improvements, and safe RevenueCat initialization.

## Next Steps - In sha Allah
1. **App Store Init**: Run `fastlane init_app` (requires Apple credentials).
2. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
3. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
4. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
5. **Testing**: Test In-App Purchases on a real device.
6. **More Tests**: Add tests for other screens and contexts.

## Important Notes
- The app uses `AsyncStorage` for local persistence.
- RevenueCat keys in `config.ts` are placeholders and must be replaced.
- Fastlane is configured but requires environment variables for authentication.
- **Testing**: Run `npm test` in `adhd-habit-companion` to run unit tests.

## Files Modified Today
- `adhd-habit-companion/package.json` & `jest.config.js` (Added testing setup)
- `adhd-habit-companion/src/screens/__tests__/HomeScreen.test.tsx` (New test file)
- `adhd-habit-companion/src/screens/HomeScreen.tsx` (Accessibility improvements)
- `adhd-habit-companion/src/contexts/SubscriptionContext.tsx` (Safe init logic)

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
