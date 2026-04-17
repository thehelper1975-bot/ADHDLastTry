import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Listen to a favorite song',
    'Take 5 deep breaths',
    'Look out the window for 2 minutes',
    'Pet an animal'
  ],
  balanced: [
    'Do 5 minutes of stretching',
    'Make a quick healthy snack',
    'Read one page of a book',
    'Text a friend',
    'Tidy one small area for 5 minutes'
  ],
  high: [
    'Tackle that one annoying email',
    'Go for a 15-minute walk',
    'Do a 10-minute workout',
    'Start a new hobby project',
    'Organize your workspace'
  ]
};
