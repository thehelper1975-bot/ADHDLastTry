import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Do 5 minutes of stretching",
    "Put away one item",
    "Deep breathe for 1 minute",
    "Step outside for fresh air",
    "Write down one thing you're grateful for",
    "Watch a short funny video",
    "Listen to one favorite song"
  ],
  balanced: [
    "Tackle that one annoying email",
    "Do a 10-minute tidy up",
    "Read a few pages of a book",
    "Plan your next meal",
    "Text a friend back",
    "Review your calendar for tomorrow",
    "Organize your desk",
    "Do a quick workout"
  ],
  high: [
    "Work on a passion project for 30 mins",
    "Go for a run or long walk",
    "Deep clean a room",
    "Learn something new (tutorial/article)",
    "Meal prep for the week",
    "Brainstorm ideas for a big goal",
    "Call a family member",
    "Start a new hobby"
  ]
};
