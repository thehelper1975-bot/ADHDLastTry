import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Do 5 minutes of stretching',
    'Listen to a favorite song',
    'Look out the window for 2 minutes'
  ],
  balanced: [
    'Go for a 10-minute walk',
    'Read a chapter of a book',
    'Organize your desk',
    'Call a friend'
  ],
  high: [
    'Tackle that one annoying email',
    'Do a 20-minute workout',
    'Deep clean a room',
    'Start a new creative project'
  ]
};
