import { DopamineMenuParam, EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Step outside for 2 minutes",
    "Do 5 deep breaths",
    "Stretch your arms and back",
  ],
  balanced: [
    "Read 5 pages of a book",
    "Make a cup of tea or coffee",
    "Tidy one small surface (e.g., desk)",
    "Call or text a friend",
    "Do a 5-minute meditation",
  ],
  high: [
    "Go for a 15-minute walk or run",
    "Tackle that one annoying email",
    "Do a quick 10-minute workout",
    "Organize a closet or drawer",
    "Learn something new for 15 mins",
  ]
};
