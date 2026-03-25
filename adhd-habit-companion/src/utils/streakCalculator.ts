export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  let streak = 0;
  let currentDate = new Date();
  // Ensure we use UTC date parts
  currentDate.setUTCHours(0, 0, 0, 0);

  const todayStr = currentDate.toISOString().split('T')[0];

  // Check if today or yesterday is the first date
  if (sortedDates[0] !== todayStr) {
      const yesterday = new Date(currentDate);
      yesterday.setUTCDate(yesterday.getUTCDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];

      if (sortedDates[0] !== yesterdayStr) {
          return 0; // Streak broken
      }

      currentDate = yesterday;
  }

  for (const dateStr of sortedDates) {
      const expectedStr = currentDate.toISOString().split('T')[0];

      if (dateStr === expectedStr) {
          streak++;
          currentDate.setUTCDate(currentDate.getUTCDate() - 1);
      } else {
          break; // Streak broken
      }
  }

  return streak;
}
