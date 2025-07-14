import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Text, Alert, View } from "react-native";
import { useUser } from "../../context/UserContext";
import tw from "tailwind-react-native-classnames";
import AwesomeButton from "react-native-really-awesome-button";

export default function Profile() {
  const { username } = useUser();
  const progressButtonRef = useRef();

  return (
    <LinearGradient
      colors={["#e0e7ef", "#fff"]}
      style={tw`flex-1 justify-center items-center`}
    >
      <Text style={tw`text-xl font-bold text-blue-900 mb-10`}>
        Hello, {username || "Friend"} 👋
      </Text>
   
         </LinearGradient>
  );
}
