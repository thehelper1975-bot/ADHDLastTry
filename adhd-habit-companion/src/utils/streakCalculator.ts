export function calculateStreak(completedDates: string[], frequency: 'daily' | 'weekly' = 'daily'): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
  const uniqueDates = Array.from(new Set(sortedDates));

  if (frequency === 'daily') {
    return calculateDailyStreak(uniqueDates);
  } else {
    return calculateWeeklyStreak(uniqueDates);
  }
}

function calculateDailyStreak(dates: string[]): number {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Check if streak is active (completed today or yesterday)
  const hasCompletedToday = dates.includes(todayStr);
  const hasCompletedYesterday = dates.includes(yesterdayStr);

  if (!hasCompletedToday && !hasCompletedYesterday) {
    return 0;
  }

  let streak = 0;
  // Start counting from the most recent completion
  let checkDate = hasCompletedToday ? new Date(today) : new Date(yesterday);

  while (true) {
      const checkDateStr = checkDate.toISOString().split('T')[0];
      if (dates.includes(checkDateStr)) {
          streak++;
          // Move to previous day
          checkDate.setDate(checkDate.getDate() - 1);
      } else {
          break;
      }
  }

  return streak;
}

function calculateWeeklyStreak(dates: string[]): number {
  // Convert all completed dates to their week identifiers
  const completedWeeks = new Set(dates.map(d => getYearWeek(d)));

  const today = new Date();
  const currentWeek = getYearWeek(today.toISOString().split('T')[0]);

  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const previousWeek = getYearWeek(oneWeekAgo.toISOString().split('T')[0]);

  const hasCompletedCurrentWeek = completedWeeks.has(currentWeek);
  const hasCompletedPreviousWeek = completedWeeks.has(previousWeek);

  if (!hasCompletedCurrentWeek && !hasCompletedPreviousWeek) {
    return 0;
  }

  let streak = 0;
  // Use a separate date object for iteration to avoid mutating 'today' or 'oneWeekAgo' if they were reused
  let referenceDate = new Date(hasCompletedCurrentWeek ? today : oneWeekAgo);

  while (true) {
      const weekStr = getYearWeek(referenceDate.toISOString().split('T')[0]);
      if (completedWeeks.has(weekStr)) {
          streak++;
          // Move back 7 days
          referenceDate.setDate(referenceDate.getDate() - 7);
      } else {
          break;
      }
  }

  return streak;
}

function getYearWeek(dateStr: string): string {
    const date = new Date(dateStr);
    // Copy date so don't modify original
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    const weekNo = Math.ceil(( ( (d.getTime() - yearStart.getTime()) / 86400000) + 1)/7);
    return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}
