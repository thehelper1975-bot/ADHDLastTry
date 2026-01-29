import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type AddHabitRouteProp = RouteProp<RootStackParamList, 'AddHabit'>;

export default function AddHabitScreen() {
  const { habits, addHabit, updateHabit } = useHabits();
  const navigation = useNavigation();
  const route = useRoute<AddHabitRouteProp>();
  const habitId = route.params?.habitId;

  const [title, setTitle] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');
  const [isBundled, setIsBundled] = useState(false);
  const [bundledTask, setBundledTask] = useState('');

  useEffect(() => {
    if (habitId) {
      const existing = habits.find(h => h.id === habitId);
      if (existing) {
        setTitle(existing.title);
        setFrequency(existing.frequency);
        setIsBundled(existing.isBundled);
        setBundledTask(existing.bundledTask || '');
      }
    }
  }, [habitId, habits]);

  const handleSave = async () => {
      if (!title.trim()) return;

      const habitData = {
          title,
          isBundled,
          bundledTask: isBundled ? bundledTask : undefined,
          frequency
      };

      if (habitId) {
        await updateHabit(habitId, habitData);
      } else {
        await addHabit(habitData);
      }

      navigation.goBack();
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>{habitId ? 'Edit Habit' : 'New Habit'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()}>
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

                <Text style={styles.label}>Frequency</Text>
                <View style={styles.frequencyRow}>
                    <TouchableOpacity
                        style={[styles.frequencyBtn, frequency === 'daily' && styles.frequencyBtnActive]}
                        onPress={() => setFrequency('daily')}
                    >
                        <Text style={[styles.frequencyText, frequency === 'daily' && styles.frequencyTextActive]}>Daily</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.frequencyBtn, frequency === 'weekly' && styles.frequencyBtnActive]}
                        onPress={() => setFrequency('weekly')}
                    >
                        <Text style={[styles.frequencyText, frequency === 'weekly' && styles.frequencyTextActive]}>Weekly</Text>
                    </TouchableOpacity>
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

                <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>{habitId ? 'Update Habit' : 'Create Habit'}</Text>
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
    frequencyRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
    frequencyBtn: {
        flex: 1, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border,
        alignItems: 'center', backgroundColor: COLORS.surface
    },
    frequencyBtnActive: { borderColor: COLORS.secondary, backgroundColor: 'rgba(59, 130, 246, 0.2)' },
    frequencyText: { color: COLORS.textSecondary, fontWeight: '600' },
    frequencyTextActive: { color: COLORS.secondary },
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    hint: { color: COLORS.textSecondary, fontSize: 14 },
    bundledInputContainer: { marginTop: 8 },
    saveBtn: {
        backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 24,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8
    },
    saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
