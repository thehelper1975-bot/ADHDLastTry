export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    // Sort dates in descending order (newest first)
    const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date();
    // Normalize today to start of day UTC
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));

    const firstDate = new Date(sortedDates[0]);
    const firstDateUTC = new Date(Date.UTC(firstDate.getUTCFullYear(), firstDate.getUTCMonth(), firstDate.getUTCDate()));

    const diffTime = todayUTC.getTime() - firstDateUTC.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
        // More than a day gap from the most recent completion, streak is broken
        return 0;
    }

    // Start checking consecutive days backwards
    let expectedDateUTC = new Date(firstDateUTC);

    for (const dateStr of sortedDates) {
        const d = new Date(dateStr);
        const dUTC = new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));

        if (dUTC.getTime() === expectedDateUTC.getTime()) {
            streak++;
            // Move expected date back one day
            expectedDateUTC.setUTCDate(expectedDateUTC.getUTCDate() - 1);
        } else if (dUTC.getTime() < expectedDateUTC.getTime()) {
            // Found a gap, stop calculating
            break;
        }
        // If dUTC > expectedDateUTC, it's a duplicate or invalid sorted order, ignore for streak calculation
    }

    return streak;
}
