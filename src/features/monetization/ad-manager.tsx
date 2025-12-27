import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from 'react-native-google-mobile-ads';
import { create } from 'zustand';

// Mock Pro Store - In real app, integrate with RevenueCat
interface ProStore {
  isPro: boolean;
  setPro: (status: boolean) => void;
}

export const useProStore = create<ProStore>((set) => ({
  isPro: false,
  setPro: (status) => set({ isPro: status }),
}));

// Test IDs
const adUnitId = __DEV__ ? TestIds.BANNER : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyy';
const interstitialId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/zzzzzz';

const interstitial = InterstitialAd.createForAdRequest(interstitialId, {
  requestNonPersonalizedAdsOnly: true,
});

export const AdBanner = () => {
  const isPro = useProStore((state) => state.isPro);

  if (isPro) return null;

  return (
    <View style={styles.bannerContainer}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};

export const useInterstitialAd = () => {
  const isPro = useProStore((state) => state.isPro);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (isPro) return;

    const unsubscribe = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    // Start loading
    interstitial.load();

    return () => {
      unsubscribe();
      // Manually dispose not always needed for singleton usage, but good practice if recreating
    };
  }, [isPro]);

  const showAd = () => {
    if (isPro) return;
    if (loaded) {
      interstitial.show();
      setLoaded(false); // Reset
      interstitial.load(); // Preload next
    }
  };

  return { showAd, isLoaded: loaded };
};

const styles = StyleSheet.create({
  bannerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
  },
});
