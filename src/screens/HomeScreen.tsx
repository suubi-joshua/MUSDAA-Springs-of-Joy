/**
 * Home Screen
 * Lists all hymns (initially 1-50), with infinite scroll
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useHymns } from '../hooks/useHymns';
import HymnListItem from '../components/HymnListItem';
import { Hymn } from '../types';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { hymns, totalCount, loading, error, loadMore } = useHymns();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (error) {
      Alert.alert('Error', error);
    }
  }, [error]);

  const handleLoadMore = async () => {
    if (isLoadingMore || hymns.length >= totalCount) return;

    setIsLoadingMore(true);
    try {
      await loadMore(50, hymns.length);
    } finally {
      setIsLoadingMore(false);
    }
  };

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    });
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={hymns}
        renderItem={({ item }) => (
          <HymnListItem
            hymn={item}
            onPress={() => handleSelectHymn(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContent}
        scrollIndicatorInsets={{ right: 1 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  footer: {
    paddingVertical: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
