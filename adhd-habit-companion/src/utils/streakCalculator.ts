export const calculateStreak = (dates: string[], frequency: 'daily' | 'weekly'): number => {
  if (!dates || dates.length === 0) return 0;

  // Sort dates descending (newest first)
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  // Remove duplicates
  const uniqueDates = Array.from(new Set(sortedDates));

  const todayDate = new Date();
  const todayStr = todayDate.toISOString().split('T')[0];

  const yesterdayDate = new Date(todayDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

  if (frequency === 'daily') {
    const lastCompleted = uniqueDates[0];

    // If the last completed date is not today or yesterday, the streak is broken.
    if (lastCompleted !== todayStr && lastCompleted !== yesterdayStr) {
        return 0;
    }

    let streak = 1;
    // Iterate from the first date (most recent)
    for (let i = 0; i < uniqueDates.length - 1; i++) {
        const current = new Date(uniqueDates[i]);
        const next = new Date(uniqueDates[i+1]);

        const diffTime = current.getTime() - next.getTime();
        const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

        if (diffDays === 1) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
  }

  if (frequency === 'weekly') {
      const getMonday = (dateStr: string) => {
        const d = new Date(dateStr);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
        const monday = new Date(d);
        monday.setDate(diff);
        return monday.toISOString().split('T')[0];
      };

      const uniqueWeeks = Array.from(new Set(uniqueDates.map(d => getMonday(d))));

      const thisWeekMonday = getMonday(todayStr);

      const lastWeekMondayDate = new Date(thisWeekMonday);
      lastWeekMondayDate.setDate(lastWeekMondayDate.getDate() - 7);
      const lastWeekMonday = lastWeekMondayDate.toISOString().split('T')[0];

      const lastCompletedWeek = uniqueWeeks[0];

      if (lastCompletedWeek !== thisWeekMonday && lastCompletedWeek !== lastWeekMonday) {
          return 0;
      }

      let streak = 1;
      for (let i = 0; i < uniqueWeeks.length - 1; i++) {
          const current = new Date(uniqueWeeks[i]);
          const next = new Date(uniqueWeeks[i+1]);

          const diffTime = current.getTime() - next.getTime();
          const diffDays = Math.round(diffTime / (1000 * 3600 * 24));

          if (diffDays === 7) {
              streak++;
          } else {
              break;
          }
      }
      return streak;
  }

  return 0;
};
