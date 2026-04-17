/**
 * Search Screen
 * Search hymns by title and body text
 */

import React from 'react'
import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import { colors } from '../theme'
import { useSearch } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import HymnListItem from '../components/HymnListItem'
import { Hymn } from '../types'

const SearchScreen = ({ navigation }: any) => {
  const { query, results, loading, handleSearch, clearSearch } = useSearch()

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    })
  }

  return (
    <View className="flex-1 bg-gray-50">
      <SearchBar
        placeholder="Search by title or lyrics..."
        value={query}
        onChangeText={handleSearch}
        onClear={clearSearch}
      />

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}

      {!loading && query === '' && (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-base text-gray-600 text-center">
            Enter a hymn title or keyword to search
          </Text>
        </View>
      )}

      {!loading && query !== '' && results.length === 0 && (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-base text-gray-600 text-center">
            No hymns found matching "{query}"
          </Text>
        </View>
      )}

      {!loading && results.length > 0 && (
        <FlatList
          data={results}
          renderItem={({ item }) => (
            <HymnListItem hymn={item} onPress={() => handleSelectHymn(item)} />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 40 }}
          scrollIndicatorInsets={{ right: 1 }}
        />
      )}
    </View>
  )
}

export default SearchScreen
