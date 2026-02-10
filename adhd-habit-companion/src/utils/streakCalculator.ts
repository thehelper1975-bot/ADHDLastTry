export function calculateStreak(dates: string[], frequency: 'daily' | 'weekly'): number {
  if (!dates || dates.length === 0) return 0;

  const uniqueDates = new Set(dates);
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  if (frequency === 'daily') {
    return calculateDailyStreak(uniqueDates, todayStr);
  } else {
    return calculateWeeklyStreak(uniqueDates, today);
  }
}

function calculateDailyStreak(dates: Set<string>, todayStr: string): number {
  let streak = 0;
  let currentCheck = todayStr;

  // Check if streak is active (today or yesterday completed)
  if (!dates.has(currentCheck)) {
    const yesterday = new Date(currentCheck);
    yesterday.setDate(yesterday.getDate() - 1);
    currentCheck = yesterday.toISOString().split('T')[0];

    if (!dates.has(currentCheck)) {
      return 0;
    }
  }

  // Count backwards consecutively
  while (dates.has(currentCheck)) {
    streak++;
    const prevDate = new Date(currentCheck);
    prevDate.setDate(prevDate.getDate() - 1);
    currentCheck = prevDate.toISOString().split('T')[0];
  }

  return streak;
}

function calculateWeeklyStreak(dates: Set<string>, today: Date): number {
    const getMonday = (d: Date | string) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(date.setDate(diff));
        return monday.toISOString().split('T')[0];
    };

    const currentMonday = getMonday(today);

    // Calculate last week's Monday
    const lastWeekDate = new Date(currentMonday);
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const lastWeekMonday = lastWeekDate.toISOString().split('T')[0];

    // Convert all completed dates to their Monday week start
    const completedWeeks = new Set<string>();
    dates.forEach(dateStr => {
        completedWeeks.add(getMonday(dateStr));
    });

    let streak = 0;
    let checkMonday = currentMonday;

    // Check if streak is active (current week or last week completed)
    if (completedWeeks.has(currentMonday)) {
        checkMonday = currentMonday;
    } else if (completedWeeks.has(lastWeekMonday)) {
        checkMonday = lastWeekMonday;
    } else {
        return 0;
    }

    // Count backwards consecutively
    while (completedWeeks.has(checkMonday)) {
        streak++;
        const prevWeek = new Date(checkMonday);
        prevWeek.setDate(prevWeek.getDate() - 7);
        checkMonday = prevWeek.toISOString().split('T')[0];
    }

    return streak;
}
