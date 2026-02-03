export function calculateStreak(completedDates: string[], frequency: 'daily' | 'weekly'): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort unique dates descending
    const uniqueDates = [...new Set(completedDates)].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (uniqueDates.length === 0) return 0;

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    if (frequency === 'daily') {
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        // If the latest completion is not today or yesterday, streak is broken
        // (unless checking right now, and we haven't done it today, but did yesterday, streak is preserved)
        if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
            return 0;
        }

        let streak = 0;
        // Start counting from the most recent completed date
        let currentDate = new Date(uniqueDates[0]);

        for (let i = 0; i < uniqueDates.length; i++) {
             const expectedDateStr = currentDate.toISOString().split('T')[0];

             if (uniqueDates[i] === expectedDateStr) {
                 streak++;
                 currentDate.setDate(currentDate.getDate() - 1); // Move to previous day
             } else {
                 break; // Sequence broken
             }
        }
        return streak;
    }

    if (frequency === 'weekly') {
        const getMonday = (date: Date): string => {
            const d = new Date(date);
            const day = d.getDay();
            const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
            d.setDate(diff);
            return d.toISOString().split('T')[0];
        };

        const currentMonday = getMonday(new Date());
        const lastWeekMondayDate = new Date(currentMonday);
        lastWeekMondayDate.setDate(lastWeekMondayDate.getDate() - 7);
        const lastWeekMondayStr = lastWeekMondayDate.toISOString().split('T')[0];

        // Map all completed dates to their Monday-week-start
        const weeksWithCompletions = new Set(uniqueDates.map(d => getMonday(new Date(d))));
        const sortedWeeks = [...weeksWithCompletions].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

        if (sortedWeeks.length === 0) return 0;

        // If most recent week is not this week AND not last week, streak broken
        if (sortedWeeks[0] !== currentMonday && sortedWeeks[0] !== lastWeekMondayStr) {
            return 0;
        }

        let streak = 0;
        let checkWeekDate = new Date(sortedWeeks[0]);

        for (let i = 0; i < sortedWeeks.length; i++) {
            if (sortedWeeks[i] === checkWeekDate.toISOString().split('T')[0]) {
                streak++;
                checkWeekDate.setDate(checkWeekDate.getDate() - 7);
            } else {
                break;
            }
        }
        return streak;
    }

    return 0;
}
