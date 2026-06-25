import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Habit } from '../types';
import { calculateStreak } from '../utils/streakCalculator';

const HABITS_KEY = '@habits_v1';

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const habitsRef = useRef<Habit[]>(habits);

  const loadHabits = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(HABITS_KEY);
      if (json) {
        const parsed = JSON.parse(json);
        setHabits(parsed);
        habitsRef.current = parsed;
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

  const saveHabits = async (newHabits: Habit[]) => {
    setHabits(newHabits);
    habitsRef.current = newHabits;
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(newHabits));
  };

  const addHabit = useCallback(async (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [...habitsRef.current, newHabit];
    await saveHabits(updated);
  }, []);

  const updateHabit = useCallback(async (id: string, habitUpdate: Partial<Habit>) => {
    const updated = habitsRef.current.map(h => h.id === id ? { ...h, ...habitUpdate } : h);
    await saveHabits(updated);
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
    await saveHabits(updated);
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    const updated = habitsRef.current.filter(h => h.id !== id);
    await saveHabits(updated);
  }, []);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
