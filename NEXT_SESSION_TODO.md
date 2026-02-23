# Next Session TODO - In sha Allah

**Date Created:** 2026-01-29 (Updated)
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow (4 screens).
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add Habit), Flexible Progress (Streaks).
- Implemented Paywall and Settings screens.
- Created Fastlane configuration files.
- Configuration for `app.json` updated with Bundle ID.
- **Implemented Streak Logic**: Created robust streak calculator handling UTC dates and grace periods.
- **Implemented Dopamine Menu**: Populated menu with varied tasks for different energy levels.
- **Refactored Habit Refresh**: Ensured screens update immediately using `useFocusEffect`.
- **Added Web Support**: Installed dependencies for web debugging.

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

## Files Modified Today
- `adhd-habit-companion/src/utils/streakCalculator.ts` (New)
- `adhd-habit-companion/src/constants/dopamineMenu.ts` (New)
- `adhd-habit-companion/src/hooks/useHabits.ts`
- `adhd-habit-companion/src/screens/HomeScreen.tsx`
- `adhd-habit-companion/src/screens/HabitListScreen.tsx`
- `adhd-habit-companion/package.json` & `package-lock.json`
- `adhd-habit-companion/NEXT_SESSION_TODO.md`

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
