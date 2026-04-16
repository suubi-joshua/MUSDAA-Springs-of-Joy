/**
 * Hymn Detail Screen
 * Shows full hymn lyrics with title in header
 */

import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { useBookmarks } from '../hooks/useBookmarks';
import { colors } from '../theme';
import { useThemeMode } from '../theme/ThemeContext';
import { Hymn } from '../types';

const HymnDetailScreen = ({ route, navigation }: any) => {
  const { id, title, body } = route.params as Hymn;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { mode } = useThemeMode();
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [showTypeScale, setShowTypeScale] = useState(false);
  const [scaleAnimation] = useState(new Animated.Value(0));

  const isDark = mode === 'dark';
  const screenBg = isDark ? colors.darkBg : colors.white;
  const bodyTextColor = isDark ? colors.darkText : colors.black;
  const popoverBg = isDark ? '#202020' : colors.white;
  const popoverBorder = isDark ? '#3A3A3A' : '#E5E7EB';

  useEffect(() => {
    const checkBookmark = async () => {
      const marked = isBookmarked(id);
      setBookmarked(marked);
    };
    checkBookmark();
  }, [id, isBookmarked]);

  const openTypeScale = () => {
    setShowTypeScale(true);
    Animated.timing(scaleAnimation, {
      toValue: 1,
      duration: 220,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  };

  const closeTypeScale = () => {
    Animated.timing(scaleAnimation, {
      toValue: 0,
      duration: 180,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => setShowTypeScale(false));
  };

  const handleToggleTypeScale = () => {
    if (showTypeScale) {
      closeTypeScale();
      return;
    }
    openTypeScale();
  };

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
            style={{ color: colors.white, fontWeight: '700', fontSize: 20, textAlignVertical: 'center' }}
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
          >
            <MaterialIcons
              name="format-size"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="mr-3"
            onPress={handleToggleBookmark}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleShare}
          >
            <Ionicons
              name="share-social"
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, bookmarked, title, showTypeScale]);

  const handleToggleBookmark = async () => {
    try {
      await toggleBookmark({ id, title, body });
      setBookmarked(!bookmarked);
    } catch (err) {
      Alert.alert('Error', 'Failed to update bookmark');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `${title}\n\n${body}\n\nShared from Springs of Joy Hymnal`,
        title: title,
      });
    } catch (err) {
      console.error('Share error:', err);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: screenBg }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 64 }}
        showsVerticalScrollIndicator={true}
      >
        <Text
          style={{ fontSize }}
          className="text-brand-green font-extrabold mb-5 text-center"
        >
          {title}
        </Text>
        <Text
          style={{ fontSize, lineHeight: Math.round(fontSize * 1.75), color: bodyTextColor }}
          className="text-left mt-3"
        >
          {body}
        </Text>
      </ScrollView>

      {showTypeScale && (
        <View className="absolute inset-0 justify-end">
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
            <View className="flex-row items-center">
              <Text style={{ color: bodyTextColor, fontSize: 14, marginRight: 10 }}>A</Text>
              <Slider
                style={{ flex: 1, height: 40 }}
                value={fontSize}
                minimumValue={14}
                maximumValue={34}
                step={1}
                onValueChange={setFontSize}
                minimumTrackTintColor={colors.primary}
                maximumTrackTintColor={isDark ? '#5A5A5A' : '#D1D5DB'}
                thumbTintColor={colors.primary}
              />
              <Text style={{ color: bodyTextColor, fontSize: 24, fontWeight: '800', marginLeft: 10 }}>A</Text>
            </View>
          </Animated.View>
        </View>
      )}
    </View>
  );
};

export default HymnDetailScreen;
