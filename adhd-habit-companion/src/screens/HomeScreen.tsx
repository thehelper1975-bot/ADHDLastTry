import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { Battery, Zap, Flame, Edit } from 'lucide-react-native';
import { useHabits } from '../hooks/useHabits';
import { useDopamine } from '../hooks/useDopamine';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function HomeScreen() {
  const { habits } = useHabits();
  const { menuItems } = useDopamine();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [energyLevel, setEnergyLevel] = useState<'low' | 'balanced' | 'high' | null>(null);
  const [suggestion, setSuggestion] = useState<string | null>(null);

  const incompleteHabits = habits.filter(h => {
      const today = new Date().toISOString().split('T')[0];
      return !h.completedDates.includes(today);
  });

  useEffect(() => {
    if (energyLevel) {
        const items = menuItems[energyLevel];
        if (items && items.length > 0) {
            const randomItem = items[Math.floor(Math.random() * items.length)];
            setSuggestion(randomItem);
        } else {
            setSuggestion("No tasks yet! Add some to your menu.");
        }
    } else {
        setSuggestion(null);
    }
  }, [energyLevel, menuItems]);

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.content}>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.subtitle}>What's your energy level right now?</Text>

            <View style={styles.energyContainer}>
                <TouchableOpacity onPress={() => setEnergyLevel('low')} style={[styles.energyBtn, energyLevel === 'low' && styles.energyBtnActive]}>
                    <Battery size={24} color={energyLevel === 'low' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEnergyLevel('balanced')} style={[styles.energyBtn, energyLevel === 'balanced' && styles.energyBtnActive]}>
                    <Zap size={24} color={energyLevel === 'balanced' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>Balanced</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEnergyLevel('high')} style={[styles.energyBtn, energyLevel === 'high' && styles.energyBtnActive]}>
                    <Flame size={24} color={energyLevel === 'high' ? '#FFF' : COLORS.textSecondary} />
                    <Text style={styles.energyText}>High</Text>
                </TouchableOpacity>
            </View>

            {energyLevel && suggestion && (
                <View style={styles.suggestionCard}>
                    <View style={styles.suggestionHeader}>
                        <Text style={styles.suggestionTitle}>Dopamine Menu Suggestion</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('DopamineMenu')}>
                            <Edit size={16} color={COLORS.accent} />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.suggestionText}>{suggestion}</Text>
                </View>
            )}

            <Text style={styles.sectionTitle}>Today's Focus</Text>
            {incompleteHabits.length > 0 ? (
                incompleteHabits.slice(0, 3).map(habit => (
                    <View key={habit.id} style={styles.habitCard}>
                        <Text style={styles.habitTitle}>{habit.title}</Text>
                        {habit.isBundled && <Text style={styles.bundledText}>+ {habit.bundledTask}</Text>}
                    </View>
                ))
            ) : (
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>No habits set for today yet!</Text>
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
    suggestionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
    suggestionTitle: { color: COLORS.accent, fontWeight: 'bold' },
    suggestionText: { color: COLORS.text, fontSize: 16 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
    habitCard: {
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 12,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    habitTitle: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
    bundledText: { color: COLORS.accent, fontSize: 14 },
    emptyState: { padding: 20, alignItems: 'center' },
    emptyText: { color: COLORS.textSecondary, marginBottom: 8 },
    linkText: { color: COLORS.secondary, fontWeight: 'bold' }
});
