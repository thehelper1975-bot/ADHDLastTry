export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    const uniqueDates = new Set(completedDates);
    const todayStr = new Date().toISOString().split('T')[0];

    const yesterdayDate = new Date(todayStr); // 00:00 UTC
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    let currentCheckDateStr = todayStr;

    // Check if the streak is active (completed today or yesterday)
    if (uniqueDates.has(todayStr)) {
        currentCheckDateStr = todayStr;
    } else if (uniqueDates.has(yesterdayStr)) {
        currentCheckDateStr = yesterdayStr;
    } else {
        return 0;
    }

    let streak = 0;
    while (uniqueDates.has(currentCheckDateStr)) {
        streak++;
        const date = new Date(currentCheckDateStr);
        date.setUTCDate(date.getUTCDate() - 1);
        currentCheckDateStr = date.toISOString().split('T')[0];
    }

    return streak;
}
