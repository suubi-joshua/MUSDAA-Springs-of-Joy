/**
 * Search Screen
 * Search hymns by title and body text
 */

import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { colors, spacing } from '../theme';
import { useSearch } from '../hooks/useSearch';
import SearchBar from '../components/SearchBar';
import HymnListItem from '../components/HymnListItem';
import { Hymn } from '../types';

const { width } = Dimensions.get('window');

const SearchScreen = ({ navigation }: any) => {
  const { query, results, loading, handleSearch, clearSearch } = useSearch();

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    });
  };

  return (
    <View style={styles.container}>
      <SearchBar
        placeholder="Search by title or lyrics..."
        value={query}
        onChangeText={handleSearch}
        onClear={clearSearch}
      />

      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        </View>
      )}

      {!loading && query === '' && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            Enter a hymn title or keyword to search
          </Text>
        </View>
      )}

      {!loading && query !== '' && results.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No hymns found matching "{query}"
          </Text>
        </View>
      )}

      {!loading && results.length > 0 && (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <HymnListItem
              hymn={item}
              onPress={() => handleSelectHymn(item)}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.listContent}
          scrollIndicatorInsets={{ right: 1 }}
        />
      )}
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
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyText: {
    fontSize: 16,
    color: colors.grey,
    textAlign: 'center',
  },
  listContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});

export default SearchScreen;
