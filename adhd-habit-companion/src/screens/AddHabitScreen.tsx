import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type AddHabitScreenRouteProp = RouteProp<RootStackParamList, 'AddHabit'>;

export default function AddHabitScreen() {
  const { habits, addHabit, updateHabit, refresh } = useHabits();
  const navigation = useNavigation();
  const route = useRoute<AddHabitScreenRouteProp>();

  const habitId = route.params?.habitId;
  const isEditing = !!habitId;

  const [title, setTitle] = useState('');
  const [isBundled, setIsBundled] = useState(false);
  const [bundledTask, setBundledTask] = useState('');
  const [frequency, setFrequency] = useState<'daily' | 'weekly'>('daily');

  useEffect(() => {
      if (isEditing && habits.length > 0 && !title) {
          const habitToEdit = habits.find(h => h.id === habitId);
          if (habitToEdit) {
              setTitle(habitToEdit.title);
              setIsBundled(habitToEdit.isBundled);
              setBundledTask(habitToEdit.bundledTask || '');
              setFrequency(habitToEdit.frequency);
          }
      }
  }, [isEditing, habitId, habits, title]);

  useEffect(() => {
      refresh(); // Ensure we have the latest habits when we mount
  }, [refresh]);

  const handleSave = async () => {
      if (!title.trim()) return;

      if (isEditing) {
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
                <Text style={styles.title}>{isEditing ? 'Edit Habit' : 'New Habit'}</Text>
                <TouchableOpacity accessibilityRole="button" accessibilityLabel="Close" onPress={() => navigation.goBack()}>
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

                <View style={styles.switchRow}>
                    <View>
                        <Text style={styles.label}>Frequency</Text>
                        <Text style={styles.hint}>Daily or weekly goal?</Text>
                    </View>
                    <View style={styles.frequencyTabs}>
                        <TouchableOpacity
                            accessibilityRole="button"
                            style={[styles.freqTab, frequency === 'daily' && styles.freqTabActive]}
                            onPress={() => setFrequency('daily')}
                        >
                            <Text style={[styles.freqTabText, frequency === 'daily' && styles.freqTabTextActive]}>Daily</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            accessibilityRole="button"
                            style={[styles.freqTab, frequency === 'weekly' && styles.freqTabActive]}
                            onPress={() => setFrequency('weekly')}
                        >
                            <Text style={[styles.freqTabText, frequency === 'weekly' && styles.freqTabTextActive]}>Weekly</Text>
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

                <TouchableOpacity accessibilityRole="button" style={styles.saveBtn} onPress={handleSave}>
                    <Text style={styles.saveBtnText}>{isEditing ? 'Save Changes' : 'Create Habit'}</Text>
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
    switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
    hint: { color: COLORS.textSecondary, fontSize: 14 },
    frequencyTabs: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: 8, borderWidth: 1, borderColor: COLORS.border, overflow: 'hidden' },
    freqTab: { paddingVertical: 6, paddingHorizontal: 12 },
    freqTabActive: { backgroundColor: COLORS.secondary },
    freqTabText: { color: COLORS.textSecondary, fontWeight: '500' },
    freqTabTextActive: { color: '#FFF' },
    bundledInputContainer: { marginTop: 8 },
    saveBtn: {
        backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 24,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8
    },
    saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
