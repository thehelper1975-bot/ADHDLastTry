import { DopamineMenuParam, EnergyLevel } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Step outside for 2 minutes",
        "Listen to a favorite song",
        "Pet a dog or cat (if nearby!)"
    ],
    balanced: [
        "Do 5 minutes of stretching",
        "Read one chapter of a book",
        "Text a friend to say hi",
        "Make a cup of tea or coffee",
        "Organize your desk for 5 minutes"
    ],
    high: [
        "Tackle that one annoying email",
        "Go for a 15-minute walk/run",
        "Do 20 jumping jacks",
        "Clean out the fridge",
        "Call someone you haven't spoken to in a while"
    ]
};
