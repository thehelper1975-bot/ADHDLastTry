import { EnergyLevel, DopamineMenuParam } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
  low: [
    "Drink a glass of water",
    "Listen to one favorite song",
    "Close your eyes and take 5 deep breaths",
    "Step outside for a breath of fresh air",
    "Do a 2-minute brain dump",
    "Pet an animal or hug a pillow",
  ],
  balanced: [
    "Do 5 minutes of stretching",
    "Make a cup of tea or coffee",
    "Organize one small area (like a desk corner)",
    "Read 5 pages of a book",
    "Write down 3 things you're grateful for",
    "Do a quick 10-minute walk",
  ],
  high: [
    "Tackle that one annoying email",
    "Do a 15-minute quick workout",
    "Clean the kitchen counters",
    "Start that project you've been putting off",
    "Call a friend or family member",
    "Dance to a high-energy playlist",
  ],
};
