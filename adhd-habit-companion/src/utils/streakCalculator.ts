export function calculateStreak(dates: string[]): number {
  if (!dates || dates.length === 0) return 0;

  const uniqueDates = Array.from(new Set(dates)).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  let streak = 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
      return 0; // Streak is broken
  }

  let expectedDate = uniqueDates[0];
  for (const date of uniqueDates) {
      if (date === expectedDate) {
          streak++;
          // Calculate the next expected previous date
          const prevDate = new Date(new Date(date).getTime() - 24 * 60 * 60 * 1000);
          expectedDate = prevDate.toISOString().split('T')[0];
      } else {
          break;
      }
  }

  return streak;
}
