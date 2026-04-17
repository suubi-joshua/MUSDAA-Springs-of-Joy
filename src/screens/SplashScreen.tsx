/**
 * Splash Screen
 * Minimal splash with animated text
 */

import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import Animated, { FadeInUp } from 'react-native-reanimated'

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Navigate after splash timeout
    const timer = setTimeout(() => {
      navigation?.replace('GetStarted')
    }, 2500)

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    <View className="flex-1 bg-brand-green justify-center items-center">
      <Animated.View entering={FadeInUp.duration(1200)} className="px-10">
        <Text className="text-3xl font-extrabold text-white text-center">We are His hands</Text>
      </Animated.View>
    </View>
  )
}

export default SplashScreen
