import { calculateStreak } from '../streakCalculator';

describe('calculateStreak', () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
  const twoDaysAgoStr = twoDaysAgo.toISOString().split('T')[0];

  describe('daily frequency', () => {
    it('returns 0 for empty dates', () => {
      expect(calculateStreak([], 'daily')).toBe(0);
    });

    it('returns 1 if completed today', () => {
      expect(calculateStreak([todayStr], 'daily')).toBe(1);
    });

    it('returns 1 if completed yesterday', () => {
      expect(calculateStreak([yesterdayStr], 'daily')).toBe(1);
    });

    it('returns 0 if last completed 2 days ago', () => {
      expect(calculateStreak([twoDaysAgoStr], 'daily')).toBe(0);
    });

    it('calculates consecutive days correctly (completed today)', () => {
      expect(calculateStreak([todayStr, yesterdayStr], 'daily')).toBe(2);
    });

    it('calculates consecutive days correctly (completed yesterday)', () => {
      expect(calculateStreak([yesterdayStr, twoDaysAgoStr], 'daily')).toBe(2);
    });

    it('breaks streak on gap', () => {
       const fourDaysAgo = new Date(today);
       fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);
       const fourDaysAgoStr = fourDaysAgo.toISOString().split('T')[0];

       // today, yesterday, GAP, 4daysAgo
       expect(calculateStreak([todayStr, yesterdayStr, fourDaysAgoStr], 'daily')).toBe(2);
    });
  });

  describe('weekly frequency', () => {
     // Helper to get date string for X weeks ago
     const getWeekDate = (weeksAgo: number) => {
         const d = new Date(today);
         d.setDate(d.getDate() - (weeksAgo * 7));
         return d.toISOString().split('T')[0];
     };

     it('returns 1 if completed this week', () => {
         expect(calculateStreak([todayStr], 'weekly')).toBe(1);
     });

     it('returns 1 if completed last week', () => {
         const lastWeek = getWeekDate(1);
         expect(calculateStreak([lastWeek], 'weekly')).toBe(1);
     });

     it('returns 2 if completed this week and last week', () => {
         const lastWeek = getWeekDate(1);
         expect(calculateStreak([todayStr, lastWeek], 'weekly')).toBe(2);
     });

      it('returns 0 if last completed 2 weeks ago', () => {
         const twoWeeksAgo = getWeekDate(2);
         expect(calculateStreak([twoWeeksAgo], 'weekly')).toBe(0);
     });

     it('handles multiple entries in same week', () => {
         const lastWeek1 = getWeekDate(1);
         const d = new Date(lastWeek1);
         d.setDate(d.getDate() + 1); // another day in same week
         const lastWeek2 = d.toISOString().split('T')[0];

         expect(calculateStreak([todayStr, lastWeek1, lastWeek2], 'weekly')).toBe(2);
     });
  });
});
