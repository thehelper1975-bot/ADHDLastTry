import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';
import { calculateStreak } from '../utils/streakCalculator';

const HABITS_KEY = '@habits_v1';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadHabits = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(HABITS_KEY);
      if (json) {
        const loadedHabits: Habit[] = JSON.parse(json);
        // Recalculate streaks on load
        const updatedHabits = loadedHabits.map(h => ({
          ...h,
          streak: calculateStreak(h.completedDates),
        }));
        setHabits(updatedHabits);
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

  const addHabit = useCallback(async (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    setHabits(currentHabits => {
        const updated = [...currentHabits, newHabit];
        AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
        return updated;
    });
  }, []);

  const updateHabit = useCallback(async (habitId: string, updates: Partial<Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>>) => {
    setHabits(currentHabits => {
      const updated = currentHabits.map(h => {
        if (h.id === habitId) {
          return { ...h, ...updates };
        }
        return h;
      });
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const toggleHabitCompletion = useCallback(async (id: string, date: string) => {
    setHabits(currentHabits => {
      const updated = currentHabits.map(h => {
        if (h.id === id) {
          const isCompleted = h.completedDates.includes(date);
          let newCompletedDates = isCompleted
            ? h.completedDates.filter(d => d !== date)
            : [...h.completedDates, date];

          const newStreak = calculateStreak(newCompletedDates);

          return { ...h, completedDates: newCompletedDates, streak: newStreak };
        }
        return h;
      });
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    setHabits(currentHabits => {
      const updated = currentHabits.filter(h => h.id !== id);
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
