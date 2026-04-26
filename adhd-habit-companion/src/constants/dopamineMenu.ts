import { EnergyLevel } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Listen to one favorite song',
    'Step outside for 2 minutes',
    'Do some light stretching',
    'Take 5 deep breaths',
    'Pet an animal'
  ],
  balanced: [
    'Tidy one small surface (like a desk or table)',
    'Read one chapter or an article',
    'Do a 10-minute walk',
    'Text a friend',
    'Make a cup of tea or coffee',
    'Doodle for 5 minutes'
  ],
  high: [
    'Tackle that one annoying email',
    'Do a quick workout',
    'Clean an entire room',
    'Work on a hobby project',
    'Cook a nice meal',
    'Organize your calendar for the week'
  ]
};
