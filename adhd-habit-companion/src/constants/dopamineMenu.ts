import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Take 3 deep breaths",
    "Listen to a calming song",
    "Stretch your arms and neck",
    "Close your eyes for 2 minutes",
    "Step outside for some fresh air"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Tidy up your desk",
    "Make a cup of tea or coffee",
    "Write down 3 things you're grateful for",
    "Read a short article",
    "Do 10 squats or pushups"
  ],
  high: [
    "Tackle that one annoying email",
    "Go for a brisk 15-minute walk",
    "Do a 10-minute workout",
    "Clean a room for 15 minutes",
    "Call a friend or family member",
    "Start a new creative project"
  ]
};
