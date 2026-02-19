export const calculateStreak = (completedDates: string[]): number => {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending unique
  const uniqueDates = Array.from(new Set(completedDates));
  const sortedDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  // If the last completed date is not today or yesterday, streak is broken
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  let currentDateStr = sortedDates[0];

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDateStr = sortedDates[i];

    // Create dates at midnight UTC to avoid timezone issues with simple diff
    const current = new Date(currentDateStr);
    const prev = new Date(prevDateStr);

    // Calculate difference in time
    const diffTime = current.getTime() - prev.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round(diffTime / oneDay);

    if (diffDays === 1) {
      streak++;
      currentDateStr = prevDateStr;
    } else {
      break;
    }
  }

  return streak;
};
