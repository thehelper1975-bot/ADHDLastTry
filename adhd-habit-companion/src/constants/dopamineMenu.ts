import { EnergyLevel } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Take 5 deep breaths",
    "Look out the window for a minute",
    "Do a simple stretch"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Make a cup of tea or coffee",
    "Read a short article",
    "Message a friend",
    "Take a short walk"
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 10-minute quick workout",
    "Organize one small area (e.g., a drawer)",
    "Plan your meals for the week",
    "Learn something new for 15 minutes"
  ]
};
