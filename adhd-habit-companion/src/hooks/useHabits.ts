import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';

const HABITS_KEY = '@habits_v1';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHabits = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(HABITS_KEY);
      if (json) {
        setHabits(JSON.parse(json));
      }
    } catch (e) {
      console.error('Failed to load habits', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadHabits();
  }, [loadHabits]);

  const addHabit = async (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    try {
      const newHabit: Habit = {
        ...habit,
        id: Math.random().toString(36).substring(2, 9),
        completedDates: [],
        streak: 0,
        createdAt: new Date().toISOString(),
      };
      const updated = [...habits, newHabit];
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add habit', e);
    }
  };

  const updateHabit = async (id: string, updates: Partial<Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>>) => {
    try {
      const updated = habits.map(h => {
        if (h.id === id) {
          return { ...h, ...updates };
        }
        return h;
      });
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to update habit', e);
    }
  };

  const toggleHabitCompletion = async (id: string, date: string) => {
    try {
      const updated = habits.map(h => {
        if (h.id === id) {
          const isCompleted = h.completedDates.includes(date);
          let newCompletedDates = isCompleted
            ? h.completedDates.filter(d => d !== date)
            : [...h.completedDates, date];

          const newStreak = calculateStreak(newCompletedDates, h.frequency || 'daily');

          return { ...h, completedDates: newCompletedDates, streak: newStreak };
        }
        return h;
      });
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to toggle habit', e);
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to delete habit', e);
    }
  }

  const getWeeklyHistory = () => {
    // Returns array of 7 integers (completion counts for last 7 days, ending today)
    const history = [];
    const today = new Date();

    // We want 7 days, let's say Mon-Sun or just last 7 days.
    // The design usually implies M-T-W-T-F-S-S or similar.
    // Let's do last 7 days relative to today for simplicity and ensuring non-zero data if recently active.

    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];

      const count = habits.filter(h => h.completedDates.includes(dateStr)).length;
      history.push(count);
    }
    return history;
  }

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits, getWeeklyHistory };
};

function getMonday(d: Date) {
  const date = new Date(d);
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
  date.setDate(diff);
  date.setHours(0,0,0,0);
  return date;
}

function calculateStreak(dates: string[], frequency: 'daily' | 'weekly'): number {
  if (!dates || dates.length === 0) return 0;

  // Sort dates descending
  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (frequency === 'daily') {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

      const lastCompletion = sortedDates[0];
      if (lastCompletion !== today && lastCompletion !== yesterday) {
        return 0;
      }

      let streak = 0;
      let currentDate = new Date(lastCompletion);

      for (const dateStr of sortedDates) {
        const expectedDateStr = currentDate.toISOString().split('T')[0];

        if (dateStr === expectedDateStr) {
          streak++;
          currentDate.setDate(currentDate.getDate() - 1);
        } else {
          break;
        }
      }
      return streak;
  } else {
      // Weekly logic
      // Check if last completion was this week or last week
      const lastCompletion = new Date(sortedDates[0]);
      const lastCompletionMonday = getMonday(lastCompletion);
      const thisMonday = getMonday(new Date());
      const lastWeekMonday = new Date(thisMonday);
      lastWeekMonday.setDate(lastWeekMonday.getDate() - 7);

      if (lastCompletionMonday.getTime() < lastWeekMonday.getTime()) {
          return 0;
      }

      let streak = 0;
      // We need to count unique consecutive weeks
      // Iterate dates, convert to week mondays, dedup, count consecutive

      let currentMondayToCheck = lastCompletionMonday;
      let uniqueWeeks = new Set<number>();

      // Build set of completion weeks (timestamps)
      for (const d of sortedDates) {
          uniqueWeeks.add(getMonday(new Date(d)).getTime());
      }

      while (uniqueWeeks.has(currentMondayToCheck.getTime())) {
          streak++;
          currentMondayToCheck.setDate(currentMondayToCheck.getDate() - 7);
      }

      return streak;
  }
}
