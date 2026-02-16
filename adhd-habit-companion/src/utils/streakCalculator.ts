export const calculateStreak = (completedDates: string[]): number => {
    if (!completedDates || completedDates.length === 0) return 0;

    // Unique and sort dates in descending order (newest first)
    const uniqueDates = Array.from(new Set(completedDates));
    const sortedDates = uniqueDates.sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    if (sortedDates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    // Check if the streak is active (completed today or yesterday)
    // If the last completion was before yesterday, the streak is broken (0).
    const lastCompleted = sortedDates[0];
    if (lastCompleted !== today && lastCompleted !== yesterday) {
        return 0;
    }

    let streak = 0;
    // We start checking from the last completed date backwards
    let checkDate = new Date(lastCompleted);

    for (const dateStr of sortedDates) {
        const expectedDateStr = checkDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
            streak++;
            // Move checkDate to previous day
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // Gap found, streak ends
            break;
        }
    }

    return streak;
};
