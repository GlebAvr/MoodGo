// app/components/GameButton.js
import React, { useRef } from "react";
import { Animated, TouchableWithoutFeedback, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GameButton({
  label = "Press Me!",
  onPress = () => {},
  colors = ["#34d399", "#f472b6"], // Vibrant green-pink by default
  style = {},
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 0.9, friction: 4, tension: 120, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 1, duration: 80, useNativeDriver: false })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, { toValue: 1, friction: 2, tension: 100, useNativeDriver: true }),
      Animated.timing(glow, { toValue: 0, duration: 150, useNativeDriver: false })
    ]).start();
  };

  // Glowing shadow and border
  const shadowOpacity = glow.interpolate({
    inputRange: [0, 1],
    outputRange: [0.12, 0.7]
  });
  const shadowRadius = glow.interpolate({
    inputRange: [8, 24]
  });

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          width: 160,
          height: 60,
          margin: 10,
          borderRadius: 30,
          overflow: "hidden",
          justifyContent: "center",
          alignItems: "center",
          shadowColor: colors[0],
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity,
          shadowRadius,
          elevation: 7,
          ...style,
        }}
      >
        <LinearGradient
          colors={colors}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 30,
          }}
        >
          <Text style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 22,
            textShadowColor: "rgba(0,0,0,0.35)",
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 4,
          }}>
            {label}
          </Text>
        </LinearGradient>
        {/* Glowing border when pressed */}
        <Animated.View
          pointerEvents="none"
          style={{
            position: "absolute",
            top: -4, left: -4, right: -4, bottom: -4,
            borderRadius: 34,
            borderWidth: 3,
            borderColor: colors[0],
            opacity: glow,
            shadowColor: colors[0],
            shadowRadius: 18,
            shadowOpacity: 0.7,
            shadowOffset: { width: 0, height: 0 },
          }}
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
