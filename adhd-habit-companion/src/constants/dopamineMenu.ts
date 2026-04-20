import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a favorite song",
        "Step outside for a moment",
        "Rest your eyes for 2 minutes"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Tidy up your desk",
        "Read a chapter of a book",
        "Make a cup of tea or coffee",
        "Text a friend"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 10-minute workout",
        "Organize a room",
        "Start a new project",
        "Go for a brisk walk"
    ]
};
