import React from 'react'
import { SafeAreaView, View, ImageBackground, Image, Text, TouchableOpacity } from 'react-native'

const GetStarted = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation?.replace('MainTabs')
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ImageBackground
        source={require('../../assets/FingerPrint.jpg')}
        resizeMode={'stretch'}
        className="flex-1 justify-center w-full h-full"
      >
        <View className="h-56" />

        <View className="flex-1 items-center">
          <Image
            source={require('../../assets/Logo-Components.png')}
            resizeMode={'stretch'}
            className="w-52 h-32 -mt-24"
          />
          <Text className="text-white text-5xl font-bold m-5">Welcome</Text>
          <Text className="text-gray-100 text-base mb-5">We are His Hands</Text>

          <TouchableOpacity
            onPress={handleGetStarted}
            className="h-16 self-stretch justify-center items-center bg-brand-green rounded-3xl mx-4"
          >
            <Text className="text-white text-lg font-bold">Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default GetStarted
