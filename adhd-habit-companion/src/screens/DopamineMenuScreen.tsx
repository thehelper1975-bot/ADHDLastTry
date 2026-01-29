import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Battery, Zap, Flame, Trash2, Plus } from 'lucide-react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { useDopamine } from '../hooks/useDopamine';
import { EnergyLevel } from '../types';

export default function DopamineMenuScreen() {
  const { menuItems, addDopamineItem, removeDopamineItem } = useDopamine();
  const [activeTab, setActiveTab] = useState<EnergyLevel>('balanced');
  const [newItemText, setNewItemText] = useState('');

  const handleAddItem = () => {
    if (newItemText.trim()) {
      addDopamineItem(activeTab, newItemText);
      setNewItemText('');
    }
  };

  const getIcon = (level: EnergyLevel, isActive: boolean) => {
    const color = isActive ? '#FFF' : COLORS.textSecondary;
    switch(level) {
      case 'low': return <Battery size={20} color={color} />;
      case 'balanced': return <Zap size={20} color={color} />;
      case 'high': return <Flame size={20} color={color} />;
    }
  };

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.headerTitle}>Dopamine Menu</Text>
        <Text style={styles.headerSubtitle}>Pick a reward based on your energy</Text>

        <View style={styles.tabsContainer}>
          {(['low', 'balanced', 'high'] as EnergyLevel[]).map((level) => (
            <TouchableOpacity
              key={level}
              style={[styles.tab, activeTab === level && styles.activeTab]}
              onPress={() => setActiveTab(level)}
            >
              {getIcon(level, activeTab === level)}
              <Text style={[styles.tabText, activeTab === level && styles.activeTabText]}>
                {level.charAt(0).toUpperCase() + level.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView style={styles.listContainer} contentContainerStyle={styles.listContent}>
          {menuItems[activeTab]?.map((item, index) => (
            <View key={`${activeTab}-${index}`} style={styles.itemCard}>
              <Text style={styles.itemText}>{item}</Text>
              <TouchableOpacity onPress={() => removeDopamineItem(activeTab, item)} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
                <Trash2 size={18} color={COLORS.textSecondary} />
              </TouchableOpacity>
            </View>
          ))}
          {(!menuItems[activeTab] || menuItems[activeTab].length === 0) && (
            <Text style={styles.emptyText}>No items yet. Add some below!</Text>
          )}
        </ScrollView>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
          style={styles.inputContainer}
        >
          <TextInput
            style={styles.input}
            placeholder="Add new item..."
            placeholderTextColor={COLORS.textSecondary}
            value={newItemText}
            onChangeText={setNewItemText}
            onSubmitEditing={handleAddItem}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
            <Plus size={24} color="#FFF" />
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.text,
    textAlign: 'center',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  tabsContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: COLORS.secondary,
  },
  tabText: {
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#FFF',
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  itemCard: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderLeftWidth: 3,
    borderLeftColor: COLORS.secondary,
  },
  itemText: {
    color: COLORS.text,
    fontSize: 16,
    flex: 1,
    marginRight: 10,
  },
  emptyText: {
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginTop: 40,
    fontStyle: 'italic',
  },
  inputContainer: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: COLORS.background, // Ensure background covers list when keyboard is up
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    padding: 12,
    color: COLORS.text,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
