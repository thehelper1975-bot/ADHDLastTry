import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to a favorite song",
    "Look out the window for 2 minutes",
    "Do some gentle stretching",
    "Take 5 deep breaths",
    "Pet an animal (if you have one)",
    "Light a nice smelling candle"
  ],
  balanced: [
    "Do a 5-minute tidy of your workspace",
    "Make a cup of tea or coffee",
    "Read a chapter of a book",
    "Go for a short 10-minute walk",
    "Do a quick puzzle or brain game",
    "Write down 3 things you're grateful for",
    "Message a friend"
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute high-intensity workout",
    "Organize a cluttered drawer",
    "Start a creative project",
    "Cook a new recipe",
    "Call someone you haven't spoken to in a while",
    "Knock out a quick chore like taking out the trash or folding a few shirts"
  ]
};
