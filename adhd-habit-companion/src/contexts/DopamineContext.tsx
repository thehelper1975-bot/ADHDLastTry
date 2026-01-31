import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';
import { EnergyLevel } from '../types';

export interface DopamineMenuData {
  low: string[];
  balanced: string[];
  high: string[];
}

interface DopamineContextType {
  menuItems: DopamineMenuData;
  addItem: (level: EnergyLevel, task: string) => Promise<void>;
  removeItem: (level: EnergyLevel, index: number) => Promise<void>;
  editItem: (level: EnergyLevel, index: number, newTask: string) => Promise<void>;
  isLoading: boolean;
}

const DopamineContext = createContext<DopamineContextType | undefined>(undefined);

const DEFAULT_MENU: DopamineMenuData = {
  low: ["Drink a glass of water", "Take 3 deep breaths", "Stretch for 1 minute", "Listen to one favorite song"],
  balanced: ["Do 5 minutes of yoga", "Read 2 pages of a book", "Water the plants", "Make a cup of tea", "Quick tidy up"],
  high: ["Tackle that one annoying email", "Clean your desk", "Go for a 15-minute run", "Meal prep for tomorrow", "Plan your week"]
};

export const DopamineProvider = ({ children }: { children: ReactNode }) => {
  const [menuItems, setMenuItems] = useState<DopamineMenuData>(DEFAULT_MENU);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMenu();
  }, []);

  const loadMenu = async () => {
    try {
      const stored = await AsyncStorage.getItem(CONFIG.DOPAMINE_MENU_KEY);
      if (stored) {
        setMenuItems(JSON.parse(stored));
      } else {
        // If nothing stored, stick with defaults
      }
    } catch (e) {
      console.error('Failed to load dopamine menu:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveMenu = async (newMenu: DopamineMenuData) => {
    try {
      setMenuItems(newMenu);
      await AsyncStorage.setItem(CONFIG.DOPAMINE_MENU_KEY, JSON.stringify(newMenu));
    } catch (e) {
      console.error('Failed to save dopamine menu:', e);
    }
  };

  const addItem = async (level: EnergyLevel, task: string) => {
    if (!task.trim()) return;
    const newMenu = { ...menuItems, [level]: [...menuItems[level], task] };
    await saveMenu(newMenu);
  };

  const removeItem = async (level: EnergyLevel, index: number) => {
    const newLevelItems = [...menuItems[level]];
    newLevelItems.splice(index, 1);
    const newMenu = { ...menuItems, [level]: newLevelItems };
    await saveMenu(newMenu);
  };

  const editItem = async (level: EnergyLevel, index: number, newTask: string) => {
    if (!newTask.trim()) return;
    const newLevelItems = [...menuItems[level]];
    newLevelItems[index] = newTask;
    const newMenu = { ...menuItems, [level]: newLevelItems };
    await saveMenu(newMenu);
  };

  return (
    <DopamineContext.Provider value={{
      menuItems,
      addItem,
      removeItem,
      editItem,
      isLoading,
    }}>
      {children}
    </DopamineContext.Provider>
  );
};

export const useDopamineContext = () => {
    const context = useContext(DopamineContext);
    if (!context) throw new Error('useDopamineContext must be used within DopamineProvider');
    return context;
}
