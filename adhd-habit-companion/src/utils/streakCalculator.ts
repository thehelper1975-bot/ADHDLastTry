export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    // Remove duplicates and sort descending
    const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));

    let streak = 0;

    // Get today and yesterday in UTC YYYY-MM-DD
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // Streak is only active if the last completed date is today or yesterday
    if (uniqueDates[0] !== todayStr && uniqueDates[0] !== yesterdayStr) {
        return 0;
    }

    let currentDateStr = uniqueDates[0];

    for (let i = 0; i < uniqueDates.length; i++) {
        if (uniqueDates[i] === currentDateStr) {
            streak++;
            // Calculate next expected date (previous day)
            const prevDay = new Date(currentDateStr);
            prevDay.setUTCDate(prevDay.getUTCDate() - 1);
            currentDateStr = prevDay.toISOString().split('T')[0];
        } else {
            break;
        }
    }

    return streak;
}
