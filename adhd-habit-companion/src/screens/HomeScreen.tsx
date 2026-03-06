import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Battery, Zap, Flame, CheckCircle2 } from 'lucide-react-native';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { DOPAMINE_MENU } from '../constants/dopamineMenu';
import { EnergyLevel } from '../types';

export default function HomeScreen() {
  const { habits, refresh, toggleHabitCompletion } = useHabits();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [energyLevel, setEnergyLevel] = useState<EnergyLevel | null>(null);
  const [currentSuggestion, setCurrentSuggestion] = useState<string>('');

  useFocusEffect(
    useCallback(() => {
        refresh();
    }, [refresh])
  );

  const today = new Date().toISOString().split('T')[0];
  const incompleteHabits = habits.filter(h => !h.completedDates.includes(today));

  const handleEnergyLevelSelect = (level: EnergyLevel) => {
      setEnergyLevel(level);
      const suggestions = DOPAMINE_MENU[level];
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];
      setCurrentSuggestion(randomSuggestion);
  }

  // Calculate current week bounds for weekly completions display
  const getWeekDates = () => {
    const now = new Date();
    const dayOfWeek = now.getDay() || 7; // Treat Sunday as 7 instead of 0
    now.setHours(0,0,0,0);
    const monday = new Date(now.getTime() - (dayOfWeek - 1) * 86400000);
    const sunday = new Date(monday.getTime() + 6 * 86400000);
    return {
        monday: monday.toISOString().split('T')[0],
        sunday: sunday.toISOString().split('T')[0]
    };
  };

  const hasCompletedAnyHabitThisWeek = habits.some(habit => {
      const { monday, sunday } = getWeekDates();
      return habit.completedDates.some(dateStr => dateStr >= monday && dateStr <= sunday);
  });

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.greeting}>Good Morning!</Text>

            {hasCompletedAnyHabitThisWeek && (
                <View style={styles.weeklyWinContainer}>
                    <CheckCircle2 color={COLORS.success} size={20} />
                    <Text style={styles.weeklyWinText}>You've completed a habit this week! Great job keeping momentum.</Text>
                </View>
            )}

            <Text style={styles.subtitle}>What's your energy level right now?</Text>

            <View style={styles.energyContainer}>
                <TouchableOpacity onPress={() => handleEnergyLevelSelect('low')} style={[styles.energyBtn, energyLevel === 'low' && styles.energyBtnActive]}>
                    <Battery size={24} color={energyLevel === 'low' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEnergyLevelSelect('balanced')} style={[styles.energyBtn, energyLevel === 'balanced' && styles.energyBtnActive]}>
                    <Zap size={24} color={energyLevel === 'balanced' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Balanced</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleEnergyLevelSelect('high')} style={[styles.energyBtn, energyLevel === 'high' && styles.energyBtnActive]}>
                    <Flame size={24} color={energyLevel === 'high' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>High</Text>
                </TouchableOpacity>
            </View>

            {energyLevel && currentSuggestion ? (
                <View style={styles.suggestionCard}>
                    <Text style={styles.suggestionTitle}>Dopamine Menu Suggestion</Text>
                    <Text style={styles.suggestionText}>{currentSuggestion}</Text>
                    <TouchableOpacity style={styles.newSuggestionBtn} onPress={() => handleEnergyLevelSelect(energyLevel)}>
                        <Text style={styles.newSuggestionText}>Try another</Text>
                    </TouchableOpacity>
                </View>
            ) : null}

            <View style={styles.sectionHeader}>
                 <Text style={styles.sectionTitle}>Today's Focus</Text>
                 <Text style={styles.countText}>{incompleteHabits.length} left</Text>
            </View>

            {incompleteHabits.length > 0 ? (
                incompleteHabits.slice(0, 3).map(habit => (
                    <View key={habit.id} style={styles.habitCard}>
                        <View style={{flex: 1}}>
                            <Text style={styles.habitTitle}>{habit.title}</Text>
                            {habit.isBundled && <Text style={styles.bundledText}>+ {habit.bundledTask}</Text>}
                        </View>
                        <TouchableOpacity
                            style={styles.doneBtn}
                            onPress={() => toggleHabitCompletion(habit.id, today)}
                        >
                            <Text style={styles.doneBtnText}>Done</Text>
                        </TouchableOpacity>
                    </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>All done for today or no habits set!</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('AddHabit')}>
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
    weeklyWinContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: 12, borderRadius: 12, marginBottom: 24, gap: 12 },
    weeklyWinText: { color: COLORS.success, flex: 1, fontWeight: '500' },
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
    suggestionTitle: { color: COLORS.accent, fontWeight: 'bold', marginBottom: 8 },
    suggestionText: { color: COLORS.text, fontSize: 16, marginBottom: 12 },
    newSuggestionBtn: { alignSelf: 'flex-start' },
    newSuggestionText: { color: COLORS.accent, fontWeight: '600' },
    sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    countText: { color: COLORS.textSecondary },
    habitCard: {
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    habitTitle: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
    bundledText: { color: COLORS.accent, fontSize: 14, marginTop: 4 },
    doneBtn: { backgroundColor: 'rgba(16, 185, 129, 0.2)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
    doneBtnText: { color: COLORS.success, fontWeight: 'bold' },
    emptyState: { padding: 20, alignItems: 'center', backgroundColor: COLORS.surface, borderRadius: 16 },
    emptyText: { color: COLORS.textSecondary, marginBottom: 12 },
    linkText: { color: COLORS.secondary, fontWeight: 'bold', fontSize: 16 }
});
