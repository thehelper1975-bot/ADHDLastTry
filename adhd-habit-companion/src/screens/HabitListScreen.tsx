import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useHabits } from '../hooks/useHabits';
import { useNavigation } from '@react-navigation/native';
import { Plus, Check, Trash2 } from 'lucide-react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';

export default function HabitListScreen() {
  const { habits, toggleHabitCompletion, deleteHabit } = useHabits();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const today = new Date().toISOString().split('T')[0];

  const handleDelete = (id: string) => {
    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteHabit(id) }
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
      const isCompleted = item.completedDates.includes(today);
      return (
          <View style={styles.card}>
              <TouchableOpacity
                style={[styles.checkbox, isCompleted && styles.checkboxChecked]}
                onPress={() => toggleHabitCompletion(item.id, today)}
              >
                  {isCompleted && <Check size={16} color="#FFF" />}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cardContent}
                onPress={() => navigation.navigate('AddHabit', { habitId: item.id })}
              >
                  <Text style={[styles.cardTitle, isCompleted && styles.completedText]}>{item.title}</Text>
                  {item.isBundled && <Text style={styles.bundledText}>+ {item.bundledTask}</Text>}
                  <Text style={styles.streakText}>Streak: {item.streak} days</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Trash2 size={20} color={COLORS.error} />
              </TouchableOpacity>
          </View>
      );
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Your Habits</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddHabit')} style={styles.addBtn}>
                    <Plus size={24} color="#FFF" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={habits}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.list}
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>No habits yet. Start small!</Text>
                    </View>
                }
            />
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 28, fontWeight: 'bold', color: COLORS.text },
    addBtn: { backgroundColor: COLORS.primary, padding: 8, borderRadius: 12 },
    list: { padding: 20 },
    card: {
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 16, marginBottom: 12,
        flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: COLORS.border
    },
    checkbox: {
        width: 24, height: 24, borderRadius: 8, borderWidth: 2, borderColor: COLORS.secondary,
        marginRight: 16, alignItems: 'center', justifyContent: 'center'
    },
    checkboxChecked: { backgroundColor: COLORS.secondary },
    cardContent: { flex: 1 },
    cardTitle: { fontSize: 18, color: COLORS.text, fontWeight: '600' },
    completedText: { textDecorationLine: 'line-through', color: COLORS.textSecondary },
    bundledText: { color: COLORS.accent, fontSize: 14, marginTop: 4 },
    streakText: { color: COLORS.textSecondary, fontSize: 12, marginTop: 4 },
    empty: { alignItems: 'center', marginTop: 40 },
    emptyText: { color: COLORS.textSecondary, fontSize: 16 }
});
