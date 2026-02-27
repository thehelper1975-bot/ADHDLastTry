import { EnergyLevel } from '../types';

export const DopamineMenu: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Step outside for fresh air",
    "Listen to one favorite song",
    "Do 5 minutes of stretching",
    "Pet a furry friend",
    "Take 3 deep breaths",
    "Wash your face",
    "Eat a piece of fruit"
  ],
  balanced: [
    "Tidy one small area (desk/drawer)",
    "Read 10 pages of a book",
    "Do a quick workout (10-15 mins)",
    "Call a friend or family member",
    "Write down 3 things you're grateful for",
    "Plan your meals for the day",
    "Meditate for 10 minutes",
    "Learn something new (video/article)"
  ],
  high: [
    "Tackle that one annoying email",
    "Deep clean a room",
    "Go for a long run or intense workout",
    "Start a new creative project",
    "Organize your digital files",
    "Cook a complex meal",
    "Plan your week in detail",
    "Learn a new skill (practice coding/instrument)"
  ]
};
