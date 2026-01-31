import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { OnboardingProvider } from './src/contexts/OnboardingContext';
import { SubscriptionProvider } from './src/contexts/SubscriptionContext';
import { DopamineProvider } from './src/contexts/DopamineContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <SubscriptionProvider>
            <OnboardingProvider>
                <DopamineProvider>
                    <AppNavigator />
                </DopamineProvider>
            </OnboardingProvider>
        </SubscriptionProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
