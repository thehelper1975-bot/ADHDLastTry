import { EnergyLevel } from '../types';

export interface DopamineActivity {
    id: string;
    title: string;
    energyLevel: EnergyLevel;
}

export const DOPAMINE_MENU_ITEMS: DopamineActivity[] = [
    // Low Energy
    { id: '1', title: 'Drink a glass of water', energyLevel: 'low' },
    { id: '2', title: 'Take 3 deep breaths', energyLevel: 'low' },
    { id: '3', title: 'Listen to one favorite song', energyLevel: 'low' },
    { id: '4', title: 'Look at a photo that makes you smile', energyLevel: 'low' },
    { id: '5', title: 'Stretch your arms overhead', energyLevel: 'low' },

    // Balanced Energy
    { id: '6', title: 'Do 5 minutes of stretching', energyLevel: 'balanced' },
    { id: '7', title: 'Read 2 pages of a book', energyLevel: 'balanced' },
    { id: '8', title: 'Clear one surface (desk/table)', energyLevel: 'balanced' },
    { id: '9', title: 'Write down 3 things you are grateful for', energyLevel: 'balanced' },
    { id: '10', title: 'Go for a 5-minute walk', energyLevel: 'balanced' },

    // High Energy
    { id: '11', title: 'Tackle that one annoying email', energyLevel: 'high' },
    { id: '12', title: 'Exercise for 15 minutes', energyLevel: 'high' },
    { id: '13', title: 'Meal prep for tomorrow', energyLevel: 'high' },
    { id: '14', title: 'Clean the bathroom', energyLevel: 'high' },
    { id: '15', title: 'Organize a drawer', energyLevel: 'high' },
];
