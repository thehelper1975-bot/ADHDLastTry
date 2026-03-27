import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Close your eyes for 2 minutes",
    "Listen to a favorite song",
    "Do some gentle neck rolls",
    "Watch a short funny video",
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Make a cup of tea or coffee",
    "Step outside for some fresh air",
    "Text a friend to say hi",
    "Tidy off one surface (e.g., desk)",
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 10-minute quick workout",
    "Organize a small area",
    "Dance to an upbeat song",
    "Start a task you've been putting off",
  ],
};
