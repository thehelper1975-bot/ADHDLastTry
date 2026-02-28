import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Listen to a favorite song',
    'Do 5 deep breaths',
    'Step outside for 2 minutes',
    'Stretch your arms and neck',
    'Cuddle a pet (or a pillow)',
  ],
  balanced: [
    'Make a cup of tea or coffee',
    'Do a 5-minute tidy of your workspace',
    'Read one page of a book',
    'Text a friend',
    'Listen to a short podcast episode',
    'Do some light yoga',
  ],
  high: [
    'Tackle that one annoying email',
    'Go for a brisk walk or run',
    'Do a 10-minute workout',
    'Organize a messy drawer',
    'Work on a creative project',
    'Dance to an upbeat playlist',
  ],
};
