# Next Session TODO - In sha Allah

**Date Updated:** 2026-05-21
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Initialized Expo project with TypeScript, RevenueCat, and AsyncStorage.
- Implemented Onboarding flow.
- Implemented core features: Dopamine Menu (Home), Habit Bundling (Add/Edit Habit), Flexible Progress (Streaks).
- **NEW**: Implemented Habit Editing and Real Streak Calculation logic.
- **NEW**: Implemented Dynamic Dopamine Menu suggestions.
- **NEW**: Added Web Support for testing/verification.
- Implemented Paywall and Settings screens.

## Next Steps - In sha Allah
1. **App Store Init**: Run `fastlane init_app` (requires Apple credentials).
2. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
3. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
4. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
5. **Testing**: Test In-App Purchases on a real device.
6. **UX Improvements**:
    - Add confirmation dialog before deleting a habit.
    - Improve UI for 'Weekly' frequency habits.

## Important Notes
- The app uses `AsyncStorage` for local persistence.
- RevenueCat keys in `config.ts` are placeholders and must be replaced.
- Fastlane is configured but requires environment variables for authentication.

## Files Modified
- `adhd-habit-companion/src/constants/dopamineMenu.ts` (Created)
- `adhd-habit-companion/src/utils/streakCalculator.ts` (Created)
- `adhd-habit-companion/src/screens/HomeScreen.tsx`
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx`
- `adhd-habit-companion/src/screens/HabitListScreen.tsx`
- `adhd-habit-companion/src/hooks/useHabits.ts`
- `adhd-habit-companion/package.json` & `package-lock.json`
- `tests/verify_frontend.py` (Verification script)

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
