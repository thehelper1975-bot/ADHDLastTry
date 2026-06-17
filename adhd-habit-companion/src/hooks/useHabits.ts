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
        const parsed: Habit[] = JSON.parse(json);
        const updated = parsed.map(h => ({
            ...h,
            streak: calculateStreak(h.completedDates)
        }));
        setHabits(updated);
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
    const updated = [...habits, newHabit];
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, [habits]);

  const updateHabit = useCallback(async (id: string, updates: Partial<Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>>) => {
    const updated = habits.map(h => {
        if (h.id === id) {
            return { ...h, ...updates };
        }
        return h;
    });
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, [habits]);

  const toggleHabitCompletion = useCallback(async (id: string, date: string) => {
    const updated = habits.map(h => {
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
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, [habits]);

  const deleteHabit = useCallback(async (id: string) => {
      const updated = habits.filter(h => h.id !== id);
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, [habits]);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};

