export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending (newest first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDateStr = sortedDates[0];

  // If the most recent completion is not today or yesterday, streak is broken
  if (currentDateStr !== todayStr && currentDateStr !== yesterdayStr) {
    return 0;
  }

  // Count backwards from the most recent completed date
  let dateToCheck = new Date(currentDateStr);

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDateStr = dateToCheck.toISOString().split('T')[0];

    if (sortedDates[i] === expectedDateStr) {
      streak++;
      // Move backwards one day for the next expected date
      dateToCheck.setUTCDate(dateToCheck.getUTCDate() - 1);
    } else {
      break; // Gap found, streak ends
    }
  }

  return streak;
}
