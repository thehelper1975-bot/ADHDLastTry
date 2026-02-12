# Next Session TODO - In sha Allah

**Date Created:** 2026-01-30
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Improved Streak Calculation logic (consecutive days).
- Implemented Dopamine Menu with real suggestions.
- Added Edit Habit functionality.
- Fixed timezone issues by using local date strings.
- Verified changes with Playwright on Web.

## Next Steps - In sha Allah
1. **App Store Init**: Run `fastlane init_app` (requires Apple credentials).
2. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
3. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
4. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
5. **Testing**: Test In-App Purchases on a real device.

## Important Notes
- Added `react-dom` and `react-native-web` for web verification.
- Use `npx expo start --web` to verify UI changes.

## Files Modified Today
- `adhd-habit-companion/src/utils/dateUtils.ts` (New)
- `adhd-habit-companion/src/utils/streakCalculator.ts` (New)
- `adhd-habit-companion/src/constants/dopamineMenu.ts` (New)
- `adhd-habit-companion/src/hooks/useHabits.ts`
- `adhd-habit-companion/src/screens/HomeScreen.tsx`
- `adhd-habit-companion/src/screens/HabitListScreen.tsx`
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx`
- `adhd-habit-companion/package.json` & `package-lock.json`
