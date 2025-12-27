import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Image } from 'expo-image';

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      
      <View style={styles.content}>
        <Text style={styles.title}>BABA YAGA</Text>
        <Text style={styles.subtitle}>The cards know all.</Text>

        <Link href="/reading" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Enter the Void</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 20,
  },
  title: {
    fontSize: 42,
    color: '#D4Af37',
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 4,
  },
  subtitle: {
    color: '#888',
    fontSize: 18,
    fontStyle: 'italic',
  },
  button: {
    marginTop: 40,
    borderWidth: 1,
    borderColor: '#D4Af37',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  buttonText: {
    color: '#D4Af37',
    fontSize: 16,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
});
