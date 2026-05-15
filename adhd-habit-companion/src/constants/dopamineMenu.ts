import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a favorite song",
        "Stretch for 2 minutes",
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Go for a short walk",
        "Read a chapter of a book",
        "Tidy up your desk",
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 15-minute workout",
        "Start a new project",
        "Clean the whole room",
    ]
};
