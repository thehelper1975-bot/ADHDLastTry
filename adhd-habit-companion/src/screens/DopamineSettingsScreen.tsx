import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { X, Plus, Trash2, RotateCcw } from 'lucide-react-native';
import { useDopamine, EnergyLevel } from '../hooks/useDopamine';

export default function DopamineSettingsScreen() {
  const navigation = useNavigation();
  const { menu, addTask, removeTask, resetDefaults } = useDopamine();
  const [newTask, setNewTask] = useState('');
  const [activeTab, setActiveTab] = useState<EnergyLevel>('balanced');

  const handleAdd = () => {
    if (newTask.trim()) {
      addTask(activeTab, newTask.trim());
      setNewTask('');
    }
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 16 }}>
                    <X size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <Text style={styles.title}>Dopamine Menu</Text>
            </View>
            <TouchableOpacity onPress={resetDefaults}>
                <RotateCcw size={20} color={COLORS.textSecondary} />
            </TouchableOpacity>
        </View>

        <View style={styles.tabs}>
            {(['low', 'balanced', 'high'] as EnergyLevel[]).map(level => (
                <TouchableOpacity
                    key={level}
                    style={[styles.tab, activeTab === level && styles.activeTab]}
                    onPress={() => setActiveTab(level)}
                >
                    <Text style={[styles.tabText, activeTab === level && styles.activeTabText]}>
                        {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>

        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                placeholder={`Add ${activeTab} energy task...`}
                placeholderTextColor={COLORS.textSecondary}
                value={newTask}
                onChangeText={setNewTask}
                onSubmitEditing={handleAdd}
            />
            <TouchableOpacity onPress={handleAdd} style={styles.addBtn}>
                <Plus size={24} color="#FFF" />
            </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
            {menu[activeTab].map((task, index) => (
                <View key={index} style={styles.taskRow}>
                    <Text style={styles.taskText}>{task}</Text>
                    <TouchableOpacity onPress={() => removeTask(activeTab, index)}>
                        <Trash2 size={20} color={COLORS.error} />
                    </TouchableOpacity>
                </View>
            ))}
            {menu[activeTab].length === 0 && (
                <Text style={styles.emptyText}>No tasks yet. Add some things you enjoy!</Text>
            )}
        </ScrollView>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    title: { fontSize: 24, fontWeight: 'bold', color: COLORS.text },
    tabs: { flexDirection: 'row', paddingHorizontal: 20, marginBottom: 20 },
    tab: { flex: 1, padding: 12, alignItems: 'center', borderBottomWidth: 2, borderBottomColor: COLORS.border },
    activeTab: { borderBottomColor: COLORS.secondary },
    tabText: { color: COLORS.textSecondary, fontWeight: '600' },
    activeTabText: { color: COLORS.secondary },
    inputContainer: { flexDirection: 'row', padding: 20, gap: 12 },
    input: {
        flex: 1, backgroundColor: COLORS.surface, color: COLORS.text, padding: 12, borderRadius: 12,
        borderWidth: 1, borderColor: COLORS.border
    },
    addBtn: {
        backgroundColor: COLORS.secondary, width: 48, borderRadius: 12,
        alignItems: 'center', justifyContent: 'center'
    },
    content: { padding: 20, paddingTop: 0 },
    taskRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 8,
        borderWidth: 1, borderColor: COLORS.border
    },
    taskText: { color: COLORS.text, fontSize: 16, flex: 1, marginRight: 8 },
    emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 40 }
});
