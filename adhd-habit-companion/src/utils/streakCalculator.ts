export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // Sort dates in descending order (newest first)
    const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

    const todayStr = new Date().toISOString().split('T')[0];

    // Calculate yesterday's date string
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // If the most recent completion is not today or yesterday, streak is broken
    const mostRecent = sortedDates[0];
    if (mostRecent !== todayStr && mostRecent !== yesterdayStr) {
        return 0;
    }

    let streak = 0;
    let currentDate = new Date(mostRecent); // Start checking from the most recent date

    // Remove duplicates by converting to Set and back to array (though they shouldn't exist)
    const uniqueDates = Array.from(new Set(sortedDates));

    for (let i = 0; i < uniqueDates.length; i++) {
        const expectedDateStr = currentDate.toISOString().split('T')[0];

        if (uniqueDates[i] === expectedDateStr) {
            streak++;
            // Move expected date back one day
            currentDate.setDate(currentDate.getDate() - 1);
        } else {
            // Streak broken
            break;
        }
    }

    return streak;
}
