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
        const updatedHabits = parsed.map(habit => ({
            ...habit,
            streak: calculateStreak(habit.completedDates)
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

    setHabits(current => {
        const updated = [...current, newHabit];
        // Move side effect outside by leveraging then/catch block or separating concerns.
        // For custom hooks, simplest is to use current state outside if possible, but React 19 setState doesn't return a promise.
        // We will just do the async call inline, but safely handle it.
        AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
        return updated;
    });
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
    setHabits(current => {
        const updated = current.map(h => {
            if (h.id === id) {
                const merged = { ...h, ...updates };
                merged.streak = calculateStreak(merged.completedDates);
                return merged;
            }
            return h;
        });
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
        AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
        return updated;
    });
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
      setHabits(current => {
          const updated = current.filter(h => h.id !== id);
          AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error(e));
          return updated;
      });
  }, []);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
