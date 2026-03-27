export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending (newest first)
  const sortedDates = [...new Set(completedDates)].sort((a, b) => {
    return new Date(b).getTime() - new Date(a).getTime();
  });

  const today = new Date().toISOString().split('T')[0];

  // Calculate yesterday in UTC
  const yesterdayDate = new Date();
  yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
  const yesterday = yesterdayDate.toISOString().split('T')[0];

  let streak = 0;
  let currentDateObj = new Date(today);

  // If the habit wasn't completed today or yesterday, the streak is 0
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  // Start checking backwards
  for (let i = 0; i < sortedDates.length; i++) {
    const d = sortedDates[i];

    // For the very first check, allow today or yesterday
    if (i === 0) {
      if (d === today) {
        streak++;
        // Next expected is yesterday
        currentDateObj.setUTCDate(currentDateObj.getUTCDate() - 1);
        continue;
      } else if (d === yesterday) {
        streak++;
        currentDateObj = new Date(yesterday);
        currentDateObj.setUTCDate(currentDateObj.getUTCDate() - 1);
        continue;
      } else {
        break; // Streak is broken
      }
    }

    // For subsequent dates, check if it matches the expected previous day
    const expectedDateString = currentDateObj.toISOString().split('T')[0];

    if (d === expectedDateString) {
      streak++;
      currentDateObj.setUTCDate(currentDateObj.getUTCDate() - 1);
    } else {
      break; // Streak broken
    }
  }

  return streak;
}
