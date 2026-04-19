/**
 * Hymn Detail Screen
 * Shows full hymn lyrics with title in header
 * Supports swipe navigation and floating search button
 */

import React, { useEffect, useState, useRef } from 'react'
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
  Dimensions,
  PanResponder,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'
import { useBookmarks } from '../hooks/useBookmarks'
import { colors } from '../theme'
import { useThemeMode } from '../theme/ThemeContext'
import { Hymn } from '../types'
import { getPreviousHymn, getNextHymn } from '../db/database'

const { width: SCREEN_WIDTH } = Dimensions.get('window')
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25

const HymnDetailScreen = ({ route, navigation }: any) => {
  const { id, title, body } = route.params as Hymn
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const { mode } = useThemeMode()
  const [bookmarked, setBookmarked] = useState(false)
  const [fontSize, setFontSize] = useState(16)
  const [showTypeScale, setShowTypeScale] = useState(false)
  const [scaleAnimation] = useState(new Animated.Value(0))
  const [showSearchButton, setShowSearchButton] = useState(false)
  const [currentHymn, setCurrentHymn] = useState({ id, title, body })

  const scrollViewRef = useRef<ScrollView>(null)
  const slideAnim = useRef(new Animated.Value(0)).current
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dx) > 10 && Math.abs(gestureState.dy) < 10
      },
      onPanResponderGrant: () => {
        slideAnim.setOffset(0)
      },
      onPanResponderMove: (_, gestureState) => {
        slideAnim.setValue(gestureState.dx)
      },
      onPanResponderRelease: async (_, gestureState) => {
        slideAnim.flattenOffset()
        if (gestureState.dx < -SWIPE_THRESHOLD) {
          await handleSwipeLeft()
        } else if (gestureState.dx > SWIPE_THRESHOLD) {
          await handleSwipeRight()
        } else {
          Animated.spring(slideAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    })
  ).current

  const isDark = mode === 'dark'
  const screenBg = isDark ? colors.darkBg : colors.white
  const bodyTextColor = isDark ? colors.darkText : colors.black
  const popoverBg = isDark ? '#202020' : colors.white
  const popoverBorder = isDark ? '#3A3A3A' : '#E5E7EB'
  const tabBg = isDark ? colors.darkSecondaryBg : colors.white
  const tabBorder = isDark ? colors.darkBg : colors.lightGrey

  // Hide tab bar when this screen is active, restore when leaving
  useFocusEffect(
    React.useCallback(() => {
      const parent = navigation.getParent()
      parent?.setOptions({ tabBarStyle: { display: 'none' } })

      return () => {
        parent?.setOptions({
          tabBarStyle: {
            backgroundColor: tabBg,
            borderTopColor: tabBorder,
            borderTopWidth: 1,
          },
        })
      }
    }, [navigation, tabBg, tabBorder])
  )

  useEffect(() => {
    const checkBookmark = async () => {
      const marked = isBookmarked(id)
      setBookmarked(marked)
    }
    checkBookmark()
  }, [id, isBookmarked])

  useEffect(() => {
    setCurrentHymn({ id, title, body })
  }, [id, title, body])

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

  const navigateToHymn = (hymn: Hymn) => {
    navigation.replace('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    })
  }

  const handleSwipeLeft = async () => {
    const next = await getNextHymn(currentHymn.id)
    if (next) {
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        slideAnim.setValue(SCREEN_WIDTH)
        navigateToHymn(next)
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
      })
    } else {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start()
      Alert.alert('End of Hymns', 'You have reached the last hymn.')
    }
  }

  const handleSwipeRight = async () => {
    const prev = await getPreviousHymn(currentHymn.id)
    if (prev) {
      Animated.timing(slideAnim, {
        toValue: SCREEN_WIDTH,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        slideAnim.setValue(-SCREEN_WIDTH)
        navigateToHymn(prev)
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start()
      })
    } else {
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start()
      Alert.alert('Start', 'You are on the first hymn.')
    }
  }

  const handleScroll = (event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent
    const isNearBottom = layoutMeasurement.height + contentOffset.y >= contentSize.height - 20
    setShowSearchButton(isNearBottom)
  }

  useEffect(() => {
    const headerBg = isDark ? colors.darkSecondaryBg : colors.primary
    navigation.setOptions({
      headerStyle: {
        backgroundColor: headerBg,
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
            {currentHymn.title}
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
  }, [navigation, bookmarked, currentHymn.title, showTypeScale, isDark])

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmark({ id: currentHymn.id, title: currentHymn.title, body: currentHymn.body })
      setBookmarked(!bookmarked)
    } catch {
      Alert.alert('Error', 'Failed to update bookmark')
    }
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${currentHymn.title}\n\n${currentHymn.body}\n\nShared from Springs of Joy Hymnal`,
        title: currentHymn.title,
      })
    } catch (err) {
      console.error('Share error:', err)
    }
  }

  const handleGoToSearch = () => {
    const parent = navigation.getParent()
    if (parent) {
      parent.navigate('SearchTab', { screen: 'SearchScreen' })
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: screenBg }} testID="hymn-detail">
      <Animated.View
        style={{
          flex: 1,
          transform: [{ translateX: slideAnim }],
        }}
        {...panResponder.panHandlers}
      >
        <ScrollView
          ref={scrollViewRef}
          className="flex-1"
          contentContainerStyle={{ padding: 24, paddingBottom: 100 }}
          showsVerticalScrollIndicator={true}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          testID="hymn-scroll"
        >
          <Text
            style={{ fontSize }}
            className="text-brand-green font-extrabold mb-5 text-center"
            testID="hymn-title"
          >
            {currentHymn.title}
          </Text>
          <Text
            style={{ fontSize, lineHeight: Math.round(fontSize * 1.75), color: bodyTextColor }}
            className="text-left mt-3"
            testID="hymn-body"
          >
            {currentHymn.body}
          </Text>
        </ScrollView>
      </Animated.View>

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
              <Text style={{ color: bodyTextColor, fontSize: 14, fontWeight: 'bold' }}>A</Text>
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
              <Text style={{ color: bodyTextColor, fontSize: 22, fontWeight: 'bold' }}>A</Text>
            </View>
          </Animated.View>
        </View>
      )}

      <View style={{ position: 'absolute', bottom: 24, right: 24 }}>
        <Animated.View
          style={{
            transform: [
              {
                translateY: showSearchButton ? 0 : 100,
              },
            ],
            opacity: showSearchButton ? 1 : 0,
          }}
        >
          <TouchableOpacity
            onPress={handleGoToSearch}
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              backgroundColor: colors.primary,
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: colors.black,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
          >
            <Ionicons name="search" size={24} color={colors.white} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  )
}

export default HymnDetailScreen
