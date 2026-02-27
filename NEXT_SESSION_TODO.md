# Next Session TODO - In sha Allah

**Date Created:** 2026-02-27
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow (4 screens).
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add Habit), Flexible Progress (Streaks).
- Implemented Paywall and Settings screens.
- **Enhanced Habit Features**: Added habit editing, daily streak calculation with grace period, and specific dopamine menu suggestions.
- **Enhanced Progress**: Implemented weekly consistency chart with real data.
- Created Fastlane configuration files.
- Configuration for `app.json` updated with Bundle ID.

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
- `adhd-habit-companion/src/constants/dopamineMenu.ts` (New file)
- `adhd-habit-companion/src/hooks/useHabits.ts` (Added updateHabit, calculateStreak)
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx` (Added edit mode)
- `adhd-habit-companion/src/screens/HabitListScreen.tsx` (Added edit button, delete confirmation)
- `adhd-habit-companion/src/screens/HomeScreen.tsx` (Implemented Dopamine Menu logic)
- `adhd-habit-companion/src/screens/ProgressScreen.tsx` (Real data for weekly chart)

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
