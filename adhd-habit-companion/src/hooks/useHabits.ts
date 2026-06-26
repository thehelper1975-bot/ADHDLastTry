import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';
import { calculateStreak } from '../utils/streakCalculator';

const HABITS_KEY = '@habits_v1';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const habitsRef = useRef<Habit[]>([]);

  const loadHabits = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(HABITS_KEY);
      if (json) {
        const parsed: Habit[] = JSON.parse(json);
        // Recalculate streaks on load
        const withUpdatedStreaks = parsed.map(h => ({
          ...h,
          streak: calculateStreak(h.completedDates)
        }));
        habitsRef.current = withUpdatedStreaks;
        setHabits(withUpdatedStreaks);
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
    const updated = [...habitsRef.current, newHabit];
    habitsRef.current = updated;
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    const updated = habitsRef.current.map(h => {
      if (h.id === id) {
        return { ...h, ...updates };
      }
      return h;
    });
    habitsRef.current = updated;
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, []);

  const toggleHabitCompletion = useCallback(async (id: string, date: string) => {
    const updated = habitsRef.current.map(h => {
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
    habitsRef.current = updated;
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
      const updated = habitsRef.current.filter(h => h.id !== id);
      habitsRef.current = updated;
      setHabits(updated);
      await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  }, []);

  return {
    habits,
    isLoading,
    addHabit,
    updateHabit,
    toggleHabitCompletion,
    deleteHabit,
    refresh: loadHabits
  };
};
