export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates in descending order (newest first)
  const sortedDates = [...new Set(completedDates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const yesterday = new Date(today);
  yesterday.setUTCDate(today.getUTCDate() - 1);

  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let currentStreak = 0;
  let currentDateToCheck = todayStr;

  // Check if either today or yesterday is the latest date
  if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      return 0;
  }

  if (sortedDates[0] === todayStr) {
      currentStreak = 1;
      let dateToCheck = new Date(today);

      for (let i = 1; i < sortedDates.length; i++) {
          dateToCheck.setUTCDate(dateToCheck.getUTCDate() - 1);
          const expectedDateStr = dateToCheck.toISOString().split('T')[0];
          if (sortedDates[i] === expectedDateStr) {
              currentStreak++;
          } else {
              break;
          }
      }
  } else if (sortedDates[0] === yesterdayStr) {
      currentStreak = 1;
      let dateToCheck = new Date(yesterday);

      for (let i = 1; i < sortedDates.length; i++) {
          dateToCheck.setUTCDate(dateToCheck.getUTCDate() - 1);
          const expectedDateStr = dateToCheck.toISOString().split('T')[0];
          if (sortedDates[i] === expectedDateStr) {
              currentStreak++;
          } else {
              break;
          }
      }
  }

  return currentStreak;
}
