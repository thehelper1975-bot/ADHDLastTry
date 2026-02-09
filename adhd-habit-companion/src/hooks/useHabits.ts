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
        const parsedHabits: Habit[] = JSON.parse(json);
        // Recalculate streaks on load to ensure they are up to date
        const updatedHabits = parsedHabits.map(h => ({
            ...h,
            streak: calculateStreak(h.completedDates, h.frequency)
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

  const saveHabits = async (newHabits: Habit[]) => {
      setHabits(newHabits);
      try {
        await AsyncStorage.setItem(HABITS_KEY, JSON.stringify(newHabits));
      } catch (e) {
        console.error('Failed to save habits', e);
      }
  };

  const addHabit = async (habit: Omit<Habit, 'id' | 'completedDates' | 'streak' | 'createdAt'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      completedDates: [],
      streak: 0,
      createdAt: new Date().toISOString(),
    };
    const updated = [...habits, newHabit];
    await saveHabits(updated);
  };

  const updateHabit = async (habit: Habit) => {
      const updated = habits.map(h => h.id === habit.id ? habit : h);
      // Recalculate streak for the updated habit just in case properties affecting it changed
      const finalUpdated = updated.map(h => {
          if (h.id === habit.id) {
              return { ...h, streak: calculateStreak(h.completedDates, h.frequency) };
          }
          return h;
      });
      await saveHabits(finalUpdated);
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
    await saveHabits(updated);
  };

  const deleteHabit = async (id: string) => {
      const updated = habits.filter(h => h.id !== id);
      await saveHabits(updated);
  }

  return { habits, isLoading, addHabit, updateHabit, toggleHabitCompletion, deleteHabit, refresh: loadHabits };
};
