import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Do deep breathing for 1 minute",
    "Look out the window for 2 minutes",
    "Stretch your arms and legs",
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Go for a short walk around the block",
    "Text a friend to say hi",
    "Organize one small area (e.g., your desk)",
    "Read a few pages of a book",
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute workout",
    "Clean the kitchen",
    "Work on a creative hobby",
    "Run an errand you've been putting off",
  ],
};
