export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort dates in descending order (newest first)
    const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];

    // Check if streak is broken (not completed today or yesterday)
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
        return 0;
    }

    let currentDate = sortedDates[0];
    streak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
        const expectedPreviousDate = new Date(new Date(currentDate).setDate(new Date(currentDate).getDate() - 1)).toISOString().split('T')[0];

        if (sortedDates[i] === expectedPreviousDate) {
            streak++;
            currentDate = expectedPreviousDate;
        } else {
            break;
        }
    }

    return streak;
}
