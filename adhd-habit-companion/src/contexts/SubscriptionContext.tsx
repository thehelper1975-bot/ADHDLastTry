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
    let isMounted = true;

    const init = async () => {
      try {
        const apiKey = CONFIG.REVENUECAT.API_KEY;
        if (apiKey && !apiKey.includes('placeholder')) {
            await Purchases.configure({ apiKey });

            const info = await Purchases.getCustomerInfo();
            if (isMounted) {
              setCustomerInfo(info);
              setIsPremium(info.entitlements.active[CONFIG.REVENUECAT.ENTITLEMENT_ID] !== undefined);
            }

            const offerings = await Purchases.getOfferings();
            if (isMounted) {
              setOfferings(offerings.current);
            }

            const updateListener = (info: CustomerInfo) => {
                if (isMounted) {
                  setCustomerInfo(info);
                  setIsPremium(info.entitlements.active[CONFIG.REVENUECAT.ENTITLEMENT_ID] !== undefined);
                }
            };
            Purchases.addCustomerInfoUpdateListener(updateListener);
        } else {
          console.warn('RevenueCat API Key is a placeholder. Billing features disabled.');
        }
      } catch (e) {
        console.error('RevenueCat init error:', e);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, []);

  const purchasePackage = async (packageId: string): Promise<boolean> => {
    const apiKey = CONFIG.REVENUECAT.API_KEY;
    if (!apiKey || apiKey.includes('placeholder')) {
        console.warn('Cannot purchase: RevenueCat not configured.');
        return false;
    }

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
    const apiKey = CONFIG.REVENUECAT.API_KEY;
    if (!apiKey || apiKey.includes('placeholder')) {
        console.warn('Cannot restore: RevenueCat not configured.');
        return false;
    }

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
