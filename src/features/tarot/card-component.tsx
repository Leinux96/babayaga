import { Image } from 'expo-image';
import React, { useEffect } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { CARD_BACK, getCardImage } from './assets';

interface CardComponentProps {
  id: string; // Used to fetch the image
  isFlipped: boolean;
  onPress: () => void;
  width?: number;
  height?: number;
  frontContent?: React.ReactNode;
}

const DURATION = 1000; // Slightly faster for responsiveness, but still grand

export const CardComponent = ({
  id,
  isFlipped,
  onPress,
  width = 100,
  height = 170,
  frontContent,
}: CardComponentProps) => {
  const rotateY = useSharedValue(0);

  useEffect(() => {
    // 0 = Not Flipped (Back Visible), 180 = Flipped (Front Visible)
    rotateY.value = withTiming(isFlipped ? 180 : 0, { duration: DURATION });
  }, [isFlipped]);

  // Front Face (The Asset)
  // Logic: Starts at 180 (Hidden/Behind). Ends at 360 (0) (Visible/Front).
  const frontStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [180, 360],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
      zIndex: rotateY.value < 90 ? 0 : 10, // Higher zIndex when flipped
      opacity: rotateY.value < 90 ? 0 : 1, // Ensure hidden when back is showing
    };
  });

  // Back Face (The Purple Pattern)
  // Logic: Starts at 0 (Visible). Ends at 180 (Hidden).
  const backStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [0, 180],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
      zIndex: rotateY.value < 90 ? 10 : 0, // Higher zIndex when NOT flipped
      opacity: rotateY.value > 90 ? 0 : 1, // Ensure hidden when front is showing
    };
  });

  const cardImage = getCardImage(id);

  const handlePress = () => {
    console.log(
      `[CardComponent] Pressed id: ${id} | Current Flipped: ${isFlipped}`
    );
    onPress();
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={{ width, height }}>
        {/* Back of Card: Visible at Start */}
        <Animated.View
          style={[styles.card, styles.cardBack, backStyle, { width, height }]}
        >
          <Image source={CARD_BACK} style={styles.image} contentFit="fill" />
        </Animated.View>

        {/* Front of Card: Hidden at Start, Visible on Flip */}
        <Animated.View
          style={[styles.card, styles.cardFront, frontStyle, { width, height }]}
        >
          {/* Debug Text to ensure front is rendering if image fails */}
          {/* <Text style={{position: 'absolute', top: 0, left: 0, fontSize: 8, color: 'red', zIndex: 100}}>{id}</Text> */}

          <Image source={cardImage} style={styles.image} contentFit="fill" />
          {frontContent && (
            <View
              style={[StyleSheet.absoluteFill, { justifyContent: 'flex-end' }]}
            >
              {frontContent}
            </View>
          )}
        </Animated.View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    backfaceVisibility: 'hidden',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden', // Ensure content doesn't bleed
  },
  cardBack: {
    backgroundColor: '#1a1a2e', // Fallback color matches back theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardFront: {
    backgroundColor: '#f4f1ea', // Fallback color matches front theme
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
