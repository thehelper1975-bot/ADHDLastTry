import { DopamineMenuParam } from '../types';

export const DOPAMINE_MENU: DopamineMenuParam[] = [
    {
        energy: 'low',
        tasks: [
            "Drink a glass of water",
            "Take 5 deep breaths",
            "Listen to your favorite song",
            "Stretch your arms above your head",
            "Pet a furry friend",
            "Eat a piece of fruit",
            "Look out the window for 2 minutes",
            "Wash your face"
        ]
    },
    {
        energy: 'balanced',
        tasks: [
            "Do 5 minutes of yoga/stretching",
            "Tidy one small surface",
            "Write down 3 things you're grateful for",
            "Read one chapter or article",
            "Water the plants",
            "Make a cup of tea/coffee",
            "Take a short walk",
            "Text a friend to say hi"
        ]
    },
    {
        energy: 'high',
        tasks: [
            "Tackle that one annoying email",
            "Go for a run or intense workout",
            "Clean the bathroom",
            "Meal prep for the week",
            "Organize your digital files",
            "Work on a passion project for 20 mins",
            "Declutter a closet",
            "Plan your week ahead"
        ]
    }
];
