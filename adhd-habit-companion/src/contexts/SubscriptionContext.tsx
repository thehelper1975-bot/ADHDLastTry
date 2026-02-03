import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { CONFIG } from '../constants/config';

interface SubscriptionContextType {
  isPremium: boolean;
  offerings: PurchasesOffering | null;
  customerInfo: CustomerInfo | null;
  isLoading: boolean;
  purchasePackage: (packageId: string) => Promise<boolean>;
  restorePurchases: () => Promise<boolean>;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export const SubscriptionProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [offerings, setOfferings] = useState<PurchasesOffering | null>(null);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        if (CONFIG.REVENUECAT.API_KEY && !CONFIG.REVENUECAT.API_KEY.includes('placeholder')) {
            await Purchases.configure({ apiKey: CONFIG.REVENUECAT.API_KEY! });

            const info = await Purchases.getCustomerInfo();
            setCustomerInfo(info);
            setIsPremium(info.entitlements.active[CONFIG.REVENUECAT.ENTITLEMENT_ID] !== undefined);

            const offerings = await Purchases.getOfferings();
            setOfferings(offerings.current);
        } else {
            console.log('RevenueCat skipped: placeholder key detected');
        }
      } catch (e) {
        console.error('RevenueCat init error:', e);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    const updateListener = (info: CustomerInfo) => {
        setCustomerInfo(info);
        setIsPremium(info.entitlements.active[CONFIG.REVENUECAT.ENTITLEMENT_ID] !== undefined);
    };

    Purchases.addCustomerInfoUpdateListener(updateListener);

    // Cleanup not strictly necessary for singleton but good practice if it returned a remove function
    // Purchases.removeCustomerInfoUpdateListener(updateListener);

  }, []);

  const purchasePackage = async (packageId: string): Promise<boolean> => {
    try {
      const pkg = offerings?.availablePackages.find(p => p.identifier === packageId);
      if (!pkg) return false;

      await Purchases.purchasePackage(pkg);
      return true;
    } catch (e: any) {
      if (!e.userCancelled) console.error('Purchase error:', e);
      return false;
    }
  };

  const restorePurchases = async (): Promise<boolean> => {
    try {
      const info = await Purchases.restorePurchases();
      return info.entitlements.active[CONFIG.REVENUECAT.ENTITLEMENT_ID] !== undefined;
    } catch (e) {
      console.error('Restore error:', e);
      return false;
    }
  };

  return (
    <SubscriptionContext.Provider value={{
      isPremium,
      offerings,
      customerInfo,
      isLoading,
      purchasePackage,
      restorePurchases,
    }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) throw new Error('useSubscription must be used within SubscriptionProvider');
  return context;
};
