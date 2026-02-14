export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || completedDates.length === 0) return 0;

  // Ensure unique dates
  const uniqueDates = new Set(completedDates);

  // Use UTC date to match existing app logic (new Date().toISOString().split('T')[0])
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  let streak = 0;
  // We need to manipulate date, so we clone today
  let currentDate = new Date(today);

  // Check if today is completed
  if (uniqueDates.has(todayStr)) {
    streak = 1;
    currentDate.setDate(currentDate.getDate() - 1); // Move to yesterday
  } else if (uniqueDates.has(yesterdayStr)) {
    // Grace period: if not done today but done yesterday, streak continues
    streak = 1;
    currentDate.setDate(currentDate.getDate() - 2); // Move to day before yesterday
  } else {
    return 0;
  }

  // Iterate backwards to count consecutive days
  while (true) {
    const dateStr = currentDate.toISOString().split('T')[0];
    if (uniqueDates.has(dateStr)) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}
