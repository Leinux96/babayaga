import { Stack } from 'expo-router';

import { TarotTable } from '../features/tarot/tarot-table';

export default function ReadingScreen() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <TarotTable />
    </>
  );
}
