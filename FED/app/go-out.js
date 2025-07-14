// app/go-out.js
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";

export default function GoOutScreen() {
  const router = useRouter();
  const handleAnswer = () => router.replace("/mood");

  return (
    <LinearGradient colors={["#0369a1", "#bae6fd"]} style={tw`flex-1 justify-center items-center px-6`}>
      <Text style={tw`text-2xl font-bold text-white text-center mb-10`}>Do you feel like going out today?</Text>

      <View style={tw`w-full items-center`}>
        <TouchableOpacity onPress={handleAnswer} style={[tw`bg-white py-3 rounded-full mb-4 items-center`, { width: "70%" }]}>
          <Text style={tw`text-blue-600 text-center text-lg font-semibold`}>Yes</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAnswer} style={[tw`border border-white py-3 rounded-full items-center`, { width: "70%" }]}>
          <Text style={tw`text-white text-center text-lg font-semibold`}>No</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
