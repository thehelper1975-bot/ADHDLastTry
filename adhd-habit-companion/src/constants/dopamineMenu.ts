import { DopamineMenuParam } from '../types';

export const DOPAMINE_MENU: DopamineMenuParam[] = [
    {
        energy: 'low',
        tasks: [
            "Drink a glass of water",
            "Take 5 deep breaths",
            "Stretch your arms overhead",
            "Listen to one favorite song",
            "Pet a fluffy animal (or look at a picture of one)",
            "Step outside for fresh air",
            "Rub your temples for 30 seconds",
            "Eat a piece of fruit",
            "Write down one thing you're grateful for",
            "Close your eyes and count to 10"
        ]
    },
    {
        energy: 'balanced',
        tasks: [
            "Do 5 minutes of stretching",
            "Tidy up one small surface (e.g., desk, table)",
            "Read 5 pages of a book",
            "Send a nice text to a friend",
            "Do a 3-minute guided meditation",
            "Make a cup of tea or coffee",
            "Water your plants",
            "Write a short to-do list for the next hour",
            "Do 10 jumping jacks",
            "Organize your phone's home screen"
        ]
    },
    {
        energy: 'high',
        tasks: [
            "Tackle that one annoying email",
            "Go for a 15-minute brisk walk or run",
            "Clean the bathroom or kitchen",
            "Call a family member or friend",
            "Work on a hobby project for 20 minutes",
            "Exercise for 20 minutes",
            "Declutter a drawer or closet",
            "Cook a healthy meal",
            "Plan your week ahead",
            "Learn something new (video, article, etc.)"
        ]
    }
];
