export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  // Get unique dates
  const uniqueDates = Array.from(new Set(sortedDates));

  const today = new Date().toISOString().split('T')[0];

  const yesterdayDate = new Date();
  // We want yesterday relative to UTC "today".
  // Actually, simplest is just subtract 24h from current time?
  // No, because "yesterday" means the calendar day before today (UTC).
  // If today is 2023-10-28 (UTC), yesterday is 2023-10-27.

  // Calculate yesterday from today string to be safe
  const todayDateObj = new Date(today); // This is UTC midnight of today
  todayDateObj.setUTCDate(todayDateObj.getUTCDate() - 1);
  const yesterday = todayDateObj.toISOString().split('T')[0];

  // Check if the most recent completion is today or yesterday
  const mostRecent = uniqueDates[0];
  if (mostRecent !== today && mostRecent !== yesterday) {
    return 0;
  }

  let streak = 0;
  let expectedDate = mostRecent;

  for (const dateStr of uniqueDates) {
    if (dateStr === expectedDate) {
      streak++;
      // Move expectedDate back one day
      const d = new Date(expectedDate);
      d.setUTCDate(d.getUTCDate() - 1);
      expectedDate = d.toISOString().split('T')[0];
    } else {
        // Break if sequence is broken
        break;
    }
  }

  return streak;
}
