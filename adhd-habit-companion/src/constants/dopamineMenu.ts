import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Look out the window for 2 minutes",
    "Do some gentle neck stretches",
    "Close eyes and take 5 deep breaths"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Make a cup of tea or coffee",
    "Read 5 pages of a book",
    "Tidy up one small area (e.g., a desk)",
    "Text a friend to say hi"
  ],
  high: [
    "Tackle that one annoying email",
    "Go for a brisk 15-minute walk",
    "Do a quick 10-minute workout",
    "Organize a closet or drawer",
    "Start a new creative project"
  ]
};
