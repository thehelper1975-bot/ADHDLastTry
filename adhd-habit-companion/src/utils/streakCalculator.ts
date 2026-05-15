export function calculateStreak(completedDates: string[]): number {
    if (!completedDates || completedDates.length === 0) return 0;

    const dateSet = new Set(completedDates);

    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    const yesterday = new Date();
    yesterday.setUTCDate(yesterday.getUTCDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (!dateSet.has(todayStr) && !dateSet.has(yesterdayStr)) {
        return 0;
    }

    let streak = 0;
    let checkDate = dateSet.has(todayStr) ? new Date(today) : new Date(yesterday);

    while (true) {
        const checkStr = checkDate.toISOString().split('T')[0];
        if (dateSet.has(checkStr)) {
            streak++;
            checkDate.setUTCDate(checkDate.getUTCDate() - 1);
        } else {
            break;
        }
    }

    return streak;
}
