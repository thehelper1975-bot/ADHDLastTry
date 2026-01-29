import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CONFIG } from '../constants/config';

interface OnboardingContextType {
  hasCompletedOnboarding: boolean;
  setOnboardingComplete: () => Promise<void>;
  isLoading: boolean;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkOnboarding();
  }, []);

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(CONFIG.ONBOARDING_KEY);
      setHasCompletedOnboarding(value === 'true');
    } catch (e) {
      console.error('Error checking onboarding:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const setOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(CONFIG.ONBOARDING_KEY, 'true');
      setHasCompletedOnboarding(true);
    } catch (e) {
      console.error('Error setting onboarding:', e);
    }
  };

  return (
    <OnboardingContext.Provider value={{
      hasCompletedOnboarding,
      setOnboardingComplete,
      isLoading,
    }}>
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => {
  const context = useContext(OnboardingContext);
  if (!context) throw new Error('useOnboarding must be used within OnboardingProvider');
  return context;
};
