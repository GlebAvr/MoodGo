import React from "react";
import { Slot } from "expo-router";
import { UserProvider } from "../context/UserContext";
import { useFonts, Poppins_400Regular, Poppins_700Bold } from "@expo-google-fonts/poppins";
import { ActivityIndicator, View, Text } from "react-native";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#e0f2fe" }}>
        <ActivityIndicator size="large" color="#0284c7" />
        <Text style={{ marginTop: 12, color: "#0284c7" }}>Loading Poppins...</Text>
      </View>
    );
  }

  return (
    <UserProvider>
      <Slot />
    </UserProvider>
  );
}
