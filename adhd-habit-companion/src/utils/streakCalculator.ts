export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    const uniqueDates = Array.from(new Set(dates));
    uniqueDates.sort((a, b) => b.localeCompare(a));

    const todayStr = new Date().toISOString().split('T')[0];
    const today = new Date(todayStr); // UTC Midnight

    let streak = 0;
    let expectedDate = new Date(today);

    const mostRecentDateStr = uniqueDates[0];
    const mostRecentDate = new Date(mostRecentDateStr);

    const diffTime = today.getTime() - mostRecentDate.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        return 0; // Streak broken
    }

    if (diffDays === 1) {
        expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
    } else if (diffDays < 0) {
        expectedDate = new Date(mostRecentDateStr);
    }

    for (const dateStr of uniqueDates) {
        const currentDate = new Date(dateStr);
        if (currentDate.getTime() === expectedDate.getTime()) {
            streak++;
            expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
        } else if (currentDate.getTime() < expectedDate.getTime()) {
            break;
        }
    }

    return streak;
}
