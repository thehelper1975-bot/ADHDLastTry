import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a calming song",
    "Look out the window for 2 minutes",
    "Do 3 deep breaths",
    "Pet an animal"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Go for a short walk",
    "Read a chapter of a book",
    "Make a cup of tea or coffee",
    "Write down 3 things you're grateful for"
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute workout",
    "Declutter your desk",
    "Call a friend",
    "Start a new hobby project"
  ]
};
