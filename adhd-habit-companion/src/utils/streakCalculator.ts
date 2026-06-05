export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates in descending order (latest first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDate = new Date(todayStr); // Start tracking from today

  // If the last completed date is not today and not yesterday, streak is broken
  if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
    return 0;
  }

  // Iterate over sorted dates and check for consecutive dates
  // Since we know the first date is either today or yesterday, we can just track backwards

  // We'll use a set for faster lookup
  const datesSet = new Set(sortedDates);

  // Start checking backwards
  // If the most recent is yesterday, start counting from yesterday
  if (sortedDates[0] === yesterdayStr && !datesSet.has(todayStr)) {
      currentDate = new Date(yesterdayStr);
  }

  while (true) {
    const currentStr = currentDate.toISOString().split('T')[0];
    if (datesSet.has(currentStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
