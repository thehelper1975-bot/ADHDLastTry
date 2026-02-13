# Next Session TODO - In sha Allah

**Date Created:** 2026-02-13
**App Name:** ADHD Habit Companion
**Branch:** app/adhd-habit-companion

## Current Status
- Implemented habit editing (AddHabitScreen refactored).
- Implemented streak calculation (streakCalculator.ts) and integrated it into `useHabits`.
- Added delete confirmation dialog.
- Added accessibility labels for better testing and accessibility.
- Verified frontend changes with Playwright.
- Verified logic with standalone test script.

## Next Steps - In sha Allah
1. **RevenueCat Integration**:
    - Configure RevenueCat dashboard with products: `adhd_habit_monthly`, `adhd_habit_yearly`, `adhd_habit_lifetime`.
    - Update `src/constants/config.ts` with real API Keys.
2. **ASO Metadata**: Generate and upload metadata using `fastlane metadata` lane.
3. **Screenshots**: Generate screenshots for App Store using `fastlane screenshots` lane (requires Simulator setup).
4. **Testing**: Test In-App Purchases on a real device.

## Important Notes
- `streakCalculator.ts` logic is now robust and handles timezones via UTC methods.
- `useHabits` auto-refreshes streaks on load.
- Frontend tests are in `verification/` (deleted after run).

## Files Modified Today
- `adhd-habit-companion/src/screens/AddHabitScreen.tsx`
- `adhd-habit-companion/src/screens/HabitListScreen.tsx`
- `adhd-habit-companion/src/hooks/useHabits.ts`
- `adhd-habit-companion/src/utils/streakCalculator.ts` (Created)
- `adhd-habit-companion/src/utils/dateUtils.ts` (Created)
- `adhd-habit-companion/package.json` (Added web dependencies)

## How to Continue
1. Read this file
2. Checkout the correct branch: `git checkout app/adhd-habit-companion`
3. Start with the first item in "Next Steps"
