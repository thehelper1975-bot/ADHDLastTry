import React, { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { TrendingUp, Award, Calendar } from 'lucide-react-native';

export default function ProgressScreen() {
  const { habits, refresh } = useHabits();

  useFocusEffect(
    useCallback(() => {
      refresh();
    }, [refresh])
  );

  const totalCompletions = habits.reduce((acc, h) => acc + h.completedDates.length, 0);
  const currentLongestStreak = Math.max(0, ...habits.map(h => h.streak));

  // Weekly view placeholder
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Progress</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.statsRow}>
                    <View style={styles.statCard}>
                        <Award color={COLORS.accent} size={32} />
                        <Text style={styles.statValue}>{totalCompletions}</Text>
                        <Text style={styles.statLabel}>Completions</Text>
                    </View>
                    <View style={styles.statCard}>
                        <TrendingUp color={COLORS.secondary} size={32} />
                        <Text style={styles.statValue}>{currentLongestStreak}</Text>
                        <Text style={styles.statLabel}>Best Streak</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Weekly Consistency</Text>
                    <View style={styles.chartContainer}>
                        {days.map((day, index) => (
                            <View key={index} style={styles.barContainer}>
                                <View style={[styles.bar, { height: 40 + Math.random() * 60, backgroundColor: index === 6 ? COLORS.primary : COLORS.surface }]} />
                                <Text style={styles.dayLabel}>{day}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                <View style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Did you know?</Text>
                    <Text style={styles.infoText}>Non-linear progress is still progress. Missing a day doesn't reset your brain's growth!</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { padding: 20 },
    title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
    content: { padding: 20 },
    statsRow: { flexDirection: 'row', gap: 16, marginBottom: 32 },
    statCard: {
        flex: 1, backgroundColor: COLORS.surface, padding: 20, borderRadius: 16,
        alignItems: 'center', borderWidth: 1, borderColor: COLORS.border
    },
    statValue: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, marginVertical: 8 },
    statLabel: { color: COLORS.textSecondary },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 20, fontWeight: 'bold', color: COLORS.text, marginBottom: 16 },
    chartContainer: { flexDirection: 'row', justifyContent: 'space-between', height: 150, alignItems: 'flex-end' },
    barContainer: { alignItems: 'center', gap: 8 },
    bar: { width: 30, borderRadius: 8 },
    dayLabel: { color: COLORS.textSecondary },
    infoCard: { backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: 16, borderRadius: 12, borderLeftWidth: 4, borderLeftColor: COLORS.secondary },
    infoTitle: { color: COLORS.secondary, fontWeight: 'bold', marginBottom: 4 },
    infoText: { color: COLORS.text, lineHeight: 22 }
});
