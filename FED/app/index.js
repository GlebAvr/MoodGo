import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Animated, TouchableWithoutFeedback } from "react-native";
import { useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames";
import { useUser } from "../context/UserContext";
import { LinearGradient } from "expo-linear-gradient"; // optional


export default function IndexScreen() {
  const [name, setName] = useState("");
  const [showSplash, setShowSplash] = useState(true);
  const router = useRouter();
  const { setUsername } = useUser();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 3500);
    return () => clearTimeout(timer);
  }, []);

  const handleContinue = () => {
    if (name.trim()) {
      setUsername(name);
      router.push("/welcome");
    }
  };

  // 1️⃣ Splash view
  // if (showSplash) {
  //   return (
  //     <LinearGradient
  //       // dark-to-light gradient behind splash image
  //       colors={['#0369a1', '#bae6fd']}
  //       style={tw`flex-1 justify-center items-center`}
  //     >
  //       <Image
  //         source={require('../assets/images/mood-go-splash2.png')}
  //         style={{ width: '100%', height: '100%' }}
  //         resizeMode="contain"
  //       />
  //       <Text style={tw`text-white mt-4 text-lg`}>
  //         Loading MoodGo…
  //       </Text>
  //     </LinearGradient>
  //   );
  // }

  // 2️⃣ Your existing name-entry UI
  return (
    <View style={tw`flex-1 bg-white`}>
      <Image source={require("../assets/images/greetPicture.png")} style={{ width: "100%", height: "55%" }} resizeMode="cover" />
      <View style={tw`flex-1 justify-center items-center px-6`}>
        <Text style={tw`text-2xl font-bold mb-4 text-center`}>What should we call you?</Text>
        <TextInput placeholder="Enter name..." placeholderTextColor="#999" style={tw`border-b w-full py-2 text-lg mb-6 text-center`} value={name} onChangeText={setName} />
        <TouchableOpacity onPress={handleContinue} style={[tw`w-full px-6 py-3 rounded-full`, { backgroundColor: "#0284c7" }]}>
          <Text style={tw`text-white text-center text-lg font-semibold`}>Let's Go!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
