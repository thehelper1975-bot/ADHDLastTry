export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates in descending order (newest first)
  const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDateObj = new Date();
  let latestDate = sortedDates[0];

  // Grace period: streak is valid if latest date is today or yesterday
  if (latestDate !== todayStr && latestDate !== yesterdayStr) {
    return 0;
  }

  // Start checking backwards
  if (latestDate === todayStr) {
     streak = 1;
     currentDateObj = new Date(todayStr); // Sets to midnight UTC
  } else if (latestDate === yesterdayStr) {
     streak = 1;
     currentDateObj = new Date(yesterdayStr);
  }

  for (let i = 1; i < sortedDates.length; i++) {
     const prevDate = new Date(currentDateObj);
     prevDate.setUTCDate(prevDate.getUTCDate() - 1);
     const prevDateStr = prevDate.toISOString().split('T')[0];

     if (sortedDates[i] === prevDateStr) {
         streak++;
         currentDateObj = prevDate;
     } else {
         break; // Streak broken
     }
  }

  return streak;
}
