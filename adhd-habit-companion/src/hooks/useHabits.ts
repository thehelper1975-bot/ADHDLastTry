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
        AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error('Failed to save habit', e));
        return updated;
    });
  }, []);

  const updateHabit = useCallback(async (id: string, updates: Partial<Habit>) => {
      setHabits(currentHabits => {
          const updated = currentHabits.map(h => h.id === id ? { ...h, ...updates } : h);
          AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error('Failed to update habit', e));
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

        AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error('Failed to update habit completion', e));
        return updated;
      });
  }, []);

  const deleteHabit = useCallback(async (id: string) => {
      setHabits(currentHabits => {
          const updated = currentHabits.filter(h => h.id !== id);
          AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated)).catch(e => console.error('Failed to delete habit', e));
          return updated;
      });
  }, []);

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
