import { getTodayDate, getYesterdayDate } from './dateUtils';

export const calculateStreak = (completedDates: string[]): number => {
    if (!completedDates || completedDates.length === 0) return 0;

    // Remove duplicates and sort descending
    const uniqueDates = Array.from(new Set(completedDates)).sort((a, b) => {
        return new Date(b).getTime() - new Date(a).getTime();
    });

    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    // Check if the streak is active (completed today or yesterday)
    const lastCompleted = uniqueDates[0];
    if (lastCompleted !== today && lastCompleted !== yesterday) {
        return 0;
    }

    let streak = 0;

    let expectedDate = new Date(uniqueDates[0]);

    for (let i = 0; i < uniqueDates.length; i++) {
        const dateStr = uniqueDates[i];
        const date = new Date(dateStr);

        // Compare dates (ignoring time component, which dateStr handles since it's YYYY-MM-DD)
        const d1 = date.toISOString().split('T')[0];
        const d2 = expectedDate.toISOString().split('T')[0];

        if (d1 === d2) {
            streak++;
            // Move expected date back by 1 day using UTC methods to avoid timezone shifts
            expectedDate.setUTCDate(expectedDate.getUTCDate() - 1);
        } else {
            // Gap found, streak ends
            break;
        }
    }

    return streak;
};
