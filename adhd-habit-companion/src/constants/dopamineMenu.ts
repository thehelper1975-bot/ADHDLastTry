import { DopamineMenuParam, EnergyLevel } from '../types';

export const DOPAMINE_MENU: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to one favorite song",
        "Step outside for 2 minutes",
        "Stretch your arms and neck"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Read one page of a book",
        "Make a quick cup of tea or coffee",
        "Organize your desk for 3 minutes",
        "Message a friend"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 10-minute quick workout",
        "Brainstorm a new project idea",
        "Clean one small area (e.g., a counter)",
        "Dance to an upbeat song"
    ]
};
