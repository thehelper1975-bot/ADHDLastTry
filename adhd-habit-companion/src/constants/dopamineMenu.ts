export type EnergyLevel = 'low' | 'balanced' | 'high';

export const dopamineMenu: Record<EnergyLevel, string[]> = {
  low: [
    'Drink a glass of water',
    'Listen to a favorite song',
    'Look out the window for 2 minutes',
    'Pet an animal (if you have one)',
    'Take 5 deep breaths',
    'Read one page of a book',
  ],
  balanced: [
    'Do 5 minutes of stretching',
    'Make a quick snack',
    'Message a friend',
    'Doodle or draw for 10 minutes',
    'Do a 5-minute declutter of one surface',
    'Walk around the block',
  ],
  high: [
    'Tackle that one annoying email',
    'Do a 15-minute workout',
    'Organize a whole drawer or closet',
    'Start a creative project',
    'Call someone you haven\'t talked to in a while',
    'Learn a new small skill online',
  ],
};
