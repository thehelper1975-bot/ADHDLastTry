export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Ensure dates are sorted in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Use UTC to prevent timezone issues
  const today = new Date().toISOString().split('T')[0];

  // Yesterday's date
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let streak = 0;

  // To have a streak, the latest completion must be either today or yesterday
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let currentDateObj = new Date(sortedDates[0]);

  for (let i = 0; i < sortedDates.length; i++) {
    const dStr = sortedDates[i];
    const expectedStr = currentDateObj.toISOString().split('T')[0];

    if (dStr === expectedStr) {
      streak++;
      // Move current date back by 1 day
      currentDateObj.setDate(currentDateObj.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
