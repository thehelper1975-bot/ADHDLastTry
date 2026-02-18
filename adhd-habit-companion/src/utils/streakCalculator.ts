export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    // Remove duplicates and sort descending
    const sortedDates = [...new Set(dates)].sort((a, b) => b.localeCompare(a));

    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    const lastDate = sortedDates[0];

    // If the most recent completion is neither today nor yesterday, the streak is broken.
    if (lastDate !== today && lastDate !== yesterday) {
        return 0;
    }

    let streak = 1;
    let currentRefDate = new Date(lastDate);

    for (let i = 1; i < sortedDates.length; i++) {
        const dateToCheck = sortedDates[i];

        // Calculate the expected previous date (1 day before currentRefDate)
        const expectedDateObj = new Date(currentRefDate);
        expectedDateObj.setDate(expectedDateObj.getDate() - 1);
        const expectedDateStr = expectedDateObj.toISOString().split('T')[0];

        if (dateToCheck === expectedDateStr) {
            streak++;
            currentRefDate = new Date(dateToCheck);
        } else {
            // Gap found, streak ends
            break;
        }
    }

    return streak;
}
