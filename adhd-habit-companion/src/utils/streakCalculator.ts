export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Ensure dates are sorted in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Use UTC dates to match how they are stored
  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let streak = 0;
  let currentDate = today;

  // Check if the streak is active (completed today or yesterday)
  if (sortedDates[0] === today) {
    streak = 1;
    currentDate = today;
  } else if (sortedDates[0] === yesterday) {
    streak = 1;
    currentDate = yesterday;
  } else {
    return 0; // Streak broken
  }

  // Count backwards to find consecutive days
  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setUTCDate(prevDate.getUTCDate() - 1);
    const expectedDate = prevDate.toISOString().split('T')[0];

    if (sortedDates[i] === expectedDate) {
      streak++;
      currentDate = expectedDate;
    } else {
      break; // Gap found, streak ends
    }
  }

  return streak;
}
