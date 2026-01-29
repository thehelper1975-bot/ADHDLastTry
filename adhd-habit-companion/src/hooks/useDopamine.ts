import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { EnergyLevel } from '../types';

const DOPAMINE_KEY = '@dopamine_v1';

const DEFAULT_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Do 5 jumping jacks",
    "Take a deep breath",
    "Listen to one favorite song"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Read 2 pages of a book",
    "Declutter one drawer",
    "Write a short journal entry"
  ],
  high: [
    "Tackle that one annoying email",
    "Go for a 20 min run",
    "Work on a passion project for 30 mins",
    "Clean the whole kitchen"
  ]
};

export const useDopamine = () => {
  const [menuItems, setMenuItems] = useState<Record<EnergyLevel, string[]>>(DEFAULT_MENU);
  const [isLoading, setIsLoading] = useState(true);

  const loadDopamineMenu = useCallback(async () => {
    try {
      const json = await AsyncStorage.getItem(DOPAMINE_KEY);
      if (json) {
        setMenuItems(JSON.parse(json));
      } else {
        // Initialize with default if nothing exists
        await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(DEFAULT_MENU));
        setMenuItems(DEFAULT_MENU);
      }
    } catch (e) {
      console.error('Failed to load dopamine menu', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDopamineMenu();
  }, [loadDopamineMenu]);

  const addDopamineItem = async (energy: EnergyLevel, item: string) => {
    if (!item.trim()) return;

    const currentItems = menuItems[energy] || [];
    const updatedItems = [...currentItems, item.trim()];
    const updatedMenu = { ...menuItems, [energy]: updatedItems };

    setMenuItems(updatedMenu);
    await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(updatedMenu));
  };

  const removeDopamineItem = async (energy: EnergyLevel, itemToRemove: string) => {
    const currentItems = menuItems[energy] || [];
    const updatedItems = currentItems.filter(item => item !== itemToRemove);
    const updatedMenu = { ...menuItems, [energy]: updatedItems };

    setMenuItems(updatedMenu);
    await AsyncStorage.setItem(DOPAMINE_KEY, JSON.stringify(updatedMenu));
  };

  return {
    menuItems,
    isLoading,
    addDopamineItem,
    removeDopamineItem,
    refresh: loadDopamineMenu
  };
};
