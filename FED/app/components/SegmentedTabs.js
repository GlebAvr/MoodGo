// components/SegmentedTabs.js
import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

// Use a PNG for Apple, emoji for others (you can switch to PNGs for others as well)
const PLATFORM_ICONS = {
  amazon: { type: "image", value: require('../../assets/images/amazon.png')},
  apple: { type: "image", value: require('../../assets/images/apple.png') },
  spotify: { type: "image", value: require('../../assets/images/spotify.png')},
};

export default function SegmentedTabs({ tabs, selected, onChange }) {
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "#e5e7eb",
        borderRadius: 12,
        padding: 3,
        alignSelf: "center",
        marginTop: 14,
        marginBottom: 10,
      }}
    >
      {tabs.map((tab) => {
        const isSelected = selected.includes(tab.key);
        const icon = PLATFORM_ICONS[tab.key];

        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => {
              if (isSelected) onChange(selected.filter((k) => k !== tab.key));
              else onChange([...selected, tab.key]);
            }}
            style={{
              backgroundColor: isSelected ? "#fff" : "transparent",
              borderRadius: 10,
              marginHorizontal: 2,
              paddingVertical: 7,
              paddingHorizontal: 14,
              justifyContent: "center",
              alignItems: "center",
              shadowColor: isSelected ? "#000" : "transparent",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: isSelected ? 0.09 : 0,
              shadowRadius: 6,
              elevation: isSelected ? 2 : 0,
              minWidth: 38,
              minHeight: 34,
            }}
            activeOpacity={0.82}
          >
            {icon?.type === "image" ? (
              <Image
                source={icon.value}
                style={{
                  width: 24,
                  height: 24,
                  resizeMode: "contain",
                  tintColor: undefined, // remove for original logo color
                }}
              />
            ) : (
              <Text
                style={{
                  fontSize: 22,
                  color: isSelected ? "#0284c7" : "#374151",
                  fontWeight: isSelected ? "bold" : "500",
                  textAlignVertical: "center",
                  textAlign: "center",
                }}
              >
                {icon?.value || "?"}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
