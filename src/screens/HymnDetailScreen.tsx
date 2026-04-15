/**
 * Hymn Detail Screen
 * Shows full hymn lyrics with title in header
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useBookmarks } from '../hooks/useBookmarks';
import { colors, typography, spacing } from '../theme';
import { Hymn } from '../types';

const HymnDetailScreen = ({ route, navigation }: any) => {
  const { id, title, body } = route.params as Hymn;
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [bookmarked, setBookmarked] = useState(false);
  const [fontSize, setFontSize] = useState(typography.fontSize.base);

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
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={handleToggleBookmark}
          >
            <Ionicons
              name={bookmarked ? 'bookmark' : 'bookmark-outline'}
              size={24}
              color={colors.white}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.headerButton}
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
    setFontSize(prev => Math.min(prev + 2, typography.fontSize['3xl']));
  };

  const decreaseFontSize = () => {
    setFontSize(prev => Math.max(prev - 2, typography.fontSize.sm));
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={true}
      >
        <Text style={[styles.title, { fontSize }]}>{title}</Text>
        <Text style={[styles.body, { fontSize }]}>{body}</Text>
      </ScrollView>

      {/* Font Size Controls */}
      <View style={styles.controls}>
        <TouchableOpacity
          style={styles.controlButton}
          onPress={decreaseFontSize}
        >
          <Ionicons
            name="remove-circle-outline"
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.fontSizeLabel}>
          {Math.round(fontSize)}
        </Text>

        <TouchableOpacity
          style={styles.controlButton}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xl,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold' as any,
    color: colors.primary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  body: {
    fontSize: typography.fontSize.base,
    lineHeight: 28,
    color: colors.darkGrey,
    textAlign: 'left',
    marginTop: spacing.md,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.veryLightGrey,
    borderTopWidth: 1,
    borderTopColor: colors.lightGrey,
    gap: spacing.lg,
  },
  controlButton: {
    padding: spacing.sm,
  },
  fontSizeLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.grey,
    minWidth: 40,
    textAlign: 'center',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginRight: spacing.md,
  },
  headerButton: {
    padding: spacing.sm,
  },
});

export default HymnDetailScreen;
