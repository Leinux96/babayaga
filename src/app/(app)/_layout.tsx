import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* Other screens in (app) if any */}
    </Stack>
  );
}
