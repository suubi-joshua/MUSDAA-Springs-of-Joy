/**
 * Bookmarks Screen
 * Display user's bookmarked hymns
 */

import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { colors, spacing } from '../theme';
import { useBookmarks } from '../hooks/useBookmarks';
import HymnListItem from '../components/HymnListItem';
import { Hymn } from '../types';

const BookmarksScreen = ({ navigation }: any) => {
  const { bookmarkedHymns, loading, loadBookmarks } = useBookmarks();
  const [refreshing, setRefreshing] = React.useState(false);

  // Reload bookmarks when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks();
    }, [loadBookmarks])
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadBookmarks();
    setRefreshing(false);
  };

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    });
  };

  if (loading && bookmarkedHymns.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (bookmarkedHymns.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            You haven't bookmarked any hymns yet
          </Text>
          <Text style={styles.emptySubtext}>
            Tap the bookmark icon while viewing a hymn to save it here
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={bookmarkedHymns}
        renderItem={({ item }) => (
          <HymnListItem
            hymn={item}
            onPress={() => handleSelectHymn(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollIndicatorInsets={{ right: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.darkGrey,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.grey,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});

export default BookmarksScreen;
