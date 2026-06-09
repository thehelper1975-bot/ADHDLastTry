import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Do 5 minutes of deep breathing',
    'Listen to a calming song',
    'Stretch your arms and legs',
    'Look out the window for 2 minutes'
  ],
  balanced: [
    'Take a 10 minute walk',
    'Do 5 minutes of stretching',
    'Read a chapter of a book',
    'Make a cup of tea or coffee',
    'Listen to an upbeat podcast'
  ],
  high: [
    'Tackle that one annoying email',
    'Do a 15-minute workout',
    'Clean off your desk',
    'Brainstorm new ideas for a project',
    'Call a friend or family member'
  ]
};
