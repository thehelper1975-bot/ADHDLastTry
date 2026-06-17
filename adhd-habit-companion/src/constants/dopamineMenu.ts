import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to one favorite song",
    "Close your eyes for 2 minutes",
    "Take 3 deep breaths",
    "Step outside for fresh air"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Make a quick healthy snack",
    "Read 5 pages of a book",
    "Text a friend to say hi",
    "Organize your desk for 5 mins"
  ],
  high: [
    "Tackle that one annoying email",
    "Go for a 15-minute walk",
    "Do a 10-minute workout",
    "Brainstorm a new project",
    "Declutter one small area"
  ]
};
