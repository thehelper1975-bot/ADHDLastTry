export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  // Ensure dates are sorted in descending order (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;

  // Get today's and yesterday's date strings in UTC
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // If the user hasn't completed the habit today or yesterday, streak is 0
  if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
    return 0;
  }

  // Iterate backwards to count the streak
  let currentDate = sortedDates[0];
  for (let i = 0; i < sortedDates.length; i++) {
    if (sortedDates[i] === currentDate) {
      streak++;

      // Calculate the previous day to check in the next iteration
      const prevDate = new Date(new Date(currentDate).getTime() - 86400000).toISOString().split('T')[0];
      currentDate = prevDate;
    } else if (sortedDates[i] < currentDate) {
        // if there is a gap, break the loop
        break;
    }
  }

  return streak;
}
