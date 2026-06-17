export function calculateStreak(dates: string[]): number {
    if (!dates || dates.length === 0) return 0;

    // Sort dates in descending order (newest first)
    const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

    let streak = 0;
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    // Check if the streak is currently active
    if (sortedDates[0] !== today && sortedDates[0] !== yesterday) {
        return 0; // Streak broken
    }

    let currentDate = new Date(sortedDates[0]);

    for (const dateStr of sortedDates) {
        const d = new Date(dateStr);
        if (d.getTime() === currentDate.getTime() || (streak === 0 && (dateStr === today || dateStr === yesterday))) {
             streak++;
             currentDate = new Date(d.getTime() - 86400000); // Move to previous day
        } else if (d.getTime() < currentDate.getTime()) {
             break; // Gap found
        }
    }

    return streak;
}
