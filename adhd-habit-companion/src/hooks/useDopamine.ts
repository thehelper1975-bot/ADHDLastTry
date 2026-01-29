import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DOPAMINE_KEY = '@dopamine_v1';

export type EnergyLevel = 'low' | 'balanced' | 'high';

export interface DopamineMenu {
  low: string[];
  balanced: string[];
  high: string[];
}

const DEFAULTS: DopamineMenu = {
  low: ["Drink a glass of water", "Take 3 deep breaths", "Stretch for 1 min", "Listen to one song"],
  balanced: ["Do 5 minutes of stretching", "Clear your desk", "Write a to-do list", "Check email for 5 mins"],
  high: ["Tackle that one annoying email", "Go for a run", "Deep clean a room", "Start a big project"]
};

export const useDopamine = () => {
  const [menu, setMenu] = useState<DopamineMenu>(DEFAULTS);
  const [isLoading, setIsLoading] = useState(true);

  const loadMenu = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(DOPAMINE_KEY);
      if (json) {
        setMenu(JSON.parse(json));
      } else {
        // Save defaults if nothing exists
        await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(DEFAULTS));
      }
    } catch (e) {
      console.error('Failed to load dopamine menu', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMenu();
  }, [loadMenu]);

  const addTask = async (level: EnergyLevel, task: string) => {
    try {
      const updated = { ...menu, [level]: [...menu[level], task] };
      setMenu(updated);
      await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to add dopamine task', e);
    }
  };

  const removeTask = async (level: EnergyLevel, index: number) => {
    try {
      const updatedList = menu[level].filter((_, i) => i !== index);
      const updated = { ...menu, [level]: updatedList };
      setMenu(updated);
      await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to remove dopamine task', e);
    }
  };

  const resetDefaults = async () => {
    try {
      setMenu(DEFAULTS);
      await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(DEFAULTS));
    } catch (e) {
      console.error('Failed to reset dopamine defaults', e);
    }
  };

  return { menu, isLoading, addTask, removeTask, resetDefaults };
};
