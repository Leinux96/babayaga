import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

import { fetchTarotReading, TarotResponse, TarotCard } from '../../core/ai-service';
import { AdBanner, useInterstitialAd } from '../monetization/ad-manager';
import { SubscriptionModal } from '../monetization/subscription-modal';
import { CardComponent } from './card-component';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = 80;
const CARD_HEIGHT = 120;
const CENTER_X = width / 2 - CARD_WIDTH / 2;
const CENTER_Y = height / 3; // Position table in upper half

// Hardcoded positions for 5 cards (Cross-ish)
const POSITIONS = [
  { x: CENTER_X, y: CENTER_Y, rotate: '0deg', id: 'pos1' }, // Center (Present)
  { x: CENTER_X, y: CENTER_Y, rotate: '90deg', id: 'pos2' }, // Cross (Challenge)
  { x: CENTER_X, y: CENTER_Y + CARD_HEIGHT + 20, rotate: '0deg', id: 'pos3' }, // Below (Foundation)
  { x: CENTER_X, y: CENTER_Y - CARD_HEIGHT - 20, rotate: '0deg', id: 'pos4' }, // Above (Outcome/Star/Guidance) - Adjusted logic
  { x: CENTER_X - CARD_WIDTH - 20, y: CENTER_Y, rotate: '0deg', id: 'pos5' }, // Left/Right? Let's do Left
];
// Actually, let's map the mock response indices to these.
// Mock has 5 cards.

export const TarotTable = () => {
  const [question, setQuestion] = useState('');
  const [step, setStep] = useState<
    'input' | 'shuffling' | 'dealing' | 'reading'
  >('input');
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [showSubscription, setShowSubscription] = useState(false);
  const { showAd } = useInterstitialAd();

  const { data, refetch, isFetching } = useQuery({
    queryKey: ['tarot', question],
    queryFn: () => fetchTarotReading(question),
    enabled: false,
  });

  const handleConsult = async () => {
    if (!question.trim()) return;

    // Show Ad before reading logic if loaded
    showAd();

    setStep('shuffling');
    await refetch();
    // After fetch, start dealing
    setTimeout(() => {
      setStep('dealing');
    }, 1000); // Shuffling time
  };

  const handleCardPress = (cardId: string) => {
    if (step === 'dealing' || step === 'reading') {
      setStep('reading');
      setRevealedIds((prev) => {
        const next = new Set(prev);
        next.add(cardId);
        return next;
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Seer</Text>
        <Pressable
          onPress={() => setShowSubscription(true)}
          style={styles.proButton}
        >
          <Text style={styles.proText}>REMOVE ADS</Text>
        </Pressable>
      </View>

      <View style={styles.tableArea}>
        {/* Placeholder for Deck */}
        {step !== 'input' && <View style={styles.deckPlaceholder} />}

        {/* Cards */}
        {data?.cards_pulled.map((card, index) => {
          // Determine target Position
          // Mapping index 0->Center, 1->Cross, 2->Foundation, 3->Outcome (Top), 4->Guidance (Left)
          // Mock: 0:Fool(Pres), 1:Magician(Chal), 2:Tower(Found), 3:Star(Out), 4:Death(Guid)

          // Adjusted POSITIONS array mapping:
          // 0 -> Center
          // 1 -> Cross
          // 2 -> Below (Foundation)
          // 3 -> Above (Outcome)
          // 4 -> Left (Guidance)

          const targetPos = POSITIONS[index] || {
            x: CENTER_X,
            y: CENTER_Y,
            rotate: '0deg',
          };

          return (
            <DealingCard
              key={card.id}
              card={card}
              index={index}
              targetX={targetPos.x}
              targetY={targetPos.y}
              targetRotate={targetPos.rotate}
              step={step}
              isRevealed={revealedIds.has(card.id)}
              onPress={() => handleCardPress(card.id)}
            />
          );
        })}
      </View>

      {/* Input / Output Area */}
      <View style={styles.controls}>
        {step === 'input' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Ask the cards..."
              placeholderTextColor="#888"
              value={question}
              onChangeText={setQuestion}
            />
            <Pressable
              style={styles.button}
              onPress={handleConsult}
              disabled={isFetching}
            >
              <Text style={styles.buttonText}>
                {isFetching ? 'Consulting...' : 'Consult'}
              </Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.outcomeContainer}>
            {/* Show partial meaning of last revealed card? */}
            {/* Or Outcome if all revealed */}
            <Text style={styles.outcomeText}>
              {revealedIds.size === data?.cards_pulled.length
                ? data?.outcome
                : 'Tap a card to reveal its meaning...'}
            </Text>
            <Pressable
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => {
                setStep('input');
                setQuestion('');
                setRevealedIds(new Set());
              }}
            >
              <Text style={styles.buttonText}>New Reading</Text>
            </Pressable>
          </View>
        )}
      </View>

      <AdBanner />
      <SubscriptionModal
        visible={showSubscription}
        onClose={() => setShowSubscription(false)}
      />
    </SafeAreaView>
  );
};

// Wrapper handling the deal animation
const DealingCard = ({
  card,
  index,
  targetX,
  targetY,
  targetRotate,
  step,
  isRevealed,
  onPress,
}: any) => {
  const translateX = useSharedValue(width - 50); // Start off-screen (Deck position)
  const translateY = useSharedValue(height - 50);

  React.useEffect(() => {
    if (step === 'dealing') {
      translateX.value = withDelay(index * 300, withSpring(targetX));
      translateY.value = withDelay(index * 300, withSpring(targetY));
      // For the "Cross" card (index 1), we need to handle the rotation logic carefully.
      // targetRotate is e.g. '90deg'.
      // We can't interpolate string easily in shared value for complex transforms without parsing.
      // Simpler: use 0 for fly-in, then apply static rotation in style?
      // Or better, just animate to 0 and apply the rotation via a wrapper View or the final style.
    }
  }, [step, index, targetX, targetY, translateX, translateY]);

  // Parse rotation for wrapper
  const rotationDeg = targetRotate === '90deg' ? '90deg' : '0deg';

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: rotationDeg }, // Apply static rotation once dealing
      ],
      zIndex: index === 1 ? 10 : index, // Cross card on top
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <CardComponent
        id={card.id}
        isFlipped={isRevealed}
        onPress={onPress}
        width={CARD_WIDTH}
        height={CARD_HEIGHT}
        // Determine front content? Text or Image?
        // For now, just Text name
        frontContent={
          <View style={styles.cardContent}>
            <Text style={styles.cardName}>{card.name}</Text>
            <Text style={styles.cardPosition}>{card.position_name}</Text>
            {card.is_reversed && <Text style={styles.reversed}>Rx</Text>}
          </View>
        }
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Mystical dark background
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#D4Af37', // Gold
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  proButton: {
    borderWidth: 1,
    borderColor: '#D4Af37',
    padding: 5,
    borderRadius: 5,
  },
  proText: {
    color: '#D4Af37',
    fontSize: 10,
    fontWeight: 'bold',
  },
  tableArea: {
    flex: 1,
    // position: 'relative',
  },
  deckPlaceholder: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#333',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#555',
  },
  controls: {
    padding: 20,
    backgroundColor: '#1a1a1a',
    borderTopWidth: 1,
    borderTopColor: '#333',
    minHeight: 150,
    justifyContent: 'center',
  },
  input: {
    backgroundColor: '#333',
    color: 'white',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#D4Af37',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  outcomeContainer: {
    alignItems: 'center',
  },
  outcomeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  cardName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  cardPosition: {
    fontSize: 8,
    color: '#666',
    marginTop: 2,
    textTransform: 'uppercase',
  },
  reversed: {
    color: 'red',
    fontWeight: 'bold',
    marginTop: 2,
  },
});
