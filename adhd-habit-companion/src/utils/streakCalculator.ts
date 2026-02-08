export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Remove duplicates and sort descending (newest first)
  const sortedDates = [...new Set(completedDates)].sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // If the most recent date is not today or yesterday, streak is broken
  if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 0;
  let checkDate = new Date(sortedDates[0]);

  for (const dateStr of sortedDates) {
    const expectedDateStr = checkDate.toISOString().split('T')[0];

    if (dateStr === expectedDateStr) {
      streak++;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
