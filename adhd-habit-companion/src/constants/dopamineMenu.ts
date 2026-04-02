import { EnergyLevel, DopamineMenuParam } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Listen to a favorite song',
    'Look out the window for 2 minutes',
    'Do 5 deep breaths',
    'Wash your face'
  ],
  balanced: [
    'Do 5 minutes of stretching',
    'Read a chapter of a book',
    'Make a cup of tea or coffee',
    'Tidy up a small area for 5 mins',
    'Listen to a short podcast episode'
  ],
  high: [
    'Tackle that one annoying email',
    'Go for a 15-minute walk or run',
    'Do a 10-minute home workout',
    'Organize your desk completely',
    'Start a creative project'
  ]
};
