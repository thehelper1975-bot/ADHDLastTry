import { EnergyLevel, DopamineMenuParam } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a favorite song",
        "Stretch for 2 minutes",
        "Look out the window for a minute"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Go for a short walk",
        "Read one chapter of a book",
        "Call a friend for 5 minutes",
        "Make a quick healthy snack"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 15-minute workout",
        "Organize your desk",
        "Start a new creative project",
        "Run an errand you've been putting off"
    ]
};
