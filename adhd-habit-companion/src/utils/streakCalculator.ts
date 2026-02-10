export function calculateStreak(completedDates: string[]): number {
  if (!completedDates || !completedDates.length) return 0;

  // Sort dates descending unique
  const uniqueDates = Array.from(new Set(completedDates)).sort((a, b) => b.localeCompare(a));

  const today = new Date().toISOString().split('T')[0];

  const getPrevDate = (dateStr: string) => {
    const d = new Date(dateStr);
    d.setUTCDate(d.getUTCDate() - 1);
    return d.toISOString().split('T')[0];
  };

  const yesterday = getPrevDate(today);

  let streak = 0;
  let currentCheckDate: string;

  if (uniqueDates.includes(today)) {
    streak = 1;
    currentCheckDate = yesterday;
  } else if (uniqueDates.includes(yesterday)) {
    streak = 1;
    currentCheckDate = getPrevDate(yesterday);
  } else {
    return 0;
  }

  while (uniqueDates.includes(currentCheckDate)) {
    streak++;
    currentCheckDate = getPrevDate(currentCheckDate);
  }

  return streak;
}
