export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = [...new Set(dates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date(new Date().getTime() - 24 * 60 * 60 * 1000);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let currentDate = today;

  // Check if there is no completion today or yesterday, streak is broken
  if (!sortedDates.includes(today) && !sortedDates.includes(yesterday)) {
    return 0;
  }

  // If completed today, start checking from today
  if (sortedDates.includes(today)) {
    let checkDate = new Date(today);
    for (const date of sortedDates) {
      const checkDateStr = checkDate.toISOString().split('T')[0];
      if (date === checkDateStr) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }
  // If completed yesterday, start checking from yesterday
  else if (sortedDates.includes(yesterday)) {
    let checkDate = new Date(yesterday);
    for (const date of sortedDates) {
      const checkDateStr = checkDate.toISOString().split('T')[0];
      if (date === checkDateStr) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
  }

  return streak;
}
