/**
 * Search Screen
 * Search hymns by title and body text
 */

import React from 'react'
import { View, FlatList, Text, ActivityIndicator } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { colors } from '../theme'
import { useSearch } from '../hooks/useSearch'
import SearchBar from '../components/SearchBar'
import HymnListItem from '../components/HymnListItem'
import { Hymn } from '../types'
import { useThemeMode } from '../theme/ThemeContext'

const SearchScreen = ({ navigation }: any) => {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const { query, results, loading, handleSearch, clearSearch } = useSearch()

  useFocusEffect(
    React.useCallback(() => {
      clearSearch()
    }, [])
  )

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    })
  }

  const bgColor = isDark ? colors.darkBg : colors.lightGrey
  const textColor = isDark ? colors.darkText : colors.grey

  return (
    <View className="flex-1" style={{ backgroundColor: bgColor }}>
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
          <Text className="text-base text-center" style={{ color: textColor }}>
            Enter a hymn title or keyword to search
          </Text>
        </View>
      )}

      {!loading && query !== '' && results.length === 0 && (
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-base text-center" style={{ color: textColor }}>
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
          testID="search-results"
        />
      )}
    </View>
  )
}

export default SearchScreen
