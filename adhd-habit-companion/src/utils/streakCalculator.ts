export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // Sort dates in descending order
    const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    const todayStr = new Date().toISOString().split('T')[0];

    // Yesterday
    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    let streak = 0;
    let expectedDateStr = '';

    if (sortedDates.includes(todayStr)) {
        expectedDateStr = todayStr;
    } else if (sortedDates.includes(yesterdayStr)) {
        expectedDateStr = yesterdayStr;
    } else {
        return 0; // Streak broken
    }

    const currentDate = new Date(expectedDateStr + 'T00:00:00Z');

    for (const dateStr of sortedDates) {
        if (dateStr === expectedDateStr) {
            streak++;
            // Move expected date back by one day
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
            expectedDateStr = currentDate.toISOString().split('T')[0];
        } else if (dateStr > expectedDateStr) {
            // Ignore future dates
            continue;
        } else {
            // Gap found
            break;
        }
    }

    return streak;
}
