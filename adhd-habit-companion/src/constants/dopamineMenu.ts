import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a favorite song",
        "Step outside for 2 minutes",
        "Pet an animal"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Read one chapter of a book",
        "Make a cup of tea or coffee",
        "Text a friend",
        "Organize one small surface"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 15-minute workout",
        "Clean a whole room",
        "Work on a hobby project",
        "Plan your week"
    ]
};
