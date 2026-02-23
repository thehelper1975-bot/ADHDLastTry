
export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Use UTC dates to be consistent with how dates are stored
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setUTCDate(today.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Deduplicate and sort dates descending (newest first)
    const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    if (sortedDates.length === 0) return 0;

    let currentStreak = 0;

    // Check if the most recent completion is valid to start a streak
    // A streak is valid if the last completion was today or yesterday
    let checkDate: Date;

    if (sortedDates[0] === todayStr) {
        currentStreak = 1;
        checkDate = new Date(today);
        checkDate.setUTCDate(checkDate.getUTCDate() - 1); // Next we expect Yesterday
    } else if (sortedDates[0] === yesterdayStr) {
        currentStreak = 1;
        checkDate = new Date(today);
        checkDate.setUTCDate(checkDate.getUTCDate() - 2); // Next we expect 2 days ago
    } else {
        // Streak is broken if last completion was older than yesterday
        return 0;
    }

    // Iterate through the rest of the dates
    for (let i = 1; i < sortedDates.length; i++) {
        const expectedStr = checkDate.toISOString().split('T')[0];

        if (sortedDates[i] === expectedStr) {
            currentStreak++;
            checkDate.setUTCDate(checkDate.getUTCDate() - 1);
        } else {
            // Gap found, streak ends here
            break;
        }
    }

    return currentStreak;
}
