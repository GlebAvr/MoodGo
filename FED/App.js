// App.js
import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useFonts, Montserrat_400Regular, Montserrat_700Bold } from '@expo-google-fonts/montserrat';
import AppLoading from 'expo-app-loading';

export default function App() {
  const [mood, setMood] = useState('');
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to MoodGo! 😄</Text>
      <Button title="I'm Feeling Happy 😊" onPress={() => setMood('Happy')} />
      {mood !== '' && <Text style={styles.moodText}>You feel: {mood}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 24, marginBottom: 20, fontFamily: 'Montserrat_700Bold' },
  moodText: { fontSize: 20, marginTop: 20, color: 'green', fontFamily: 'Montserrat_400Regular' }
});
