import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { useDopamine } from '../hooks/useDopamine';
import { EnergyLevel } from '../types';
import { Plus, Trash2, Battery, Zap, Flame, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function DopamineMenuScreen() {
  const navigation = useNavigation();
  const { menuItems, addItem, removeItem } = useDopamine();
  const [activeTab, setActiveTab] = useState<EnergyLevel>('balanced');
  const [newTask, setNewTask] = useState('');

  const handleAddItem = () => {
    if (newTask.trim()) {
      addItem(activeTab, newTask);
      setNewTask('');
    }
  };

  const tabs: { key: EnergyLevel; label: string; icon: React.ReactNode }[] = [
    { key: 'low', label: 'Low', icon: <Battery size={20} color={activeTab === 'low' ? '#FFF' : COLORS.textSecondary} /> },
    { key: 'balanced', label: 'Balanced', icon: <Zap size={20} color={activeTab === 'balanced' ? '#FFF' : COLORS.textSecondary} /> },
    { key: 'high', label: 'High', icon: <Flame size={20} color={activeTab === 'high' ? '#FFF' : COLORS.textSecondary} /> },
  ];

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <ChevronLeft color={COLORS.text} size={28} />
                </TouchableOpacity>
                <Text style={styles.title}>Dopamine Menu</Text>
                <View style={{ width: 28 }} />
            </View>

            <View style={styles.tabsContainer}>
                {tabs.map(tab => (
                    <TouchableOpacity
                        key={tab.key}
                        onPress={() => setActiveTab(tab.key)}
                        style={[styles.tab, activeTab === tab.key && styles.activeTab]}
                    >
                        {tab.icon}
                        <Text style={[styles.tabText, activeTab === tab.key && styles.activeTabText]}>{tab.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.content}>
                <Text style={styles.sectionDescription}>
                    {activeTab === 'low' && "Easy wins when you have no energy."}
                    {activeTab === 'balanced' && "Tasks that make you feel good and capable."}
                    {activeTab === 'high' && "Big tasks to tackle when you're on fire!"}
                </Text>

                <FlatList
                    data={menuItems[activeTab]}
                    keyExtractor={(item, index) => `${activeTab}-${index}`}
                    renderItem={({ item, index }) => (
                        <View style={styles.itemRow}>
                            <Text style={styles.itemText}>{item}</Text>
                            <TouchableOpacity onPress={() => removeItem(activeTab, index)} style={styles.deleteBtn}>
                                <Trash2 size={18} color={COLORS.error} />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={
                        <Text style={styles.emptyText}>No items yet. Add something!</Text>
                    }
                    contentContainerStyle={styles.listContent}
                />
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0} style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Add a new task..."
                    placeholderTextColor={COLORS.textSecondary}
                    value={newTask}
                    onChangeText={setNewTask}
                    onSubmitEditing={handleAddItem}
                />
                <TouchableOpacity onPress={handleAddItem} style={styles.addBtn}>
                    <Plus color="#FFF" size={24} />
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 16 },
    backBtn: { padding: 4 },
    title: { fontSize: 20, fontWeight: 'bold', color: COLORS.text },
    tabsContainer: { flexDirection: 'row', paddingHorizontal: 16, marginBottom: 16 },
    tab: {
        flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
        paddingVertical: 12, borderRadius: 8, marginHorizontal: 4,
        backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border
    },
    activeTab: { backgroundColor: COLORS.secondary, borderColor: COLORS.secondary },
    tabText: { marginLeft: 8, color: COLORS.textSecondary, fontWeight: '600' },
    activeTabText: { color: '#FFF' },
    content: { flex: 1, paddingHorizontal: 20 },
    sectionDescription: { color: COLORS.textSecondary, marginBottom: 16, fontStyle: 'italic', textAlign: 'center' },
    listContent: { paddingBottom: 80 },
    itemRow: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.05)', padding: 16, borderRadius: 12, marginBottom: 8
    },
    itemText: { color: COLORS.text, fontSize: 16, flex: 1 },
    deleteBtn: { padding: 8 },
    emptyText: { color: COLORS.textSecondary, textAlign: 'center', marginTop: 40 },
    inputContainer: {
        flexDirection: 'row', alignItems: 'center', padding: 16,
        borderTopWidth: 1, borderTopColor: COLORS.border, backgroundColor: COLORS.surface
    },
    input: {
        flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', color: COLORS.text,
        padding: 12, borderRadius: 8, marginRight: 12, fontSize: 16
    },
    addBtn: {
        backgroundColor: COLORS.primary, padding: 12, borderRadius: 8,
        alignItems: 'center', justifyContent: 'center'
    }
});
