export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // Sort dates in descending order (newest first)
    // Dates are expected to be in YYYY-MM-DD format
    const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the streak is active (completed today or yesterday)
    const lastCompletion = sortedDates[0];

    // If the last completion is not today and not yesterday, streak is broken
    if (lastCompletion !== today && lastCompletion !== yesterday) {
        return 0;
    }

    let streak = 0;
    let currentCheckDate = new Date(lastCompletion);

    // Iterate through sorted dates to count consecutive days
    for (const dateStr of sortedDates) {
        const expectedDateStr = currentCheckDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
            streak++;
            // Move check date back by one day
            currentCheckDate.setDate(currentCheckDate.getDate() - 1);
        } else {
            // Gap found, stop counting
            break;
        }
    }

    return streak;
}
