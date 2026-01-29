export interface Habit {
  id: string;
  title: string;
  description?: string;
  frequency: 'daily' | 'weekly';
  completedDates: string[]; // ISO date strings YYYY-MM-DD
  isBundled: boolean;
  bundledTask?: string; // The fun task linked to this
  streak: number;
  createdAt: string;
}

export type EnergyLevel = 'low' | 'balanced' | 'high';

export interface DopamineMenuParam {
    energy: EnergyLevel;
    tasks: string[];
}
