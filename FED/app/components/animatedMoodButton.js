// app/components/animatedMoodButton.js
import React, { useRef } from "react";
import { Animated, TouchableWithoutFeedback, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function AnimatedMoodButton({
  label,
  emoji,
  onPress,
  colors,
  selected,
  disabled
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!disabled)
      Animated.spring(scale, { toValue: 0.95, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    if (!disabled)
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <TouchableWithoutFeedback
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    >
      <Animated.View
        style={{
          transform: [{ scale }],
          width: 110,
          height: 110,
          margin: 10,
          borderRadius: 24,
          overflow: "hidden",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.14,
          shadowRadius: 8,
          elevation: 4,
          opacity: disabled ? 0.4 : 1, // grey out if disabled
          borderWidth: selected ? 3 : 0, // show border if selected
          borderColor: selected ? "#fff" : "transparent",
        }}
      >
        <LinearGradient
          colors={colors}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 24,
          }}
        >
          <Text style={{
            fontSize: 50,
            marginBottom: 4
          }}>{emoji}</Text>
          <Text style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            textShadowColor: "rgba(0,0,0,0.42)",
            textShadowOffset: { width: 0, height: 3 },
            textShadowRadius: 4,
          }}>
            {label}
          </Text>
        </LinearGradient>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}
