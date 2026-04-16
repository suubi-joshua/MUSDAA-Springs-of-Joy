/**
 * Hymn Detail Screen
 * Shows full hymn lyrics with title in header
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookmarks } from '../hooks/useBookmarks';
import { colors } from '../theme';
import { Hymn } from '../types';

const HymnDetailScreen = ({ route, navigation }: any) => {
  const { id, title, body } = route.params as Hymn;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  useEffect(() => {
    const checkBookmark = async () => {
      const marked = isBookmarked(id);
      setBookmarked(marked);
    };
    checkBookmark();
  }, [id, isBookmarked]);

  useEffect(() => {
    // Set up header right button for bookmark
    navigation.setOptions({
      headerRight: () => (
        <View className="flex-row gap-md mr-md">
          <TouchableOpacity
            className="p-sm"
            onPress={handleToggleBookmark}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            className="p-sm"
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
  }, [navigation, bookmarked]);

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

  const increaseFontSize = () => {
    setFontSize(prev => Math.min(prev + 2, 32));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, 12));
  };

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ padding: 24, paddingBottom: 48 }}
        showsVerticalScrollIndicator={true}
      >
        <Text 
          style={{ fontSize }}
          className="text-brand-green font-bold mb-lg text-center"
        >
          {title}
        </Text>
        <Text 
          style={{ fontSize, lineHeight: 28 }}
          className="text-black text-left mt-md"
        >
          {body}
        </Text>
      </ScrollView>

      {/* Font Size Controls */}
      <View className="flex-row justify-center items-center px-lg py-md bg-gray-100 border-t border-gray-300 gap-lg">
        <TouchableOpacity
          className="p-sm"
          onPress={decreaseFontSize}
        >
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text className="text-sm text-gray-500 min-w-10 text-center">
          {Math.round(fontSize)}
        </Text>

        <TouchableOpacity
          className="p-sm"
          onPress={increaseFontSize}
        >
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HymnDetailScreen;
