import { EnergyLevel, DopamineMenuParam } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to a favorite song",
        "Step outside for fresh air",
        "Stretch for 2 minutes"
    ],
    balanced: [
        "Read one chapter of a book",
        "Do a 10-minute walk",
        "Make a cup of tea or coffee",
        "Call or text a friend",
        "Do a quick tidying up"
    ],
    high: [
        "Tackle an annoying email",
        "Do a 20-minute workout",
        "Work on a hobby project",
        "Organize a room or desk",
        "Learn something new for 15 minutes"
    ]
};
