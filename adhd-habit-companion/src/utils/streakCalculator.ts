export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort dates in descending order (latest first) and remove duplicates
    const sortedDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    // If the latest date is not today or yesterday, the streak is broken (0)
    const latestDate = sortedDates[0];
    if (latestDate !== today && latestDate !== yesterday) {
        return 0;
    }

    let streak = 0;
    // We check backwards starting from the latest completed date
    let currentDateToCheck = latestDate;

    for (let i = 0; i < sortedDates.length; i++) {
        if (sortedDates[i] === currentDateToCheck) {
            streak++;
            // Move to previous day
            const d = new Date(currentDateToCheck);
            // Ensure date is interpreted as UTC to avoid timezone shifts
            // new Date("YYYY-MM-DD") is UTC, but just to be safe we manipulate the date object carefully
            d.setUTCDate(d.getUTCDate() - 1);
            currentDateToCheck = d.toISOString().split('T')[0];
        } else {
            // Gap found
            break;
        }
    }

    return streak;
}
