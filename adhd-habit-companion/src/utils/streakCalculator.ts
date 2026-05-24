export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates in descending order (most recent first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  // Calculate today's date string in UTC
  const today = new Date().toISOString().split('T')[0];

  // Create Date object for today to calculate yesterday
  const todayDate = new Date(today);
  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let currentStreak = 0;

  // If the most recent completion is not today or yesterday, streak is broken
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  // Count backwards to find consecutive dates
  let currentDateObj = new Date(sortedDates[0]);

  for (let i = 0; i < sortedDates.length; i++) {
    const expectedDateStr = currentDateObj.toISOString().split('T')[0];

    if (sortedDates[i] === expectedDateStr) {
      currentStreak++;
      // Move expected date back by one day
      currentDateObj.setDate(currentDateObj.getDate() - 1);
    } else {
      break;
    }
  }

  return currentStreak;
}
