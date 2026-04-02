export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  let streak = 0;

  // To have an active streak, the most recent date must be either today or yesterday (grace period)
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0; // Streak broken
  }

  let currentDate = sortedDates[0];
  streak = 1;

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDateString = sortedDates[i];

    // Calculate expected previous day of currentDate
    const expectedPrevDate = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0];

    if (prevDateString === expectedPrevDate) {
      streak++;
      currentDate = prevDateString;
    } else {
      // Missing a day breaks the streak
      break;
    }
  }

  return streak;
}
