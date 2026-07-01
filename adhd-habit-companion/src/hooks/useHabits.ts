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
        let parsed = JSON.parse(json) as Habit[];
        parsed = parsed.map(h => ({
          ...h,
          streak: calculateStreak(h.completedDates)
        }));
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

  const addHabit = useCallback(async (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    setHabits(current => {
      const updated = [...current, newHabit];
      habitsRef.current = updated;
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
      return updated;
    });
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>>) => {
    setHabits(current => {
      const updated = current.map(h => h.id === id ? { ...h, ...updates } : h);
      habitsRef.current = updated;
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
      return updated;
    });
  }, []);

  const toggleHabitCompletion = useCallback(async (id: string, date: string) => {
    setHabits(current => {
      const updated = current.map(h => {
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
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
      return updated;
    });
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
    setHabits(current => {
      const updated = current.filter(h => h.id !== id);
      habitsRef.current = updated;
      AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
      return updated;
    });
  }, []);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
