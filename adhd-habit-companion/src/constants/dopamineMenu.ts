import { EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to one favorite song",
        "Rest your eyes for 2 minutes",
        "Do a quick body scan"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Tidy one small surface",
        "Text a friend",
        "Make a cup of tea or coffee",
        "Step outside for fresh air"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 10-minute quick workout",
        "Declutter a drawer",
        "Start a creative project",
        "Run an errand you've been putting off"
    ]
};
