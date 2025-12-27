import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// import Purchases, { PurchasesPackage } from 'react-native-purchases'; // Commented out for mock
import { useProStore } from './ad-manager';

export const SubscriptionModal = ({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const setPro = useProStore((state) => state.setPro);

  const handlePurchase = async () => {
    setLoading(true);
    // Mock Purchase Delay
    setTimeout(() => {
      setLoading(false);
      setPro(true); // Grant access
      Alert.alert('Success', 'You are now an Oracle! Ads removed.');
      onClose();
    }, 1500);

    /* Real Implementation:
    try {
        const { customerInfo } = await Purchases.purchasePackage(package);
        if (customerInfo.entitlements.active["pro"]) {
            setPro(true);
        }
    } catch (e) {
        if (!e.userCancelled) Alert.alert("Error", e.message);
    }
    */
  };

  const handleRestore = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Mock Restore: assume success if logic dictates, or just message
      Alert.alert('Restore', 'Purchases restored.');
    }, 1000);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Unlock the Void</Text>
          <Text style={styles.feature}>• Remove All Ads</Text>
          <Text style={styles.feature}>• Support the Developer</Text>
          <Text style={styles.feature}>• Infinite Readings</Text>

          <Pressable
            style={styles.buyButton}
            onPress={handlePurchase}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="black" />
            ) : (
              <Text style={styles.buyText}>Purchase Oracle Pass - $4.99</Text>
            )}
          </Pressable>

          <Pressable style={styles.restoreButton} onPress={handleRestore}>
            <Text style={styles.restoreText}>Restore Purchases</Text>
          </Pressable>

          <Pressable style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>Maybe Later</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#D4Af37',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#D4Af37',
    fontWeight: 'bold',
    marginBottom: 20,
    fontFamily: 'serif',
  },
  feature: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 10,
  },
  buyButton: {
    backgroundColor: '#D4Af37',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  buyText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },
  restoreButton: {
    marginTop: 15,
  },
  restoreText: {
    color: '#888',
    textDecorationLine: 'underline',
  },
  closeButton: {
    marginTop: 20,
  },
  closeText: {
    color: '#666',
  },
});
