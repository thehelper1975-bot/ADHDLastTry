export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates descending
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;

  // Use UTC to ensure consistency with existing model
  const now = new Date();
  const today = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  const yesterday = new Date(today);
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);

  // Strip time from sorted dates
  const cleanDates = sortedDates.map(d => {
    const dObj = new Date(d);
    return new Date(Date.UTC(dObj.getUTCFullYear(), dObj.getUTCMonth(), dObj.getUTCDate()));
  });

  // Remove duplicates
  const uniqueDates = cleanDates.filter((date, index, self) =>
    index === self.findIndex((t) => t.getTime() === date.getTime())
  );

  let currentCheckDate = today;

  // Check if today or yesterday is the start
  if (uniqueDates.length > 0) {
    if (uniqueDates[0].getTime() === today.getTime()) {
      streak++;
      currentCheckDate.setUTCDate(currentCheckDate.getUTCDate() - 1);
    } else if (uniqueDates[0].getTime() === yesterday.getTime()) {
      currentCheckDate = yesterday;
    } else {
        return 0;
    }
  }

  // Iterate backwards to count streak
  for (let i = streak > 0 ? 1 : 0; i < uniqueDates.length; i++) {
      if (uniqueDates[i].getTime() === currentCheckDate.getTime()) {
          streak++;
          currentCheckDate.setUTCDate(currentCheckDate.getUTCDate() - 1);
      } else {
          break;
      }
  }

  return streak;
}
