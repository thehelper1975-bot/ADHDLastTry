export const calculateStreak = (dates: string[]): number => {
  if (!dates || dates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  let currentDate = new Date();
  let currentDateStr = todayStr;

  // Check if today or yesterday is completed, otherwise streak is 0
  if (!sortedDates.includes(todayStr) && !sortedDates.includes(yesterdayStr)) {
    return 0;
  }

  // If today is not completed, we start checking from yesterday
  if (!sortedDates.includes(todayStr)) {
    currentDate = new Date(yesterdayStr);
    currentDateStr = yesterdayStr;
  }

  while (sortedDates.includes(currentDateStr)) {
    streak++;
    currentDate.setDate(currentDate.getDate() - 1);
    currentDateStr = currentDate.toISOString().split('T')[0];
  }

  return streak;
};
