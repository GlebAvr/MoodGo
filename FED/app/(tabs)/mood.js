import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import AnimatedMoodButton from "../components/animatedMoodButton";
import appleLogo from '../../assets/images/apple.png';
import amazonLogo from '../../assets/images/amazon.png';
import spotifyLogo from '../../assets/images/spotify.png';
import { Image } from "react-native"
const GENRES = [
  "Pop", "Rock", "Hip-Hop", "Electronic", "Indie", "Metal", "Punk", "Classical",
  "Alternative", "Chill", "Country", "Techno"
];
const PLATFORMS = [
  { label: "Amazon", key: "amazon", color: ["#232f3e", "#000000"], image: amazonLogo},
  { label: "Apple", key: "apple", color: ["#000000", "#000000"], image: appleLogo  },
  { label: "Spotify", key: "spotify", color: ["#1db954", "#000000"], image: spotifyLogo },
];

export default function MoodScreen() {
  const router = useRouter();
  const [selectedMood, setSelectedMood] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const [showPlatforms, setShowPlatforms] = useState(false);
  const [loading, setLoading] = useState(false);

  // Animation refs
  const moodTranslateY = useRef(new Animated.Value(0)).current;
  const genresOpacity = useRef(new Animated.Value(0)).current;
  const genresTranslateY = useRef(new Animated.Value(0)).current;
  const platformsOpacity = useRef(new Animated.Value(0)).current;
  const spinAnim = useRef(new Animated.Value(0)).current;

  // Animate mood grid up and genres fade in
  useEffect(() => {
    if (selectedMood && !showGenres) {
      Animated.timing(moodTranslateY, {
        toValue: -15, // Adjusted this based on previous conversation
        duration: 320,
        useNativeDriver: true,
      }).start(() => {
        setShowGenres(true);
        Animated.timing(genresOpacity, {
          toValue: 1,
          duration: 280,
          useNativeDriver: true,
        }).start();
      });
    }
    if (!selectedMood && showGenres) {
      Animated.timing(genresOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setShowGenres(false);
        Animated.timing(moodTranslateY, {
          toValue: 0,
          duration: 320,
          useNativeDriver: true,
        }).start();
        setSelectedGenres([]);
        setShowPlatforms(false);
        setSelectedPlatforms([]);
      });
    }
    if (!selectedMood && !showGenres) {
      moodTranslateY.setValue(0);
      genresOpacity.setValue(0);
      setSelectedGenres([]);
      setShowPlatforms(false);
      setSelectedPlatforms([]);
    }
  }, [selectedMood]);

  // Animate genre section up when genres are selected
  useEffect(() => {
    if (selectedGenres.length > 0 && showGenres) {
        Animated.timing(genresTranslateY, {
            toValue: -35,
            duration: 320,
            useNativeDriver: true,
        }).start();
    } else if (selectedGenres.length === 0 && showGenres) {
        Animated.timing(genresTranslateY, {
            toValue: 0,
            duration: 320,
            useNativeDriver: true,
        }).start();
    }
  }, [selectedGenres, showGenres]);


  // Animate platform fade-in when genres selected
  useEffect(() => {
    if (selectedGenres.length > 0 && !showPlatforms) {
      setShowPlatforms(true);
      platformsOpacity.setValue(0);
      Animated.timing(platformsOpacity, {
        toValue: 1,
        duration: 280,
        useNativeDriver: true,
      }).start();
    } else if (selectedGenres.length === 0 && showPlatforms) {
      Animated.timing(platformsOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setShowPlatforms(false);
        setSelectedPlatforms([]);
      });
    }
  }, [selectedGenres, showPlatforms]);

  // Mood emoji spinner for loading
  useEffect(() => {
    if (loading && selectedMood) {
      Animated.loop(
        Animated.timing(spinAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true
        })
      ).start();
    } else {
      spinAnim.setValue(0);
    }
  }, [loading, selectedMood]);

  const moods = [
    { label: "Bad", emoji: "😠", color: ["#f87171", "#facc15"] },
    { label: "Sad", emoji: "😢", color: ["#60a5fa", "#818cf8"] },
    { label: "Normal", emoji: "😐", color: ["#a3a3a3", "#f3f4f6"] },
    { label: "Good", emoji: "🙂", color: ["#34d399", "#6ee7b7"] },
    { label: "Wonderful", emoji: "😄", color: ["#fbbf24", "#f472b6"] },
    { label: "Energetic", emoji: "⚡️", color: ["#7c3aed", "#0f172a"] }
  ];

  const handleMoodPress = (m) => {
    if (selectedMood && selectedMood.label === m.label) {
      setSelectedMood(null);
    } else {
      setSelectedMood(m);
    }
  };

  const toggleGenre = (genre) => {
    setSelectedGenres(prev => {
      if (prev.includes(genre)) return prev.filter(g => g !== genre);
      if (prev.length >= 5) return prev;
      return [...prev, genre];
    });
  };

  const togglePlatform = (key) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(key)) return prev.filter(k => k !== key);
      return [...prev, key];
    });
  };

  const handleSubmit = () => {
    if (!selectedPlatforms.length) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push({
        pathname: "/results",
        params: {
          mood: selectedMood.label,
          genres: selectedGenres.join(","),
          platforms: selectedPlatforms.join(","),
        }
      });
    }, 2000);
  };

  return (
    <LinearGradient colors={["#0369a1", "#bae6fd"]} style={{ flex: 1 }}>
      <TouchableWithoutFeedback onPress={() => setSelectedMood(null)}>
        <View style={{ flex: 1 }}>
          <View style={{ paddingTop: 44, paddingHorizontal: 16 }}>
            <Text style={{
              fontSize: 32,
              color: "#fff",
              textAlign: "center",
              marginBottom: 22,
              fontWeight: "bold"
            }}>
              What’s your mood?
            </Text>
          </View>
          {!loading && (
            <ScrollView
              contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-start", alignItems: "stretch" }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              {/* Mood grid */}
              <Animated.View
                style={{
                  transform: [{ translateY: moodTranslateY }],
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  minHeight: 220,
                }}
                onStartShouldSetResponder={() => true}
                onResponderStart={e => e.stopPropagation()}
              >
                {moods.map((m, i) => (
                  <AnimatedMoodButton
                    key={i}
                    label={m.label}
                    emoji={m.emoji}
                    colors={m.color}
                    onPress={() => handleMoodPress(m)}
                    selected={selectedMood && selectedMood.label === m.label}
                    disabled={selectedMood && selectedMood.label !== m.label}
                  />
                ))}
              </Animated.View>
              {/* Genres */}
              {showGenres && (
                <Animated.View
                  style={{
                    opacity: genresOpacity,
                    marginTop: 38,
                    alignItems: "center",
                    transform: [{ translateY: genresTranslateY }],
                  }}
                  onStartShouldSetResponder={() => true}
                  onResponderStart={e => e.stopPropagation()}
                >
                  <Text style={{
                    color: "#fff",
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 18,
                    textShadowColor: "rgba(0,0,0,0.28)",
                    textShadowOffset: { width: 0, height: 2 },
                    textShadowRadius: 6,
                  }}>
                    Choose up to 5 genres:
                  </Text>
                  <View style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginBottom: 24,
                  }}>
                    {GENRES.map((genre) => {
                      const isSelected = selectedGenres.includes(genre);
                      const isDisabled =
                        selectedGenres.length >= 5 && !isSelected;
                      return (
                        <TouchableOpacity
                          key={genre}
                          onPress={() => toggleGenre(genre)}
                          disabled={isDisabled}
                          style={{
                            backgroundColor: isSelected ? "#0284c7" : "#fff",
                            borderRadius: 16,
                            paddingVertical: 10,
                            paddingHorizontal: 18,
                            margin: 6,
                            borderWidth: 2,
                            borderColor: "#0284c7",
                            opacity: isDisabled ? 0.4 : 1,
                          }}
                        >
                          <Text style={{
                            color: isSelected ? "#fff" : "#0284c7",
                            fontWeight: "bold"
                          }}>
                            {genre}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </Animated.View>
              )}
              {/* Platforms */}
              <Animated.View
                style={{
                  opacity: platformsOpacity,
                  // >>> CHANGE THIS MARGIN TOP TO ADJUST VERTICAL POSITION <<<
                  marginTop: -55, // Example: Increased from 8 to 20 to move it down
                  alignItems: "center",
                  display: showPlatforms ? "flex" : "none",
                  backgroundColor: "rgba(255,0,0,0.0)",
                }}
                pointerEvents={showPlatforms ? "auto" : "none"}
                onStartShouldSetResponder={() => true}
                onResponderStart={e => e.stopPropagation()}
              >
                {/* >>> ADD THE NEW TEXT HERE <<< */}
                <Text style={{
                  color: "#fff",
                  fontSize: 22,
                  fontWeight: "bold",
                  marginBottom: 18, // Adjust spacing below text
                  textShadowColor: "rgba(0,0,0,0.28)",
                  textShadowOffset: { width: 0, height: 2 },
                  textShadowRadius: 6,
                }}>
                  Choose your platform:
                </Text>
                <View style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  marginBottom: 24,
                }}>
                  {PLATFORMS.map((plat) => {
                    const isSelected = selectedPlatforms.includes(plat.key);
                    return (
                      <TouchableOpacity
                        key={plat.key}
                        onPress={() => togglePlatform(plat.key)}
                        style={{
                          width: 110,
                          height: 110,
                          margin: 10,
                          borderRadius: 24,
                          overflow: "hidden",
                          borderWidth: isSelected ? 3 : 0,
                          borderColor: isSelected ? "#fff" : "transparent",
                          opacity: isSelected ? 1 : 0.4,
                          backgroundColor:
                          plat.key === 'amazon'
    ? (isSelected ? "#FF9900" : "#fff")
    : plat.key === 'apple'
      ? "#fff"
      : isSelected
        ? plat.color[0]
        : "#fff",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
{plat.image ? (
  <Image
    source={plat.image}
    style={{ width: 32, height: 32, marginBottom: 8, resizeMode: "contain" }}
  />
) : (
  <Text style={{ fontSize: 38, marginBottom: 8 }}>{plat.emoji}</Text>
)}
                        <Text style={{
                          color: plat.key === 'apple' ? "#000000" : (isSelected ? "#fff" : plat.color[1]),
                          fontWeight: "bold",
                          fontSize: 20,
                          textShadowColor: isSelected ? "rgba(0,0,0,0.22)" : "transparent",
                          textShadowOffset: { width: 0, height: 2 },
                          textShadowRadius: 6,
                        }}>
                          {plat.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
                <TouchableOpacity
                  onPress={handleSubmit}
                  disabled={selectedPlatforms.length === 0}
                  style={{
                    backgroundColor: selectedPlatforms.length === 0 ? "#94a3b8" : "#fff",
                    paddingHorizontal: 38,
                    paddingVertical: 16,
                    borderRadius: 22,
                    opacity: selectedPlatforms.length === 0 ? 0.6 : 1,
                    borderWidth: 2, // Thickness of the border (e.g., 2 pixels)
    borderColor: selectedPlatforms.length === 0 ? "#6b7280" : "#0284c7"
                  }}
                >
                  <Text style={{
                    color: selectedPlatforms.length === 0 ? "#fff" : "#0284c7",
                    fontWeight: "bold",
                    fontSize: 18,
                    textAlign: "center"
                  }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </Animated.View>
            </ScrollView>
          )}
          {/* Loading spinner */}
          {loading && (
            <View style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}>
              {selectedMood && (
                <Animated.Text
                  style={{
                    fontSize: 70,
                    transform: [{
                      rotate: spinAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '360deg'],
                      })
                    }]
                  }}
                >
                  {selectedMood.emoji}
                </Animated.Text>
              )}
              <Text style={{
                color: "#fff",
                marginTop: 20,
                fontSize: 18
              }}>
                Loading playlist for {selectedMood?.label}…
              </Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
    </LinearGradient>
  );
}