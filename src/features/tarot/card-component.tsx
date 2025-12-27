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

const CARD_BACK = require('../../../assets/tarot-back.png');
const CARD_FRONT_PLACEHOLDER = require('../../../assets/tarot-front.png');

interface CardComponentProps {
  id: string;
  isFlipped: boolean;
  onPress: () => void;
  width?: number;
  height?: number;
  // Optional: Pass specific image or text to overlay on the front
  frontContent?: React.ReactNode;
}

const DURATION = 800;

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
    rotateY.value = withTiming(isFlipped ? 180 : 0, { duration: DURATION });
  }, [isFlipped]);

  const frontStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [0, 180],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
      opacity: rotateY.value < 90 ? 0 : 1, // Hack to hide front when back is visible? No, better use backfaceVisibility but that is tricky on Android sometimes.
      // Standard way:
      zIndex: rotateY.value < 90 ? 0 : 1,
    };
  });

  const backStyle = useAnimatedStyle(() => {
    const rotateValue = interpolate(
      rotateY.value,
      [0, 180],
      [180, 360],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateValue}deg` }],
      zIndex: rotateY.value < 90 ? 1 : 0,
    };
  });

  return (
    <Pressable onPress={onPress}>
      <View style={{ width, height }}>
        {/* Back of Card */}
        <Animated.View
          style={[styles.card, styles.cardBack, backStyle, { width, height }]}
        >
          <Image
            source={CARD_BACK}
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            contentFit="cover"
          />
        </Animated.View>

        {/* Front of Card */}
        <Animated.View
          style={[styles.card, styles.cardFront, frontStyle, { width, height }]}
        >
          <Image
            source={CARD_FRONT_PLACEHOLDER}
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
            contentFit="cover"
          />
          {frontContent && (
            <View style={StyleSheet.absoluteFill}>{frontContent}</View>
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
  },
  cardBack: {
    // backgroundColor: '#1a1a2e',
  },
  cardFront: {
    // backgroundColor: '#f4f1ea',
  },
});
