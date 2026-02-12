import { getLocalTodayDate } from './dateUtils';

export const calculateStreak = (completedDates: string[]): number => {
    if (!completedDates || completedDates.length === 0) return 0;

    const uniqueDates = [...new Set(completedDates)];
    const sortedDates = uniqueDates.sort((a, b) => b.localeCompare(a)); // Descending

    const today = getLocalTodayDate();

    // Calculate yesterday local
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yYear = yesterdayDate.getFullYear();
    const yMonth = String(yesterdayDate.getMonth() + 1).padStart(2, '0');
    const yDay = String(yesterdayDate.getDate()).padStart(2, '0');
    const yesterday = `${yYear}-${yMonth}-${yDay}`;

    const lastCompleted = sortedDates[0];

    // If the last completion was not today or yesterday, streak is broken
    // Streak is 0 unless last completion is today or yesterday
    if (lastCompleted !== today && lastCompleted !== yesterday) {
        return 0;
    }

    let streak = 0;
    // Start counting from the last completed date backwards
    // Note: Date parsing "YYYY-MM-DD" is generally safe in JS as UTC but we want local interpretation.
    // However, since we construct the date string manually from getFullYear etc, we are consistent.
    // But wait, new Date("YYYY-MM-DD") is parsed as UTC midnight.
    // new Date(year, monthIndex, day) is local time.
    // We should parse the string manually to avoid timezone issues when stepping back.

    let [currentYear, currentMonth, currentDay] = lastCompleted.split('-').map(Number);
    let currentCheckDate = new Date(currentYear, currentMonth - 1, currentDay);

    const datesSet = new Set(uniqueDates);

    while (true) {
        const year = currentCheckDate.getFullYear();
        const month = String(currentCheckDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentCheckDate.getDate()).padStart(2, '0');
        const dateStr = `${year}-${month}-${day}`;

        if (datesSet.has(dateStr)) {
            streak++;
            currentCheckDate.setDate(currentCheckDate.getDate() - 1);
        } else {
            break;
        }
    }

    return streak;
};
