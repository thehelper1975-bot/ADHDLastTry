import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Battery, Zap, Flame } from 'lucide-react-native';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DOPAMINE_MENU } from '../constants/dopamineMenu';
import { EnergyLevel } from '../types';

export default function HomeScreen() {
  const { habits, refresh } = useHabits();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [currentSuggestion, setCurrentSuggestion] = useState<string | null>(null);

  useFocusEffect(
      useCallback(() => {
          refresh();
      }, [refresh])
  );

  const getWeekStart = (date: Date) => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday
      return new Date(d.setDate(diff)).toISOString().split('T')[0];
  };

  const incompleteHabits = habits.filter(h => {
      const today = new Date().toISOString().split('T')[0];

      if (h.frequency === 'weekly') {
          const currentWeekStart = getWeekStart(new Date());
          const isCompletedThisWeek = h.completedDates.some(d => {
              const completedDateStr = new Date(d).toISOString().split('T')[0];
              return completedDateStr >= currentWeekStart && completedDateStr <= today;
          });
          return !isCompletedThisWeek;
      }

      return !h.completedDates.includes(today);
  });

  const handleEnergySelection = (level: EnergyLevel) => {
      setEnergyLevel(level);
      const suggestions = DOPAMINE_MENU[level];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setCurrentSuggestion(randomSuggestion);
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.subtitle}>What's your energy level right now?</Text>

            <View style={styles.energyContainer}>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Low energy" onPress={() => handleEnergySelection('low')} style={[styles.energyBtn, energyLevel === 'low' && styles.energyBtnActive]}>
                    <Battery size={24} color={energyLevel === 'low' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Balanced energy" onPress={() => handleEnergySelection('balanced')} style={[styles.energyBtn, energyLevel === 'balanced' && styles.energyBtnActive]}>
                    <Zap size={24} color={energyLevel === 'balanced' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Balanced</Text>
                </TouchableOpacity>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="High energy" onPress={() => handleEnergySelection('high')} style={[styles.energyBtn, energyLevel === 'high' && styles.energyBtnActive]}>
                    <Flame size={24} color={energyLevel === 'high' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>High</Text>
                </TouchableOpacity>
            </View>

            {energyLevel && currentSuggestion && (
                <View style={styles.suggestionCard}>
                    <Text style={styles.suggestionTitle}>Dopamine Menu Suggestion</Text>
                    <Text style={styles.suggestionText}>{currentSuggestion}</Text>
                </View>
            )}

            <Text style={styles.sectionTitle}>Today's Focus</Text>
            {incompleteHabits.length > 0 ? (
                incompleteHabits.slice(0, 3).map(habit => (
                    <View key={habit.id} style={styles.habitCard}>
                        <View>
                            <Text style={styles.habitTitle}>{habit.title}</Text>
                            {habit.isBundled && <Text style={styles.bundledText}>+ {habit.bundledTask}</Text>}
                        </View>
                        <Text style={styles.habitFreq}>{habit.frequency}</Text>
                    </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No habits set for today yet!</Text>
                    <TouchableOpacity accessibilityRole="button" onPress={() => navigation.navigate('AddHabit')}>
                        <Text style={styles.linkText}>Add a habit</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    content: { padding: 20 },
    greeting: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: COLORS.textSecondary, marginBottom: 24 },
    energyContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
    energyBtn: {
        flex: 1, alignItems: 'center', padding: 16, margin: 4,
        backgroundColor: COLORS.surface, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border
    },
    energyBtnActive: { borderColor: COLORS.secondary, backgroundColor: 'rgba(59, 130, 246, 0.2)' },
    energyText: { color: COLORS.text, marginTop: 8, fontWeight: '600' },
    suggestionCard: {
        backgroundColor: 'rgba(245, 158, 11, 0.1)', padding: 16, borderRadius: 12, marginBottom: 32,
        borderLeftWidth: 4, borderLeftColor: COLORS.accent
    },
    suggestionTitle: { color: COLORS.accent, fontWeight: 'bold', marginBottom: 4 },
    suggestionText: { color: COLORS.text, fontSize: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
    habitCard: {
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    habitTitle: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
    bundledText: { color: COLORS.accent, fontSize: 14 },
    habitFreq: { color: COLORS.textSecondary, fontSize: 12, textTransform: 'capitalize' },
    emptyState: { padding: 20, alignItems: 'center' },
    emptyText: { color: COLORS.textSecondary, marginBottom: 8 },
    linkText: { color: COLORS.secondary, fontWeight: 'bold' }
});
