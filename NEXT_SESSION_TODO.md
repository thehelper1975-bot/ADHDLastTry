# Next Session TODO - In sha Allah

**Date Created:** 2026-05-19
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow (4 screens).
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add Habit), Flexible Progress (Streaks).
- Improved Habit interactions (editing, proper delete confirmation).
- Implemented daily and weekly tracking frequencies.
- Realized Streak tracking using UTC dates logic.
- Implemented Paywall and Settings screens.
- Created Fastlane configuration files.
- Configuration for `app.json` updated with Bundle ID.

## Next Steps - In sha Allah
1. **Bugfix/Logic**: The streak logic only accounts for daily tracking. Add streak calculation and display support that accounts for weekly habits.
2. **Bugfix/Logic**: Ensure that when a user marks a habit completed in `toggleHabitCompletion`, the updated streak is visually refreshed immediately on the current screen.
3. **App Store Init**: Run `fastlane init_app` (requires Apple credentials).
4. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
5. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
6. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
7. **Testing**: Test In-App Purchases on a real device.

## Important Notes
- The app uses `AsyncStorage` for local persistence.
- RevenueCat keys in `config.ts` are placeholders and must be replaced.
- Fastlane is configured but requires environment variables for authentication.

## Files Modified Today
- `adhd-habit-companion/src/utils/streakCalculator.ts` (New File)
- `adhd-habit-companion/src/constants/dopamineMenu.ts` (New File)
- `adhd-habit-companion/src/hooks/useHabits.ts`
- `adhd-habit-companion/src/screens/HomeScreen.tsx`
- `adhd-habit-companion/src/screens/HabitListScreen.tsx`
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx`
- `NEXT_SESSION_TODO.md`

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
