export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Sort dates descending (latest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Use UTC to avoid timezone issues
  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let streak = 0;
  let currentDate = today;

  // Check if today or yesterday is completed. If not, streak is 0.
  if (sortedDates[0] === today) {
    streak = 1;
  } else if (sortedDates[0] === yesterday) {
    streak = 1;
    currentDate = yesterday;
  } else {
    return 0;
  }

  // Iterate backwards to find consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDateObj = new Date(currentDate);
    prevDateObj.setUTCDate(prevDateObj.getUTCDate() - 1);
    const expectedPrevDate = prevDateObj.toISOString().split('T')[0];

    if (sortedDates[i] === expectedPrevDate) {
      streak++;
      currentDate = expectedPrevDate;
    } else if (sortedDates[i] !== currentDate) {
      // Allow duplicates, but if there's a gap, break the streak
      break;
    }
  }

  return streak;
}
