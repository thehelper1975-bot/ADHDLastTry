import { DopamineMenuParam, EnergyLevel } from '../types';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
    low: [
        "Drink a glass of water",
        "Take 5 deep breaths",
        "Listen to one favorite song",
        "Step outside for 2 minutes",
        "Stretch your arms and neck"
    ],
    balanced: [
        "Do 5 minutes of stretching or yoga",
        "Read one page of a book",
        "Organize one small surface (e.g., a desk corner)",
        "Make a quick cup of tea or coffee",
        "Write down 3 things you are grateful for"
    ],
    high: [
        "Tackle that one annoying email",
        "Do a 15-minute quick workout",
        "Clean a room for 10 minutes",
        "Brain dump all your pending tasks",
        "Start that project you've been putting off"
    ]
};
