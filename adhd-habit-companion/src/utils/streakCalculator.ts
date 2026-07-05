export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort dates descending (newest first)
    const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

    const getUtcDateOnly = (date: Date) => {
        return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    // Streak must start today or yesterday to be active
    let currentDateStr = sortedDates[0];
    if (currentDateStr !== todayStr && currentDateStr !== yesterdayStr) {
        return 0; // Streak is broken
    }

    let streak = 1;
    let expectedDate = new Date(currentDateStr);

    for (let i = 1; i < sortedDates.length; i++) {
        expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
        const expectedStr = expectedDate.toISOString().split('T')[0];

        if (sortedDates[i] === expectedStr) {
            streak++;
        } else if (sortedDates[i] > expectedStr) {
            // Duplicate date, ignore
            expectedDate.setUTCDate(expectedDate.getUTCDate() + 1);
        } else {
            // Gap found, streak broken
            break;
        }
    }

    return streak;
}
