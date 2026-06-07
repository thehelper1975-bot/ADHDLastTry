export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Remove duplicates and sort descending (newest first)
    const uniqueDates = Array.from(new Set(completedDates));
    const sortedDates = uniqueDates.sort((a, b) => b.localeCompare(a));

    const todayDate = new Date();
    const today = todayDate.toISOString().split('T')[0];

    const yesterdayDate = new Date(todayDate);
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    // If the last completion wasn't today or yesterday, streak is broken
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
        return 0;
    }

    let streak = 1;
    let currentDateStr = sortedDates[0];

    for (let i = 1; i < sortedDates.length; i++) {
        // Calculate expected previous date
        const currDateObj = new Date(currentDateStr);
        currDateObj.setUTCDate(currDateObj.getUTCDate() - 1);
        const expectedPrevStr = currDateObj.toISOString().split('T')[0];

        if (sortedDates[i] === expectedPrevStr) {
            streak++;
            currentDateStr = expectedPrevStr;
        } else {
            break;
        }
    }

    return streak;
}
