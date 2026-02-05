export const calculateStreak = (
  completedDates: string[],
  frequency: 'daily' | 'weekly'
): number => {
  if (!completedDates || completedDates.length === 0) return 0;

  // Unique dates to avoid double counting
  const uniqueDates = Array.from(new Set(completedDates));

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const toDateStr = (d: Date) => d.toISOString().split('T')[0];

  if (frequency === 'daily') {
    let streak = 0;
    let checkDate = new Date(today);

    const hasToday = uniqueDates.includes(toDateStr(today));

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const hasYesterday = uniqueDates.includes(toDateStr(yesterday));

    if (hasToday) {
       // Start counting from today
    } else if (hasYesterday) {
       // Start counting from yesterday
       checkDate = yesterday;
    } else {
       return 0;
    }

    while (true) {
      if (uniqueDates.includes(toDateStr(checkDate))) {
        streak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  } else {
    // Weekly
    const getMonday = (d: Date) => {
        const date = new Date(d);
        const day = date.getDay();
        const diff = date.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(date.setDate(diff));
        monday.setHours(0,0,0,0);
        return monday;
    }

    // Convert all completed dates to their Monday representation
    const completedWeeks = new Set(uniqueDates.map(dateStr => {
        // Handle timezone issues roughly by appending T12:00:00 if needed,
        // but assuming dateStr is YYYY-MM-DD, new Date(dateStr) is UTC 00:00.
        // If we just do new Date(dateStr), it might be interpreted as UTC.
        // But getMonday operations work on the Date object.
        // Let's assume input dates are consistent with "today" logic.
        return toDateStr(getMonday(new Date(dateStr)));
    }));

    let streak = 0;
    let checkDate = new Date(today);
    let checkMonday = getMonday(checkDate);

    const thisWeekMonday = toDateStr(checkMonday);

    const lastWeekDate = new Date(today);
    lastWeekDate.setDate(lastWeekDate.getDate() - 7);
    const lastWeekMonday = toDateStr(getMonday(lastWeekDate));

    if (completedWeeks.has(thisWeekMonday)) {
        // Start from this week
    } else if (completedWeeks.has(lastWeekMonday)) {
        // Start from last week
        checkMonday = getMonday(lastWeekDate);
    } else {
        return 0;
    }

    while (true) {
        if (completedWeeks.has(toDateStr(checkMonday))) {
            streak++;
            checkMonday.setDate(checkMonday.getDate() - 7);
        } else {
            break;
        }
    }
    return streak;
  }
};
