export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const today = new Date().toISOString().split('T')[0];

  // Calculate yesterday
  const yesterdayDate = new Date();
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let currentStreak = 0;
  let currentDate = today;

  // If the last completed date is neither today nor yesterday, the streak is broken.
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  // If the first date in sorted is yesterday, our target for the loop starts from yesterday.
  if (sortedDates[0] === yesterday) {
    currentDate = yesterday;
  }

  for (let i = 0; i < sortedDates.length; i++) {
    if (sortedDates[i] === currentDate) {
      currentStreak++;

      // Calculate previous day
      const prevDate = new Date(currentDate);
      prevDate.setUTCDate(prevDate.getUTCDate() - 1);
      currentDate = prevDate.toISOString().split('T')[0];
    } else {
      break;
    }
  }

  return currentStreak;
}
