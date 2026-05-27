import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Take 5 deep breaths",
    "Look out the window for 1 minute",
    "Stretch your arms and neck"
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Read one chapter of a book",
    "Go for a short walk",
    "Make a cup of tea or coffee",
    "Write down 3 things you are grateful for"
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute workout",
    "Clean off your desk",
    "Call a friend or family member",
    "Start a new project or hobby"
  ]
};
