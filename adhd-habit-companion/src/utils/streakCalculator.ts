export const calculateStreak = (dates: string[]): number => {
    if (!dates || dates.length === 0) return 0;

    // Sort dates descending
    const sorted = [...new Set(dates)].sort((a, b) => {
        if (a > b) return -1;
        if (a < b) return 1;
        return 0;
    });

    let streak = 0;
    const todayStr = new Date().toISOString().split('T')[0];

    const yesterdayDate = new Date(todayStr);
    yesterdayDate.setUTCDate(yesterdayDate.getUTCDate() - 1);
    const yesterdayStr = yesterdayDate.toISOString().split('T')[0];

    if (sorted[0] !== todayStr && sorted[0] !== yesterdayStr) {
        return 0; // Streak broken
    }

    let currentCheckDate = new Date(sorted[0]);

    for (let i = 0; i < sorted.length; i++) {
        const dateStr = sorted[i];
        const expectedDateStr = currentCheckDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
            streak++;
            currentCheckDate.setUTCDate(currentCheckDate.getUTCDate() - 1);
        } else {
            break;
        }
    }

    return streak;
};
