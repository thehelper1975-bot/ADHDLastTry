# Next Session TODO - In sha Allah

**Date Created:** 2026-01-29
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow (4 screens).
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add Habit), Flexible Progress (Streaks).
- Implemented Paywall and Settings screens.
- Implemented Habit Editing (Long press), Delete Confirmation, and Data Synchronization (useFocusEffect).
- Created Fastlane configuration files.
- Configuration for `app.json` updated with Bundle ID.
- Added web dependencies (`react-dom`, `react-native-web`) for verifying changes.

## Next Steps - In sha Allah
1. **App Store Init**: Run `fastlane init_app` (requires Apple credentials).
2. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
3. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
4. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
5. **Testing**: Test In-App Purchases on a real device.

## Important Notes
- The app uses `AsyncStorage` for local persistence.
- RevenueCat keys in `config.ts` are placeholders and must be replaced.
- Fastlane is configured but requires environment variables for authentication.
- Web verification is possible with `npx expo start --web`.

## Files Modified Today
- `adhd-habit-companion/src/hooks/useHabits.ts` (Added updateHabit, refresh)
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx` (Added edit mode)
- `adhd-habit-companion/src/screens/HabitListScreen.tsx` (Added long press to edit, confirm delete, refresh on focus, accessibility labels)
- `adhd-habit-companion/src/screens/HomeScreen.tsx` (Added refresh on focus)
- `adhd-habit-companion/package.json` (Added web dependencies)
- `adhd-habit-companion/src/screens/*.tsx` (All screens)
- `adhd-habit-companion/src/navigation/AppNavigator.tsx`
- `adhd-habit-companion/src/contexts/*.tsx`
- `adhd-habit-companion/src/constants/*.ts`
- `adhd-habit-companion/app.json`
- `adhd-habit-companion/App.tsx`
- `adhd-habit-companion/fastlane/Fastfile` & `Appfile`

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
