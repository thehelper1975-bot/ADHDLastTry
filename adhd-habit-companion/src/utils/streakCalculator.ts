export function calculateStreak(completedDates: string[], frequency: 'daily' | 'weekly' = 'daily'): number {
  if (!completedDates || completedDates.length === 0) {
    return 0;
  }

  // Sort dates descending (newest first)
  const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Remove duplicates
  const uniqueDates = Array.from(new Set(sortedDates));

  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  if (frequency === 'daily') {
    let streak = 0;
    // Check if the most recent completion is today or yesterday to keep the streak alive
    const mostRecent = uniqueDates[0];
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If the last completion was before yesterday, streak is broken (0), unless we are just calculating the potential streak?
    // Usually streak is 0 if you missed yesterday and today.
    // But if I did it yesterday, streak is 1. If I did it today, streak is X.

    // Let's iterate backwards from today
    let currentCheckDate = new Date(now);

    // However, if I haven't done it today, the streak might still be valid from yesterday.
    // If I haven't done it yesterday, the streak is 0.

    // Simpler approach:
    // Check if uniqueDates contains today.
    let hasToday = uniqueDates.includes(todayStr);
    let hasYesterday = uniqueDates.includes(yesterdayStr);

    if (!hasToday && !hasYesterday) {
        return 0;
    }

    // Start counting from the most recent date in the list that is either today or yesterday
    // Actually, simply iterating down from the most recent date is safer, checking gaps.

    let currentStreak = 0;
    let lastDate = new Date(uniqueDates[0]);

    // Check if the most recent date is too old
    const diffTime = Math.abs(now.getTime() - lastDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Wait, let's use exact date string comparison to be safe with timezones

    // If the latest date is not today and not yesterday, return 0
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
        return 0;
    }

    currentStreak = 1;
    let previousDate = new Date(uniqueDates[0]);

    for (let i = 1; i < uniqueDates.length; i++) {
        const currentDate = new Date(uniqueDates[i]);
        // Difference in days between previousDate and currentDate
        const diff = (previousDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

        if (Math.round(diff) === 1) {
            currentStreak++;
            previousDate = currentDate;
        } else {
            break;
        }
    }
    return currentStreak;

  } else {
    // Weekly logic
    // Week starts on Monday or Sunday? ISO weeks usually start Monday.
    // We can just check if there is a completion in the current week, or previous week.

    // Helper to get week number or start of week date
    const getWeekStart = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay(); // 0 (Sun) to 6 (Sat)
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(date.setDate(diff));
        monday.setHours(0,0,0,0);
        return monday.getTime();
    };

    const thisWeekStart = getWeekStart(now);
    const lastWeekStart = thisWeekStart - (7 * 24 * 60 * 60 * 1000);

    // Map completed dates to their week start timestamps
    const completedWeeks = uniqueDates.map(d => getWeekStart(new Date(d)));
    const uniqueWeeks = Array.from(new Set(completedWeeks)); // already sorted descending because dates were sorted

    if (uniqueWeeks.length === 0) return 0;

    // If the most recent week is not this week and not last week, streak is 0
    if (uniqueWeeks[0] !== thisWeekStart && uniqueWeeks[0] !== lastWeekStart) {
        return 0;
    }

    let streak = 1;
    let previousWeek = uniqueWeeks[0];

    for (let i = 1; i < uniqueWeeks.length; i++) {
        const currentWeek = uniqueWeeks[i];
        const diff = (previousWeek - currentWeek) / (7 * 24 * 60 * 60 * 1000);

        if (Math.round(diff) === 1) {
            streak++;
            previousWeek = currentWeek;
        } else {
            break;
        }
    }
    return streak;
  }
}
