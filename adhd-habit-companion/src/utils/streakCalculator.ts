export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Strip out duplicate dates just in case
  const uniqueDates = Array.from(new Set(sortedDates));

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDateToCheck = today;

  // The streak can start from today or yesterday (grace period)
  if (uniqueDates[0] === todayStr) {
      streak = 1;
      currentDateToCheck = new Date(today);
      currentDateToCheck.setUTCDate(currentDateToCheck.getUTCDate() - 1);
  } else if (uniqueDates[0] === yesterdayStr) {
      streak = 1;
      currentDateToCheck = new Date(yesterday);
      currentDateToCheck.setUTCDate(currentDateToCheck.getUTCDate() - 1);
  } else {
      // The most recent date is before yesterday, streak is broken
      return 0;
  }

  // Count backwards
  for (let i = 1; i < uniqueDates.length; i++) {
      const dateStr = uniqueDates[i];
      const expectedDateStr = currentDateToCheck.toISOString().split('T')[0];

      if (dateStr === expectedDateStr) {
          streak++;
          currentDateToCheck.setUTCDate(currentDateToCheck.getUTCDate() - 1);
      } else {
          break; // Streak broken
      }
  }

  return streak;
}
