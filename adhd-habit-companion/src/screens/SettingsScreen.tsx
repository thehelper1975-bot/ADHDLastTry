import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, GRADIENTS } from '../constants/colors';
import { CONFIG } from '../constants/config';
import { LinearGradient } from 'expo-linear-gradient';
import { Crown, ChevronRight, Shield, Heart, FileText } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useSubscription } from '../contexts/SubscriptionContext';

const HYPERFOCUS_KEY = '@hyperfocus_v1';

export default function SettingsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { isPremium } = useSubscription();
  const [hyperfocus, setHyperfocus] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(HYPERFOCUS_KEY).then(val => {
        if (val) setHyperfocus(JSON.parse(val));
    });
  }, []);

  const toggleHyperfocus = async (val: boolean) => {
    setHyperfocus(val);
    await AsyncStorage.setItem(HYPERFOCUS_KEY, JSON.stringify(val));
  };

  const openLink = (url: string) => Linking.openURL(url);

  return (
    <LinearGradient colors={GRADIENTS.background} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <Text style={styles.title}>Settings</Text>
            </View>

            <View style={styles.content}>
                {!isPremium && (
                    <TouchableOpacity
                        style={styles.premiumCard}
                        onPress={() => navigation.navigate('Paywall')}
                    >
                        <View style={styles.premiumContent}>
                            <Crown color="#FFF" size={24} />
                            <View>
                                <Text style={styles.premiumTitle}>Unlock Premium</Text>
                                <Text style={styles.premiumSubtitle}>Unlimited habits, advanced stats & more</Text>
                            </View>
                        </View>
                        <ChevronRight color="#FFF" size={24} />
                    </TouchableOpacity>
                )}

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Focus</Text>
                    <View style={styles.row}>
                        <View>
                            <Text style={styles.rowLabel}>Hyperfocus Mode</Text>
                            <Text style={styles.rowDesc}>Pause reminders while you flow</Text>
                        </View>
                        <Switch
                            value={hyperfocus}
                            onValueChange={toggleHyperfocus}
                            trackColor={{ false: COLORS.surface, true: COLORS.secondary }}
                            thumbColor="#FFF"
                        />
                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Support & Legal</Text>
                    <TouchableOpacity style={styles.linkRow} onPress={() => openLink(CONFIG.URLS.SUPPORT)}>
                        <View style={styles.linkLeft}>
                            <Heart size={20} color={COLORS.textSecondary} />
                            <Text style={styles.linkText}>Support</Text>
                        </View>
                        <ChevronRight size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkRow} onPress={() => openLink(CONFIG.URLS.PRIVACY)}>
                        <View style={styles.linkLeft}>
                            <Shield size={20} color={COLORS.textSecondary} />
                            <Text style={styles.linkText}>Privacy Policy</Text>
                        </View>
                        <ChevronRight size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.linkRow} onPress={() => openLink(CONFIG.URLS.TERMS)}>
                        <View style={styles.linkLeft}>
                            <FileText size={20} color={COLORS.textSecondary} />
                            <Text style={styles.linkText}>Terms of Use</Text>
                        </View>
                        <ChevronRight size={20} color={COLORS.textSecondary} />
                    </TouchableOpacity>
                </View>

                <View style={styles.footer}>
                    <Text style={styles.versionText}>v{CONFIG.APP_VERSION}</Text>
                </View>
            </View>
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
    premiumCard: {
        backgroundColor: COLORS.primary, padding: 20, borderRadius: 16, flexDirection: 'row',
        justifyContent: 'space-between', alignItems: 'center', marginBottom: 32,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8
    },
    premiumContent: { flexDirection: 'row', gap: 16, alignItems: 'center' },
    premiumTitle: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
    premiumSubtitle: { color: 'rgba(255,255,255,0.8)', fontSize: 12 },
    section: { marginBottom: 32 },
    sectionTitle: { fontSize: 14, fontWeight: 'bold', color: COLORS.textSecondary, marginBottom: 16, textTransform: 'uppercase' },
    row: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12
    },
    rowLabel: { color: COLORS.text, fontSize: 16, fontWeight: '500' },
    rowDesc: { color: COLORS.textSecondary, fontSize: 12 },
    linkRow: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        backgroundColor: COLORS.surface, padding: 16, borderRadius: 12, marginBottom: 8
    },
    linkLeft: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    linkText: { color: COLORS.text, fontSize: 16 },
    footer: { padding: 20, alignItems: 'center' },
    versionText: { color: COLORS.textSecondary, opacity: 0.5 }
});
