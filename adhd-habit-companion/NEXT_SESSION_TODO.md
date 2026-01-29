# Next Session Todo

## Status
- Implemented "Dopamine Menu" feature.
- Added `useDopamine` hook with AsyncStorage persistence.
- Added `DopamineMenuScreen` with Low/Balanced/High energy tabs.
- Integrated `DopamineMenuScreen` into `AppNavigator`.
- Updated `HomeScreen` to use real suggestions from the menu.
- Fixed `calculateStreak` logic in `useHabits` for daily and weekly habits.

## Modified Files
- `adhd-habit-companion/src/hooks/useDopamine.ts` (Created)
- `adhd-habit-companion/src/screens/DopamineMenuScreen.tsx` (Created)
- `adhd-habit-companion/src/navigation/AppNavigator.tsx`
- `adhd-habit-companion/src/screens/HomeScreen.tsx`
- `adhd-habit-companion/src/hooks/useHabits.ts`

## Next Steps
- Add animations to the Dopamine Menu for better engagement.
- Implement notifications/reminders for habits.
- Improve accessibility labels across the app.
