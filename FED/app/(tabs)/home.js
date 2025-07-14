import React from 'react';
import { View, Text, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'tailwind-react-native-classnames';

export default function Home() {
  return (
    <LinearGradient
      colors={['#0369a1', '#bae6fd']}
      style={tw`flex-1`}
    >
      <View style={{ flex: 1, justifyContent: "space-between", alignItems: "center", paddingVertical: 44 }}>
        {/* Picture on top */}
        <Image
          source={require('../../assets/images/singing.png')}
          style={{ width: 500, height: 500, marginTop: 40 }}
          resizeMode="contain"
        />
     <Text style={[
    tw`text-4xl text-white text-center`,
    {
      fontFamily: 'Poppins_700Bold',
      textShadowColor: 'rgba(0,0,0,0.25)',
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 6,
    }
  ]}
>
  Welcome to MoodGo!
</Text>
<Text
  style={[
    tw`text-base text-white mb-14`,
    {
      fontFamily: 'Poppins_700Bold',
      textShadowColor: 'rgba(0,0,0,0.2)',
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
      bottom: -25
    }
  ]}
>
  build version: 0.0.1
</Text>
      </View>
    </LinearGradient>
  );
}
