import { EnergyLevel } from '../types';

export const DOPAMINE_MENU_ITEMS: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Stretch for 2 minutes",
    "Take 3 deep breaths",
    "Listen to one favorite song",
    "Do a 1-minute plank",
    "Look out the window",
    "Pet your cat/dog",
    "Clean one tiny surface",
    "Eat a piece of fruit",
    "Check your posture"
  ],
  balanced: [
    "Go for a 10-minute walk",
    "Read 5 pages of a book",
    "Reply to one message",
    "Do 10 jumping jacks",
    "Write down 3 things you're grateful for",
    "Organize your desk",
    "Make a cup of tea/coffee",
    "Sketch or doodle for 5 mins",
    "Water the plants",
    "Listen to a podcast episode"
  ],
  high: [
    "Tackle that one annoying email",
    "Clean the kitchen",
    "Go for a run or workout",
    "Plan your week ahead",
    "Declutter a drawer",
    "Call a friend or family member",
    "Cook a healthy meal",
    "Start a new project",
    "Deep clean the bathroom",
    "Learn something new (video/article)"
  ]
};
