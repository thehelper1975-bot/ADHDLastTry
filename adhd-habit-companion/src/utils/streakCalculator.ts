export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Sort dates in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => b.localeCompare(a));

  // Use UTC dates to avoid timezone issues
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let currentStreak = 0;
  let currentDateToCheck = todayStr;

  // Check if today is completed. If not, check yesterday (grace period)
  if (sortedDates.includes(todayStr)) {
    currentStreak = 1;
    currentDateToCheck = yesterdayStr;
  } else if (sortedDates.includes(yesterdayStr)) {
    currentStreak = 1;

    // Set next date to check to day before yesterday
    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setUTCDate(dayBeforeYesterday.getUTCDate() - 1);
    currentDateToCheck = dayBeforeYesterday.toISOString().split('T')[0];
  } else {
    return 0; // Streak is broken
  }

  // Count consecutive days backward
  let i = sortedDates.includes(todayStr) ? 1 : (sortedDates.includes(yesterdayStr) && sortedDates[0] === todayStr ? 2 : 1);

  while (i < sortedDates.length) {
    if (sortedDates[i] === currentDateToCheck) {
      currentStreak++;

      const nextDate = new Date(currentDateToCheck);
      nextDate.setUTCDate(nextDate.getUTCDate() - 1);
      currentDateToCheck = nextDate.toISOString().split('T')[0];

      i++;
    } else {
      // If there's a gap or duplicate (which shouldn't happen but just in case),
      // handle it. If duplicate, skip. If gap, break.
      if (sortedDates[i] > currentDateToCheck) {
        i++; // Skip duplicates or out-of-order if any
      } else {
         break; // Gap found, streak ends
      }
    }
  }

  return currentStreak;
}
