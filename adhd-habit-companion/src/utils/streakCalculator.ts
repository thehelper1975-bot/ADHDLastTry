export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    const uniqueDates = Array.from(new Set(dates)).sort((a, b) => b.localeCompare(a));

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // To have a streak, the most recent date must be either today or yesterday
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
        return 0;
    }

    let currentDate = new Date(uniqueDates[0]);
    streak = 1;

    for (let i = 1; i < uniqueDates.length; i++) {
        const expectedPreviousDate = new Date(currentDate.getTime() - 86400000);
        const actualPreviousDate = new Date(uniqueDates[i]);

        // Compare ISO strings to avoid timezone issues with Date objects
        if (expectedPreviousDate.toISOString().split('T')[0] === actualPreviousDate.toISOString().split('T')[0]) {
            streak++;
            currentDate = expectedPreviousDate;
        } else {
            break;
        }
    }

    return streak;
}
