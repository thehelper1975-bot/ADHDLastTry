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
        let loadedHabits: Habit[] = JSON.parse(json);

        // Recalculate streaks to ensure data is fresh (e.g. if day changed)
        let needsUpdate = false;
        loadedHabits = loadedHabits.map(h => {
             const freshStreak = calculateStreak(h.completedDates);
             if (freshStreak !== h.streak) {
                 needsUpdate = true;
                 return { ...h, streak: freshStreak };
             }
             return h;
        });

        setHabits(loadedHabits);

        if (needsUpdate) {
             await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(loadedHabits));
        }
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
      streak: 0, // calculateStreak([]) is 0
      createdAt: new Date().toISOString(),
    };
    const updated = [...habits, newHabit];
    setHabits(updated);
    await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(updated));
  };

  const updateHabit = async (updatedHabit: Habit) => {
      // Recalculate streak just in case
      const freshStreak = calculateStreak(updatedHabit.completedDates);
      const habitToSave = { ...updatedHabit, streak: freshStreak };

      const updated = habits.map(h => h.id === habitToSave.id ? habitToSave : h);
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

        const newStreak = calculateStreak(newCompletedDates);

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

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
