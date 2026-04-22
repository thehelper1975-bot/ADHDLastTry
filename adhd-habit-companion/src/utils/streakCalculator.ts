export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    // Sort dates in descending order
    const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);

    const lastCompletedDateStr = sortedDates[0];
    const lastCompletedDate = new Date(lastCompletedDateStr);
    lastCompletedDate.setUTCHours(0, 0, 0, 0);

    // Check if the habit was completed today or yesterday
    if (lastCompletedDate.getTime() !== today.getTime() && lastCompletedDate.getTime() !== yesterday.getTime()) {
        return 0;
    }

    let currentDate = lastCompletedDate;

    for (const dateStr of sortedDates) {
        const d = new Date(dateStr);
        d.setUTCHours(0, 0, 0, 0);

        if (d.getTime() === currentDate.getTime()) {
            streak++;
            currentDate.setUTCDate(currentDate.getUTCDate() - 1);
        } else if (d.getTime() < currentDate.getTime()) {
            break; // Gap in streak
        }
    }

    return streak;
}
