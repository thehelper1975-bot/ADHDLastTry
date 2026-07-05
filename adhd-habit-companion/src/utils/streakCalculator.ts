export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) {
        return 0;
    }

    // Sort dates descending
    const sortedDates = [...completedDates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    // Check if the latest date is today or yesterday
    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
        return 0; // Streak broken
    }

    let currentStreak = 1;
    for (let i = 0; i < sortedDates.length - 1; i++) {
        const currentDate = new Date(sortedDates[i]);
        const previousDateInArray = new Date(sortedDates[i+1]);

        // Calculate difference in days
        const diffTime = Math.abs(currentDate.getTime() - previousDateInArray.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
            currentStreak++;
        } else if (diffDays === 0) {
            // Same date recorded multiple times, ignore
            continue;
        } else {
            // Gap larger than 1 day
            break;
        }
    }

    return currentStreak;
}
