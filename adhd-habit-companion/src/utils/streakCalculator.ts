export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates in descending order (latest first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDateObj = new Date(today);
  let expectedDateStr = todayStr;

  // Check if today or yesterday is completed to start the streak
  if (sortedDates[0] === todayStr) {
    // Streak starts today
  } else if (sortedDates[0] === yesterdayStr) {
    // Streak started yesterday (grace period)
    currentDateObj = yesterday;
    expectedDateStr = yesterdayStr;
  } else {
    // Neither today nor yesterday is completed, streak is broken
    return 0;
  }

  for (const dateStr of sortedDates) {
    if (dateStr === expectedDateStr) {
      streak++;
      // Calculate next expected date (previous day)
      currentDateObj.setUTCDate(currentDateObj.getUTCDate() - 1);
      expectedDateStr = currentDateObj.toISOString().split('T')[0];
    } else if (dateStr > expectedDateStr) {
      // Ignore dates that are newer than expected (e.g. duplicates or sorting issues handled by logic)
      continue;
    } else {
      // Missing a day, streak broken
      break;
    }
  }

  return streak;
}
