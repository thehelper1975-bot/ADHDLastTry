import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, ActivityIndicator, Alert } from 'react-native';
import { COLORS, GRADIENTS } from '../constants/colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscription } from '../contexts/SubscriptionContext';
import { X, Check } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

export default function PaywallScreen() {
  const navigation = useNavigation();
  const { offerings, purchasePackage, restorePurchases, isLoading } = useSubscription();
  const [purchasing, setPurchasing] = useState(false);

  const handlePurchase = async (pkg: any) => {
      setPurchasing(true);
      const success = await purchasePackage(pkg.identifier);
      setPurchasing(false);
      if (success) {
          navigation.goBack();
      }
  };

  const handleRestore = async () => {
      setPurchasing(true);
      const success = await restorePurchases();
      setPurchasing(false);
      if (success) {
          Alert.alert("Success", "Purchases restored!");
          navigation.goBack();
      } else {
          Alert.alert("Error", "Could not restore purchases.");
      }
  };

  const features = [
      "Unlimited Habits (Free limit: 3)",
      "Advanced Progress Analytics",
      "Custom Themes & Icons",
      "Support Independent Devs"
  ];

  return (
    <LinearGradient colors={['#1A1A2E', '#0F0F1A']} style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={styles.closeBtn}
                    accessibilityRole="button"
                    accessibilityLabel="Close paywall"
                >
                    <X size={24} color={COLORS.textSecondary} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleRestore}
                    accessibilityRole="button"
                    accessibilityLabel="Restore purchases"
                >
                    <Text style={styles.restoreText}>Restore</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>Unlock Full Potential</Text>
                <Text style={styles.subtitle}>Get the tools you need to master your ADHD brain.</Text>

                <View style={styles.featuresContainer}>
                    {features.map((feature, index) => (
                        <View key={index} style={styles.featureRow}>
                            <Check size={20} color={COLORS.secondary} />
                            <Text style={styles.featureText}>{feature}</Text>
                        </View>
                    ))}
                </View>

                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : (
                    <View style={styles.packagesContainer}>
                         {/* Fallback if no offerings (e.g. dev mode without keys) */}
                        {!offerings?.availablePackages || offerings.availablePackages.length === 0 ? (
                            <Text style={{color: 'white', textAlign: 'center'}}>No offerings configured. (Check RevenueCat setup)</Text>
                        ) : (
                            offerings.availablePackages.map((pkg) => (
                                <TouchableOpacity
                                    key={pkg.identifier}
                                    style={[styles.packageCard, pkg.packageType === 'ANNUAL' && styles.packageCardPopular]}
                                    onPress={() => handlePurchase(pkg)}
                                    disabled={purchasing}
                                    accessibilityRole="button"
                                    accessibilityLabel={`Purchase ${pkg.product.title} for ${pkg.product.priceString}`}
                                >
                                    {pkg.packageType === 'ANNUAL' && (
                                        <View style={styles.popularBadge}>
                                            <Text style={styles.popularText}>BEST VALUE</Text>
                                        </View>
                                    )}
                                    <View>
                                        <Text style={styles.packageTitle}>{pkg.product.title}</Text>
                                        <Text style={styles.packagePrice}>{pkg.product.priceString}</Text>
                                    </View>
                                    <Text style={styles.packageDesc}>
                                        {pkg.packageType === 'ANNUAL' ? 'Billed yearly' :
                                         pkg.packageType === 'MONTHLY' ? 'Billed monthly' : 'One time'}
                                    </Text>
                                </TouchableOpacity>
                            ))
                        )}
                    </View>
                )}

                <Text style={styles.disclaimer}>
                    Subscriptions auto-renew. Cancel anytime in your Apple ID settings.
                </Text>
            </ScrollView>
        </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    safeArea: { flex: 1 },
    header: { padding: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    closeBtn: { padding: 8 },
    restoreText: { color: COLORS.textSecondary, fontSize: 16 },
    content: { padding: 24 },
    title: { fontSize: 32, fontWeight: 'bold', color: COLORS.text, textAlign: 'center', marginBottom: 12 },
    subtitle: { fontSize: 18, color: COLORS.textSecondary, textAlign: 'center', marginBottom: 40 },
    featuresContainer: { gap: 16, marginBottom: 40 },
    featureRow: { flexDirection: 'row', gap: 12, alignItems: 'center' },
    featureText: { color: COLORS.text, fontSize: 16 },
    packagesContainer: { gap: 16 },
    packageCard: {
        backgroundColor: COLORS.surface, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: COLORS.border,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'
    },
    packageCardPopular: { borderColor: COLORS.secondary, backgroundColor: 'rgba(59, 130, 246, 0.1)' },
    packageTitle: { color: COLORS.text, fontSize: 16, fontWeight: 'bold' },
    packagePrice: { color: COLORS.text, fontSize: 20, fontWeight: 'bold', marginTop: 4 },
    packageDesc: { color: COLORS.textSecondary, fontSize: 14 },
    popularBadge: {
        position: 'absolute', top: -12, right: 20, backgroundColor: COLORS.secondary,
        paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12
    },
    popularText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
    disclaimer: { color: COLORS.textSecondary, fontSize: 12, textAlign: 'center', marginTop: 32, opacity: 0.5 }
});
