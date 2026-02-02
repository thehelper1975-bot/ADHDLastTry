import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';

// Mock dependencies
jest.mock('expo-linear-gradient', () => ({
  LinearGradient: ({ children }: any) => children,
}));

jest.mock('lucide-react-native', () => {
  const MockIcon = () => null;
  return {
    Battery: MockIcon,
    Zap: MockIcon,
    Flame: MockIcon,
  };
});

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

const mockHabits = [
  { id: '1', title: 'Drink Water', completedDates: [], isBundled: false },
];

jest.mock('../../hooks/useHabits', () => ({
  useHabits: () => ({
    habits: mockHabits,
  }),
}));

describe('HomeScreen', () => {
  it('renders correctly', () => {
    const { getByText, getByLabelText } = render(<HomeScreen />);
    expect(getByText('Good Morning!')).toBeTruthy();
    expect(getByText("What's your energy level right now?")).toBeTruthy();
    expect(getByText('Drink Water')).toBeTruthy();

    // Verify accessibility labels
    expect(getByLabelText('Low Energy Level')).toBeTruthy();
    expect(getByLabelText('Balanced Energy Level')).toBeTruthy();
    expect(getByLabelText('High Energy Level')).toBeTruthy();
  });

  it('shows dopamine suggestion when energy level is selected', () => {
    const { getByText, getByLabelText } = render(<HomeScreen />);
    const lowBtn = getByLabelText('Low Energy Level');

    fireEvent.press(lowBtn);

    expect(getByText('Dopamine Menu Suggestion')).toBeTruthy();
    expect(getByText('Drink a glass of water')).toBeTruthy();
  });
});
