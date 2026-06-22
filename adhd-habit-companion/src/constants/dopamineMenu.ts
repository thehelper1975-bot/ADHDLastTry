import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a calming song",
        "Step outside for 2 minutes"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Read one chapter of a book",
        "Make a cup of tea or coffee",
        "Write down 3 things you are grateful for"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 10-minute quick workout",
        "Organize your workspace",
        "Go for a brisk walk"
    ]
};
