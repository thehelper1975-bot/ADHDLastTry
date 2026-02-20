import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Do 5 minutes of stretching",
    "Listen to one favorite song",
    "Take 3 deep breaths",
    "Pet your cat/dog",
    "Step outside for fresh air",
    "Doodle on a piece of paper",
    "Text a friend just 'hi'",
    "Watch a funny short video",
    "Organize one small drawer"
  ],
  balanced: [
    "Go for a 15-minute walk",
    "Read 10 pages of a book",
    "Meditate for 10 minutes",
    "Prep a healthy snack",
    "Water your plants",
    "Write down 3 things you're grateful for",
    "Clean your desk",
    "Do a quick workout",
    "Call a family member",
    "Learn a new word"
  ],
  high: [
    "Tackle that one annoying email",
    "Exercise for 30 minutes",
    "Clean the entire kitchen",
    "Start a new hobby project",
    "Plan your week",
    "Cook a full meal",
    "Go for a run",
    "Declutter a room",
    "Work on a passion project",
    "Solve a complex puzzle"
  ]
};

export const getDopamineSuggestion = (level: EnergyLevel): string => {
  const tasks = DOPAMINE_MENU[level];
  const randomIndex = Math.floor(Math.random() * tasks.length);
  return tasks[randomIndex];
};
