function calculateStreak(completedDates) {
  if (!completedDates || completedDates.length === 0) return 0;

  // Sort dates descending (newest first)
  const sortedDates = [...completedDates].sort((a, b) => b.localeCompare(a));

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // If the habit hasn't been completed today or yesterday, the streak is 0
  if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
    return 0;
  }

  let streak = 1;
  let currentDate = new Date(sortedDates[0]);

  for (let i = 1; i < sortedDates.length; i++) {
    const prevDate = new Date(currentDate);
    prevDate.setUTCDate(prevDate.getUTCDate() - 1);
    const prevDateStr = prevDate.toISOString().split('T')[0];

    if (sortedDates[i] === prevDateStr) {
      streak++;
      currentDate = new Date(sortedDates[i]);
    } else {
      break;
    }
  }

  return streak;
}

function runTests() {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date();
  yesterday.setUTCDate(yesterday.getUTCDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const dayBeforeYesterday = new Date();
  dayBeforeYesterday.setUTCDate(dayBeforeYesterday.getUTCDate() - 2);
  const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split('T')[0];

  const threeDaysAgo = new Date();
  threeDaysAgo.setUTCDate(threeDaysAgo.getUTCDate() - 3);
  const threeDaysAgoStr = threeDaysAgo.toISOString().split('T')[0];

  console.log('Testing calculateStreak...');

  // Test 1: Empty dates
  let result = calculateStreak([]);
  console.log(`Test 1 (Empty): ${result === 0 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 2: Only today
  result = calculateStreak([todayStr]);
  console.log(`Test 2 (Today only): ${result === 1 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 3: Only yesterday (grace period)
  result = calculateStreak([yesterdayStr]);
  console.log(`Test 3 (Yesterday only): ${result === 1 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 4: Broken streak
  result = calculateStreak([threeDaysAgoStr, dayBeforeYesterdayStr]);
  console.log(`Test 4 (Broken streak): ${result === 0 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 5: Today and yesterday
  result = calculateStreak([todayStr, yesterdayStr]);
  console.log(`Test 5 (Today & Yesterday): ${result === 2 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 6: Today, yesterday, and 3 days ago (gap)
  result = calculateStreak([todayStr, yesterdayStr, threeDaysAgoStr]);
  console.log(`Test 6 (Gap): ${result === 2 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 7: 3 days streak ending yesterday
  result = calculateStreak([yesterdayStr, dayBeforeYesterdayStr, threeDaysAgoStr]);
  console.log(`Test 7 (3 days ending yesterday): ${result === 3 ? 'PASS' : `FAIL (Got ${result})`}`);

  // Test 8: Unsorted input
  result = calculateStreak([yesterdayStr, todayStr]);
  console.log(`Test 8 (Unsorted): ${result === 2 ? 'PASS' : `FAIL (Got ${result})`}`);
}

runTests();
