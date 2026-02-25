export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    const todayDate = new Date();
    const today = todayDate.toISOString().split('T')[0];

    const yesterdayDate = new Date();
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    // Remove duplicates and sort descending (newest first)
    const uniqueDates = [...new Set(completedDates)].sort((a, b) => b.localeCompare(a));

    let currentStreak = 0;
    let checkDateStr = today;

    // Check if streak is active (completed today or yesterday)
    if (uniqueDates.includes(today)) {
        currentStreak = 1;
        checkDateStr = today;
    } else if (uniqueDates.includes(yesterday)) {
        currentStreak = 1;
        checkDateStr = yesterday;
    } else {
        return 0;
    }

    // Count backwards
    while (true) {
        const d = new Date(checkDateStr);
        // We need to handle the date parsing correctly. "YYYY-MM-DD" is parsed as UTC midnight.
        // Subtract 1 day.
        d.setUTCDate(d.getUTCDate() - 1);
        const prevDate = d.toISOString().split('T')[0];

        if (uniqueDates.includes(prevDate)) {
            currentStreak++;
            checkDateStr = prevDate;
        } else {
            break;
        }
    }

    return currentStreak;
}
