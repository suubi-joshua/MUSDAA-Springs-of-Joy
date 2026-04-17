/**
 * Hymn Detail Screen
 * Shows full hymn lyrics with title in header
 */

import React, { useEffect, useState } from 'react'
import {
  Animated,
  Easing,
  Pressable,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { useBookmarks } from '../hooks/useBookmarks'
import { colors } from '../theme'
import { useThemeMode } from '../theme/ThemeContext'
import { Hymn } from '../types'

const HymnDetailScreen = ({ route, navigation }: any) => {
  const { id, title, body } = route.params as Hymn
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { mode } = useThemeMode()
  const [bookmarked, setBookmarked] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [showTypeScale, setShowTypeScale] = useState(false)
  const [scaleAnimation] = useState(new Animated.Value(0))

  const isDark = mode === 'dark'
  const screenBg = isDark ? colors.darkBg : colors.white
  const bodyTextColor = isDark ? colors.darkText : colors.black
  const popoverBg = isDark ? '#202020' : colors.white
  const popoverBorder = isDark ? '#3A3A3A' : '#E5E7EB'

  useEffect(() => {
    const checkBookmark = async () => {
      const marked = isBookmarked(id)
      setBookmarked(marked)
    }
    checkBookmark()
  }, [id, isBookmarked])

  const openTypeScale = () => {
    setShowTypeScale(true)
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start()
  }

  const closeTypeScale = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setShowTypeScale(false))
  }

  const handleToggleTypeScale = () => {
    if (showTypeScale) {
      closeTypeScale()
      return
    }
    openTypeScale()
  }

  useEffect(() => {
    // Header layout with protected, wrapping title and action icons.
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.primary,
        height: 96,
      },
      headerTitleContainerStyle: {
        left: 0,
        right: 0,
      },
      headerRightContainerStyle: {
        paddingRight: 24,
      },
      headerTitle: () => (
        <View style={{ flex: 1, marginHorizontal: 16, justifyContent: 'center' }}>
          <Text
            numberOfLines={2}
            style={{
              color: colors.white,
              fontWeight: '700',
              fontSize: 20,
              textAlignVertical: 'center',
            }}
          >
            {title}
          </Text>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center">
          <TouchableOpacity
            className="mr-3"
            onPress={handleToggleTypeScale}
            testID="type-scale-button"
          >
            <MaterialIcons name="format-size" size={24} color={colors.white} />
          </TouchableOpacity>
          <TouchableOpacity
            className="mr-3"
            onPress={handleToggleBookmark}
            testID="bookmark-button"
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <Ionicons name="share-social" size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} testID="back-button" className="ml-3">
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
      ),
    })
  }, [navigation, bookmarked, title, showTypeScale])

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmark({ id, title, body })
      setBookmarked(!bookmarked)
    } catch {
      Alert.alert('Error', 'Failed to update bookmark')
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${body}\n\nShared from Springs of Joy Hymnal`,
        title: title,
      })
    } catch (err) {
      console.error('Share error:', err)
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: screenBg }} testID="hymn-detail">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 64 }}
        showsVerticalScrollIndicator={true}
        testID="hymn-scroll"
      >
        <Text
          style={{ fontSize }}
          className="text-brand-green font-extrabold mb-5 text-center"
          testID="hymn-title"
        >
          {title}
        </Text>
        <Text
          style={{ fontSize, lineHeight: Math.round(fontSize * 1.75), color: bodyTextColor }}
          className="text-left mt-3"
          testID="hymn-body"
        >
          {body}
        </Text>
      </ScrollView>

      {showTypeScale && (
        <View className="absolute inset-0 justify-end" testID="type-scale-control">
          <Pressable className="absolute inset-0 bg-black/30" onPress={closeTypeScale} />
          <Animated.View
            style={{
              marginHorizontal: 16,
              marginBottom: 24,
              backgroundColor: popoverBg,
              borderColor: popoverBorder,
              borderWidth: 1,
              borderRadius: 20,
              paddingHorizontal: 16,
              paddingVertical: 14,
              opacity: scaleAnimation,
              transform: [
                {
                  translateY: scaleAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [42, 0],
                  }),
                },
              ],
            }}
          >
            <TouchableOpacity
              onPress={closeTypeScale}
              testID="close-type-scale"
              className="absolute top-2 right-2"
            >
              <Ionicons name="close" size={20} color={bodyTextColor} />
            </TouchableOpacity>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity
                onPress={() => setFontSize(Math.max(14, fontSize - 2))}
                testID="decrease-font"
              >
                <Text style={{ color: bodyTextColor, fontSize: 14, fontWeight: 'bold' }}>A-</Text>
              </TouchableOpacity>
              <Slider
                style={{ flex: 1, height: 40, marginHorizontal: 10 }}
                value={fontSize}
                minimumValue={14}
                maximumValue={34}
                step={1}
                onValueChange={setFontSize}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={isDark ? '#5A5A5A' : '#D1D5DB'}
                thumbTintColor={colors.primary}
              />
              <TouchableOpacity
                onPress={() => setFontSize(Math.min(34, fontSize + 2))}
                testID="increase-font"
              >
                <Text style={{ color: bodyTextColor, fontSize: 18, fontWeight: 'bold' }}>A+</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  )
}

export default HymnDetailScreen
