import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Habit } from '../types';

type AddHabitRouteProp = RouteProp<RootStackParamList, 'AddHabit'>;

export default function AddHabitScreen() {
  const { addHabit, updateHabit, habits } = useHabits();
  const navigation = useNavigation();
  const route = useRoute<AddHabitRouteProp>();
  const habitId = route.params?.habitId;

  const [title, setTitle] = useState('');
  const [isBundled, setIsBundled] = useState(false);
  const [bundledTask, setBundledTask] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
      if (habitId && !isInitialized && habits.length > 0) {
          const existing = habits.find((h: Habit) => h.id === habitId);
          if (existing) {
              setTitle(existing.title);
              setIsBundled(existing.isBundled);
              setBundledTask(existing.bundledTask || '');
              setFrequency(existing.frequency);
              setIsInitialized(true);
          }
      }
  }, [habitId, habits, isInitialized]);

  const handleSave = async () => {
      if (!title.trim()) return;

      if (habitId) {
          await updateHabit(habitId, {
              title,
              isBundled,
              bundledTask: isBundled ? bundledTask : undefined,
              frequency
          });
      } else {
          await addHabit({
              title,
              isBundled,
              bundledTask: isBundled ? bundledTask : undefined,
              frequency
          });
      }

      navigation.goBack();
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>{habitId ? 'Edit Habit' : 'New Habit'}</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    accessibilityRole="button"
                    accessibilityLabel="Close"
                >
                    <X size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <Text style={styles.label}>Habit Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="e.g., Floss teeth"
                    placeholderTextColor={COLORS.textSecondary}
                    value={title}
                    onChangeText={setTitle}
                    autoFocus
                />

                <View style={styles.frequencyContainer}>
                    <Text style={styles.label}>Frequency</Text>
                    <View style={styles.frequencyButtons}>
                        <TouchableOpacity
                            style={[styles.freqBtn, frequency === 'daily' && styles.freqBtnActive]}
                            onPress={() => setFrequency('daily')}
                            accessibilityRole="button"
                            accessibilityLabel="Daily frequency"
                        >
                            <Text style={[styles.freqBtnText, frequency === 'daily' && styles.freqBtnTextActive]}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.freqBtn, frequency === 'weekly' && styles.freqBtnActive]}
                            onPress={() => setFrequency('weekly')}
                            accessibilityRole="button"
                            accessibilityLabel="Weekly frequency"
                        >
                            <Text style={[styles.freqBtnText, frequency === 'weekly' && styles.freqBtnTextActive]}>Weekly</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.switchRow}>
                    <View>
                        <Text style={styles.label}>Habit Bundling</Text>
                        <Text style={styles.hint}>Pair with something you enjoy</Text>
                    </View>
                    <Switch
                        value={isBundled}
                        onValueChange={setIsBundled}
                        trackColor={{ false: COLORS.surface, true: COLORS.secondary }}
                        thumbColor="#FFF"
                        accessibilityRole="switch"
                        accessibilityLabel="Enable habit bundling"
                    />
                </View>

                {isBundled && (
                    <View style={styles.bundledInputContainer}>
                        <Text style={styles.label}>Link with...</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="e.g., Listening to podcast"
                            placeholderTextColor={COLORS.textSecondary}
                            value={bundledTask}
                            onChangeText={setBundledTask}
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    accessibilityRole="button"
                    accessibilityLabel={habitId ? "Save Changes" : "Create Habit"}
                >
                    <Text style={styles.saveBtnText}>{habitId ? 'Save Changes' : 'Create Habit'}</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
    form: { padding: 20 },
    label: { color: COLORS.text, fontSize: 16, fontWeight: '600', marginBottom: 8 },
    input: {
        backgroundColor: COLORS.surface, color: COLORS.text, padding: 16, borderRadius: 12,
        fontSize: 16, marginBottom: 24, borderWidth: 1, borderColor: COLORS.border
    },
    frequencyContainer: { marginBottom: 24 },
    frequencyButtons: { flexDirection: 'row', gap: 12, marginTop: 8 },
    freqBtn: {
        flex: 1, padding: 12, borderRadius: 12, borderWidth: 1, borderColor: COLORS.border,
        alignItems: 'center', backgroundColor: COLORS.surface
    },
    freqBtnActive: { borderColor: COLORS.secondary, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    freqBtnText: { color: COLORS.textSecondary, fontWeight: '600' },
    freqBtnTextActive: { color: COLORS.secondary },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    hint: { color: COLORS.textSecondary, fontSize: 14 },
    bundledInputContainer: { marginTop: 8 },
    saveBtn: {
        backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 24,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8
    },
    saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
