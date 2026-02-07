import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Switch, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { X } from 'lucide-react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function AddHabitScreen() {
  const { addHabit, updateHabit, habits } = useHabits();
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AddHabit'>>();

  const habitId = route.params?.habitId;
  const existingHabit = habitId ? habits.find(h => h.id === habitId) : undefined;

  const [title, setTitle] = useState(existingHabit?.title || '');
  const [isBundled, setIsBundled] = useState(existingHabit?.isBundled || false);
  const [bundledTask, setBundledTask] = useState(existingHabit?.bundledTask || '');

  useEffect(() => {
    if (existingHabit) {
      setTitle(existingHabit.title);
      setIsBundled(existingHabit.isBundled);
      setBundledTask(existingHabit.bundledTask || '');
    }
  }, [existingHabit]);

  const handleSave = async () => {
      if (!title.trim()) return;

      if (existingHabit) {
          await updateHabit({
              ...existingHabit,
              title,
              isBundled,
              bundledTask: isBundled ? bundledTask : undefined,
          });
      } else {
          await addHabit({
              title,
              isBundled,
              bundledTask: isBundled ? bundledTask : undefined,
              frequency: 'daily'
          });
      }

      navigation.goBack();
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>{existingHabit ? 'Edit Habit' : 'New Habit'}</Text>
                <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Close" accessibilityRole="button">
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
                    autoFocus={!existingHabit}
                    accessibilityLabel="Habit Name Input"
                />

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
                        accessibilityLabel="Habit Bundling Switch"
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
                            accessibilityLabel="Bundled Task Input"
                        />
                    </View>
                )}

                <TouchableOpacity
                    style={styles.saveBtn}
                    onPress={handleSave}
                    accessibilityLabel="Save Habit"
                    accessibilityRole="button"
                >
                    <Text style={styles.saveBtnText}>{existingHabit ? 'Update Habit' : 'Create Habit'}</Text>
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
    bundledInputContainer: { marginTop: 8 },
    saveBtn: {
        backgroundColor: COLORS.primary, padding: 18, borderRadius: 16, alignItems: 'center', marginTop: 24,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8
    },
    saveBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
