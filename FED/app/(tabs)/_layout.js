import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

const ACTIVE_BG = "#0ea5e9";    // Color when tab is selected (active)
const INACTIVE_BG = "#0284c7";  // Color when tab is not selected
const ACTIVE_ICON = "#fff";     // Icon color when focused
const INACTIVE_ICON = "#dbeafe";// Icon color when not focused

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",           // White icons/text when selected
        tabBarInactiveTintColor: "#bae6fd",      // Light blue for unselected tabs
        tabBarStyle: {
        backgroundColor: "#0284c7",
        // borderTopLeftRadius: 18,
        // borderTopRightRadius: 18,
        height: 75,
        position: "absolute",
        left: 16,   // add left/right to shrink width, optional
        right: 16,
        bottom: 0, // instead of 0, push it up 16px
        marginBottom: 0, // you can also use this to push it up further
        borderTopWidth: -20,
        elevation: 12,
        shadowColor: "#000",
        shadowOpacity: 0.09,
        shadowOffset: { width: 0, height: -3 },
        shadowRadius: 14,
        },
        tabBarLabelStyle: {
          fontWeight: "bold",
          fontSize: 14,
          marginBottom: 0,
        },
        tabBarIconStyle: {
          marginTop: 5,
          marginBottom: 0
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
             name={focused ? "home" : "home-outline"}
             size={focused ? 32 : 28}
             color={color}
             style={{ marginTop: focused ? -3 : 0 }}  />
          ),
        }}
      />
      <Tabs.Screen
        name="mood"
        options={{
          title: 'Mood',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "happy" : "happy-outline"}
            size={focused ? 32 : 28} 
            color={color}
            style={{ marginTop: focused ? -3 : 0 }} />
          ),
        }}
      />
      <Tabs.Screen
        name="results"
        options={{
          title: 'Playlist',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "musical-notes" : "musical-notes-outline"}
            size={focused ? 32 : 28} 
            color={color}
            style={{ marginTop: focused ? -3 : 0 }}  />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons 
            name={focused ? "person" : "person-outline"}
            size={focused ? 32 : 28} 
            color={color}
            style={{ marginTop: focused ? -3 : 0 }}  />
          ),
        }}
      />
    </Tabs>
  );
}
