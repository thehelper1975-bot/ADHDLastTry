export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Use UTC dates to match app behavior
  const today = new Date().toISOString().split('T')[0];
  const todayDate = new Date(today);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let streak = 0;
  let currentDate = sortedDates[0];

  // If the latest completion is not today or yesterday, streak is broken
  if (currentDate !== today && currentDate !== yesterday) {
    return 0;
  }

  // Count backwards from the latest completed date
  let expectedDateObj = new Date(currentDate);

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDateStr = expectedDateObj.toISOString().split('T')[0];

    if (sortedDates[i] === expectedDateStr) {
      streak++;
      expectedDateObj.setUTCDate(expectedDateObj.getUTCDate() - 1);
    } else if (sortedDates[i] > expectedDateStr) {
        // Skip duplicate dates (if any exist)
        continue;
    } else {
      break; // Streak broken
    }
  }

  return streak;
}
