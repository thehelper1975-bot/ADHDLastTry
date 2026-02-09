export function calculateStreak(completedDates: string[], frequency: 'daily' | 'weekly' = 'daily'): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));
  const uniqueDates = Array.from(new Set(sortedDates));

  // Get today's date in UTC (consistent with how dates are stored via toISOString().split('T')[0])
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];
  const today = new Date(todayStr); // UTC midnight

  if (frequency === 'daily') {
    const mostRecentDateStr = uniqueDates[0];
    const mostRecentDate = new Date(mostRecentDateStr); // UTC midnight

    // Calculate difference in days
    // Since both are UTC midnights, getTime() returns milliseconds since epoch.
    const diffTime = today.getTime() - mostRecentDate.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor(diffTime / oneDay);

    if (diffDays > 1) {
      return 0;
    }

    let streak = 0;
    // Create a copy to avoid mutation issues if we were reusing the object
    let currentDateToCheck = new Date(mostRecentDate);

    for (const dateStr of uniqueDates) {
      const date = new Date(dateStr); // UTC midnight

      // Check if this date matches the expected consecutive date
      if (date.getTime() === currentDateToCheck.getTime()) {
        streak++;
        // Move to the previous day using UTC methods
        currentDateToCheck.setUTCDate(currentDateToCheck.getUTCDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  } else {
    // Weekly logic
    const getWeekStart = (date: Date) => {
      const d = new Date(date);
      // Ensure we are working with UTC midnight (though date should already be)
      d.setUTCHours(0, 0, 0, 0);
      const day = d.getUTCDay(); // 0 is Sunday
      // ISO week starts on Monday
      const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
      d.setUTCDate(diff);
      return d;
    };

    const currentWeekStart = getWeekStart(today);

    // Map all completion dates to their week start dates (strings)
    const uniqueWeeks = Array.from(new Set(uniqueDates.map(d => getWeekStart(new Date(d)).toISOString().split('T')[0])))
        .sort().reverse();

    if (uniqueWeeks.length === 0) return 0;

    const mostRecentWeekStartStr = uniqueWeeks[0];
    const mostRecentWeekStart = new Date(mostRecentWeekStartStr); // UTC midnight

    const diffTime = currentWeekStart.getTime() - mostRecentWeekStart.getTime();
    const oneWeek = 1000 * 60 * 60 * 24 * 7;
    const diffWeeks = Math.floor(diffTime / oneWeek);

    if (diffWeeks > 1) {
      return 0;
    }

    let streak = 0;
    let currentWeekToCheck = new Date(mostRecentWeekStart);

    for (const weekStr of uniqueWeeks) {
      if (weekStr === currentWeekToCheck.toISOString().split('T')[0]) {
        streak++;
        // Move to the previous week
        currentWeekToCheck.setUTCDate(currentWeekToCheck.getUTCDate() - 7);
      } else {
        break;
      }
    }
    return streak;
  }
}
