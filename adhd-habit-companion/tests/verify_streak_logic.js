function calculateStreak(dates) {
    if (!dates || dates.length === 0) return 0;

    const today = new Date().toISOString().split('T')[0];
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = yesterdayDate.toISOString().split('T')[0];

    // Remove duplicates and sort descending
    const uniqueDates = [...new Set(dates)].sort((a, b) => b.localeCompare(a));

    let currentStreak = 0;
    let checkDate = today;

    // Check if streak is active (completed today or yesterday)
    if (uniqueDates.includes(today)) {
        currentStreak = 1;
        checkDate = today;
    } else if (uniqueDates.includes(yesterday)) {
        currentStreak = 1;
        checkDate = yesterday;
    } else {
        return 0;
    }

    // Count backwards
    while (true) {
        const d = new Date(checkDate);
        d.setDate(d.getDate() - 1);
        const prevDate = d.toISOString().split('T')[0];

        if (uniqueDates.includes(prevDate)) {
            currentStreak++;
            checkDate = prevDate;
        } else {
            break;
        }
    }

    return currentStreak;
}

// Tests
console.log("Running Streak Calculation Tests...");

const today = new Date().toISOString().split('T')[0];
const d = new Date();
d.setDate(d.getDate() - 1);
const yesterday = d.toISOString().split('T')[0];
d.setDate(d.getDate() - 1);
const twoDaysAgo = d.toISOString().split('T')[0];
d.setDate(d.getDate() - 1);
const threeDaysAgo = d.toISOString().split('T')[0];

const testCases = [
    { dates: [], expected: 0, name: "Empty dates" },
    { dates: [today], expected: 1, name: "Today only" },
    { dates: [yesterday], expected: 1, name: "Yesterday only (grace period)" },
    { dates: [twoDaysAgo], expected: 0, name: "Two days ago (broken)" },
    { dates: [today, yesterday], expected: 2, name: "Today + Yesterday" },
    { dates: [today, twoDaysAgo], expected: 1, name: "Today + gap (streak 1)" },
    { dates: [yesterday, twoDaysAgo], expected: 2, name: "Yesterday + Two days ago" },
    { dates: [today, yesterday, twoDaysAgo], expected: 3, name: "3 day streak" },
    { dates: [today, yesterday, threeDaysAgo], expected: 2, name: "Gap at 3rd day" },
    { dates: [today, today, yesterday], expected: 2, name: "Duplicates" },
];

let failed = false;
testCases.forEach(tc => {
    const result = calculateStreak(tc.dates);
    if (result !== tc.expected) {
        console.error(`FAILED: ${tc.name}. Expected ${tc.expected}, got ${result}`);
        failed = true;
    } else {
        console.log(`PASSED: ${tc.name}`);
    }
});

if (failed) {
    console.error("Some tests failed.");
    process.exit(1);
} else {
    console.log("All tests passed!");
}
