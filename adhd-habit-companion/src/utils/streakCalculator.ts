export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    // Sort dates in descending order (newest first)
    const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;

    // Use UTC date for today to match how completedDates are stored
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    // The streak only counts if the last completion was either today or yesterday
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
        return 0;
    }

    let currentDate = new Date(sortedDates[0]);

    for (let i = 0; i < sortedDates.length; i++) {
        const dateStr = sortedDates[i];
        const expectedDateStr = currentDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
            streak++;
            // Move currentDate back by one day for the next iteration
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
        } else if (i === 0 && dateStr === todayStr) {
            // First date is today, wait for the next iteration to check yesterday
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
            if(sortedDates[1] !== currentDate.toISOString().split('T')[0]) {
               break;
            }
            streak++;
        }
        else {
            break; // Break the streak if the sequence is broken
        }
    }

    return streak;
}
