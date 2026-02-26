import { EnergyLevel } from '../types';

export const DopamineMenu: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Do 5 minutes of stretching",
    "Take 3 deep breaths",
    "Listen to one favorite song",
    "Pet a generic animal (or look at a picture)",
    "Clean one small surface",
    "Write down 3 things you're grateful for",
    "Step outside for fresh air"
  ],
  balanced: [
    "Go for a 15-minute walk",
    "Read a chapter of a book",
    "Organize your desk",
    "Call a friend or family member",
    "Cook a simple meal",
    "Do a quick workout",
    "Learn something new for 10 minutes",
    "Plan your day/week"
  ],
  high: [
    "Tackle that one annoying email",
    "Start a new project",
    "Deep clean a room",
    "Go for a run or intense workout",
    "Learn a complex skill",
    "Brainstorm creative ideas",
    "Declutter your wardrobe",
    "Finish a pending task you've been avoiding"
  ]
};
