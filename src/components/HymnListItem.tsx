/**
 * Hymn List Item Component
 * Reusable component for displaying a hymn in a list
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, shadows } from '../theme';
import { Hymn } from '../types';

interface Props {
  hymn: Hymn;
  onPress: () => void;
}

const HymnListItem: React.FC<Props> = ({ hymn, onPress }) => {
  // Extract first number from hymn ID for badge
  const hymnetNumber = hymn.id.toString();

  return (
    <TouchableOpacity
      style={[styles.container, shadows.sm]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{hymnetNumber}</Text>
      </View>

      <View style={styles.content}>
        <Text
          style={styles.title}
          numberOfLines={2}
        >
          {hymn.title}
        </Text>
        <Text
          style={styles.preview}
          numberOfLines={1}
        >
          {hymn.body.split('\n')[0]}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={20}
        color={colors.grey}
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginBottom: spacing.md,
    padding: spacing.md,
    alignItems: 'center',
  },
  badge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  badgeText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold' as any,
    color: colors.white,
  },
  content: {
    flex: 1,
    marginRight: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontWeight: '600' as any,
    color: colors.darkGrey,
    marginBottom: 4,
  },
  preview: {
    fontSize: typography.fontSize.sm,
    color: colors.grey,
  },
  chevron: {
    marginLeft: spacing.sm,
  },
});

export default HymnListItem;
