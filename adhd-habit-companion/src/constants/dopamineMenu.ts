import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of cold water",
    "Do 2 minutes of deep breathing",
    "Listen to one favorite song",
    "Stretch your arms and legs",
    "Look out the window for 5 minutes",
    "Eat a small healthy snack"
  ],
  balanced: [
    "Do 5 minutes of light stretching",
    "Take a short 10-minute walk",
    "Read a chapter of a book",
    "Do a quick doodle or sketch",
    "Listen to a short podcast episode",
    "Organize your desk for 5 minutes"
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute quick workout",
    "Declutter a small area or drawer",
    "Start a new creative project",
    "Call a friend or family member",
    "Dance to a few high-energy songs"
  ]
};
