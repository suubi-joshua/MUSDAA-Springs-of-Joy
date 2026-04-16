/**
 * Home Screen
 * Lists all hymns (initially 1-50), with infinite scroll
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useHymns } from '../hooks/useHymns';
import HymnListItem from '../components/HymnListItem';
import { Hymn } from '../types';
import { colors } from '../theme';

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
      <View className="py-lg justify-center items-center">
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={hymns}
        renderItem={({ item }) => (
          <HymnListItem
            hymn={item}
            onPress={() => handleSelectHymn(item)}
          />
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 }}
        scrollIndicatorInsets={{ right: 1 }}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export default HomeScreen;
