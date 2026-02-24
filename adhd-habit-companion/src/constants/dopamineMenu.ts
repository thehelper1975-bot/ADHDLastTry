import { EnergyLevel } from '../types';

export const DOPAMINE_MENU_ITEMS: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Stretch for 2 minutes",
        "Take 5 deep breaths",
        "Listen to one favorite song",
        "Look out the window",
        "Eat a piece of fruit",
        "Put away one item",
        "Wash your face"
    ],
    balanced: [
        "Go for a 10-minute walk",
        "Read 5 pages of a book",
        "Reply to one message",
        "Declutter your desk",
        "Do a quick workout",
        "Meditate for 5 minutes",
        "Make a cup of tea",
        "Write down 3 things you're grateful for"
    ],
    high: [
        "Tackle that one annoying email",
        "Clean the kitchen",
        "Exercise for 30 minutes",
        "Work on a hobby project",
        "Plan your week",
        "Call a friend",
        "Learn something new",
        "Cook a healthy meal"
    ]
};
