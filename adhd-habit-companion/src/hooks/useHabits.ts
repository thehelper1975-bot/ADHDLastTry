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
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  };

  const toggleHabitCompletion = async (id: string, date: string) => {
    const updated = habits.map(h => {
      if (h.id === id) {
        const isCompleted = h.completedDates.includes(date);
        let newCompletedDates = isCompleted
          ? h.completedDates.filter(d => d !== date)
          : [...h.completedDates, date];

        const newStreak = calculateStreak(newCompletedDates, h.frequency);

        return { ...h, completedDates: newCompletedDates, streak: newStreak };
      }
      return h;
    });
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  };

  const deleteHabit = async (id: string) => {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }

  return { habits, isLoading, addHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};

function calculateStreak(dates: string[], frequency: 'daily' | 'weekly' = 'daily'): number {
  if (dates.length === 0) return 0;

  const sortedDates = [...dates].sort((a, b) => new Date(b).getTime() - new Date(a).getTime());

  if (frequency === 'daily') {
    let streak = 1;
    let currentDate = new Date(sortedDates[0]);

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = new Date(sortedDates[i]);
      // Calculate difference in days
      const diffTime = currentDate.getTime() - prevDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        streak++;
        currentDate = prevDate;
      } else if (diffDays === 0) {
        continue;
      } else {
        break;
      }
    }
    return streak;
  } else {
    // Weekly
    const getMondayTimestamp = (dateStr: string) => {
        const d = new Date(dateStr);
        const day = d.getUTCDay(); // 0=Sun, 1=Mon...
        const diff = d.getUTCDate() - day + (day === 0 ? -6 : 1);
        d.setUTCDate(diff);
        d.setUTCHours(0, 0, 0, 0);
        return d.getTime();
    };

    const uniqueMondays = Array.from(new Set(sortedDates.map(getMondayTimestamp)))
        .sort((a, b) => b - a);

    let streak = 1;
    let current = uniqueMondays[0];

    for (let i = 1; i < uniqueMondays.length; i++) {
        const prev = uniqueMondays[i];
        const diff = (current - prev) / (1000 * 60 * 60 * 24);
        if (Math.round(diff) === 7) {
            streak++;
            current = prev;
        } else {
            break;
        }
    }
    return streak;
  }
}
