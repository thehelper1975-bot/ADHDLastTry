export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // Sort dates in descending order (most recent first)
    const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    let streak = 0;
    const today = new Date();
    const yesterday = new Date(today.getTime());
    yesterday.setUTCDate(today.getUTCDate() - 1);

    const todayStr = today.toISOString().split('T')[0];
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Check if the streak is still active (today or yesterday is completed)
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
        return 0;
    }

    let currentDate = new Date(sortedDates[0] + 'T00:00:00Z');

    for (const dateStr of sortedDates) {
        const expectedDateStr = currentDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
            streak++;
            // Move back one day
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}
