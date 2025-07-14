import React from "react";
import { View, Text, TouchableOpacity, Image, Linking } from "react-native";
import { useRouter } from "expo-router";
import { useUser } from "../context/UserContext";
import tw from "tailwind-react-native-classnames";

export default function WelcomeScreen() {
  const { username } = useUser();
  const router = useRouter();

  const handleAccept = () => {
    router.replace("/go-out");
  };

  const handleChangeName = () => {
    router.back();
  };

  const openPrivacy = () => {
    Linking.openURL("about:blank");
  };

  const openTerms = () => {
    Linking.openURL("https://your-terms-of-use-link.com");
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Top image */}
      <Image source={require("../assets/images/Policy.png")} style={{ width: "100%", height: "55%" }} resizeMode="cover" />

      {/* Bottom content */}
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-2xl font-bold text-center mb-4`}>Welcome, {username}! 🎉</Text>
        <Text style={tw`text-base text-center mb-5 text-gray-700`}>We're excited to guide your mood journey. Let's start by confirming a few things.</Text>

        <Text style={tw`text-base text-center mb-6 text-gray-700`}>
          Please read and accept our{" "}
          <Text onPress={openPrivacy} style={{ color: "#0284c7", fontWeight: "bold" }}>
            Privacy Policy
          </Text>{" "}
          and{" "}
          <Text onPress={openTerms} style={{ color: "#0284c7", fontWeight: "bold" }}>
            Terms of Use
          </Text>
          .
        </Text>

        <TouchableOpacity onPress={handleAccept} style={[tw`w-full px-6 py-3 rounded-full mb-4`, { backgroundColor: "#0284c7" }]}>
          <Text style={tw`text-white text-lg font-semibold text-center`}>Accept & Continue →</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleChangeName} style={[tw`w-full px-6 py-3 rounded-full border border-gray-400`, { backgroundColor: "#0284c7" }]}>
          <Text style={tw`text-white text-lg font-semibold text-center`}>← I want to change my name</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
