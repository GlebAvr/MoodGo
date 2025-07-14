// app/(tabs)/results.js
import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Linking,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import tw from "tailwind-react-native-classnames";
import { getSongsForMood } from "../../services/api";
import { SafeAreaView } from 'react-native-safe-area-context';
import SegmentedTabs from "../components/SegmentedTabs";

export default function ResultsScreen() {
  const { mood, platforms } = useLocalSearchParams();
  const platformArray = platforms ? platforms.split(',') : [];
  const router = useRouter();
  const scrollViewRef = useRef();

  // You can tweak this for button/bar spacing!
  const BAR_PADDING_VERTICAL = 0  // vertical padding inside the flat white bar

  // SegmentedTabs definitions
  const tabDefs = platformArray.map((plat) => ({ key: plat }));
  const [selectedPlatforms, setSelectedPlatforms] = useState([...platformArray]);
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch playlists
  const fetchData = useCallback(() => {
    setLoading(true);
    setError(null);

    if (mood === "Not Found") {
      setTimeout(() => {
        setLoading(false);
        setError("Demo error");
      }, 500);
      return;
    }

    getSongsForMood(mood, platformArray)
      .then(res => {
        setPlaylists(Array.isArray(res) ? res : []);
      })
      .catch(err => {
        console.error(err);
        setError(err.message || "Something went wrong");
      })
      .finally(() => setLoading(false));
  }, [mood, platforms]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Filter playlists by selected platform(s)
  const filteredPlaylists = playlists.filter(
    (pl) =>
      pl.source &&
      selectedPlatforms.some(platform =>
        pl.source.toLowerCase().includes(platform.toLowerCase())
      )
  );

  // 1️⃣ Loading
  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        {/* Flat white bar at the top */}
        <View
          style={{
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderColor: "#e5e7eb",
            zIndex: 100,
          }}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: BAR_PADDING_VERTICAL,
            // Add a small drop shadow if you want separation
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 6,
          }}>
            {platformArray.length > 1 && (
              <SegmentedTabs
                tabs={tabDefs}
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
              />
            )}
          </View>
        </View>
        {/* Loading spinner on gradient */}
        <LinearGradient
          colors={["#0369a1", "#bae6fd"]}
          style={{ flex: 1, paddingTop: 14 }}
        >
          <ActivityIndicator size="large" color="#fff" />
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // 2️⃣ Error
  if (error) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderBottomWidth: 1,
            borderColor: "#e5e7eb",
            zIndex: 100,
          }}
        >
          <View style={{
            alignItems: "center",
            justifyContent: "center",
            paddingVertical: BAR_PADDING_VERTICAL,
            shadowColor: "#000",
            shadowOpacity: 0.05,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 6,
          }}>
            {platformArray.length > 1 && (
              <SegmentedTabs
                tabs={tabDefs}
                selected={selectedPlatforms}
                onChange={setSelectedPlatforms}
              />
            )}
          </View>
        </View>
        <LinearGradient colors={["#0369a1", "#bae6fd"]} style={{ flex: 1, paddingTop: 14 }}>
          <View style={[tw`w-full`, { height: '40%' }]}>
            <Image
              source={require('../../assets/images/error.png')}
              style={{ width: '100%', height: '100%' }}
              resizeMode="contain"
            />
          </View>
          <View style={tw`flex-1 justify-center items-center px-6`}>
            <Text style={tw`text-white text-2xl font-bold mb-4 text-center`}>
              Ooops, let's try again?
            </Text>
            <TouchableOpacity
              onPress={fetchData}
              style={tw`bg-white px-6 py-3 rounded-full`}
            >
              <Text style={tw`text-blue-600 text-lg font-semibold`}>
                Try again
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }

  // 3️⃣ Success
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* Flat white bar at the top */}
      <View
        style={{
          backgroundColor: "#fff",
          borderBottomWidth: 1,
          borderColor: "#e5e7eb",
          zIndex: 100,
        }}
      >
        <View style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: BAR_PADDING_VERTICAL,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 4,
          shadowOffset: { width: 0, height: 2 },
          elevation: 6,
        }}>
          {platformArray.length > 1 && (
            <SegmentedTabs
              tabs={tabDefs}
              selected={selectedPlatforms}
              onChange={setSelectedPlatforms}
            />
          )}
        </View>
      </View>
      <LinearGradient colors={["#0369a1", "#bae6fd"]} style={{ flex: 1 }}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={{
            paddingTop: 14, // gap below the bar before content
            paddingHorizontal: 20,
            paddingBottom: 32,
          }}
        >
          <Text style={[
            tw`text-4xl text-white text-center`,
            {
              fontFamily: 'Poppins_700Bold',
              textShadowColor: 'rgba(0,0,0,0.25)',
              textShadowOffset: { width: 0, height: 3 },
              textShadowRadius: 6,
              fontSize: 25,
              marginTop: -5
            }
          ]}>
            Here is your {mood} mood Playlist:
          </Text>

          {filteredPlaylists.length === 0 && (
            <Text style={{
              color: '#fff',
              textAlign: 'center',
              marginVertical: 30,
              fontSize: 18,
              fontWeight: '500',
              opacity: 0.7,
            }}>
              No playlists for selected platforms.
            </Text>
          )}

          {filteredPlaylists.map((pl, i) => (
            <View key={i} style={tw`bg-white rounded-lg mb-6 overflow-hidden`}>
              {/* Playlist image */}
              {pl.image && (
                <Image
                  source={{ uri: pl.image }}
                  style={{ width: "100%", height: 180 }}
                  resizeMode="cover"
                />
              )}

              <View style={tw`p-4`}>
                {/* Playlist name */}
                <View style={tw`flex-row items-center mb-2`}>
                  {/* Source logo */}
                  {pl.source === 'Apple' && (
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/120px-Apple_logo_black.svg.png' }}
                      style={{ width: 20, height: 20, marginRight: 8 }}
                      resizeMode="contain"
                    />
                  )}
                  {pl.source === 'Amazon' && (
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/256px-Amazon_logo.svg.png' }}
                      style={{ width: 20, height: 20, marginRight: 8 }}
                      resizeMode="contain"
                    />
                  )}
                  {pl.source === 'Spotify' && (
                    <Image
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg' }}
                      style={{ width: 20, height: 20, marginRight: -18 }}
                      resizeMode="contain"
                    />
                  )}
                  {/* Title text */}
                  <Text style={tw`text-lg font-semibold`}>
                    {pl.name}
                  </Text>
                </View>
                {/* Clickable link */}
                <TouchableOpacity
                  onPress={() => Linking.openURL(pl.url)}
                  style={{
                    backgroundColor: '#0284c7',
                    borderRadius: 16,
                    paddingVertical: 8,
                    paddingHorizontal: 18,
                    alignSelf: 'flex-start',
                    marginTop: 8,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.14,
                    shadowRadius: 4,
                    elevation: 2,
                  }}
                  activeOpacity={0.85}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontFamily: 'Poppins_700Bold',
                      fontSize: 9,
                      letterSpacing: 0.5,
                      textAlign: 'center',
                    }}
                  >
                    Open Playlist
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
        {/* Back to top button */}
        <View
          pointerEvents="box-none"
          style={{
            position: 'absolute',
            bottom: 85,
            left: 0,
            right: 0,
            alignItems: 'center',
            zIndex: 100,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              if (scrollViewRef.current) {
                scrollViewRef.current.scrollTo({ y: 0, animated: true });
              }
            }}
            style={[
              tw`px-4 py-2 rounded-full`,
              {
                backgroundColor: '#0284c7',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.14,
                shadowRadius: 4,
                elevation: 2,
              },
            ]}
            activeOpacity={0.85}
          >
            <Text style={[tw`text-white text-lg font-semibold`, { letterSpacing: 0.5 }]}>
              Back to top
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}
