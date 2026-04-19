/**
 * Bookmarks Screen
 * Display user's bookmarked hymns
 */

import React from 'react'
import { View, FlatList, Text, ActivityIndicator, RefreshControl } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { colors } from '../theme'
import { useBookmarks } from '../hooks/useBookmarks'
import HymnListItem from '../components/HymnListItem'
import { Hymn } from '../types'
import { useThemeMode } from '../theme/ThemeContext'

const BookmarksScreen = ({ navigation }: any) => {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const { bookmarkedHymns, loading, loadBookmarks } = useBookmarks()
  const [refreshing, setRefreshing] = React.useState(false)

  // Reload bookmarks when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadBookmarks()
    }, [loadBookmarks])
  )

  const handleRefresh = async () => {
    setRefreshing(true)
    await loadBookmarks()
    setRefreshing(false)
  }

  const handleSelectHymn = (hymn: Hymn) => {
    navigation.navigate('HymnDetail', {
      id: hymn.id,
      title: hymn.title,
      body: hymn.body,
    })
  }

  const bgColor = isDark ? colors.darkBg : colors.lightGrey
  const textColor = isDark ? colors.darkText : colors.black
  const secondaryTextColor = isDark ? colors.darkText : colors.grey

  if (loading && bookmarkedHymns.length === 0) {
    return (
      <View className="flex-1 justify-center items-center" style={{ backgroundColor: bgColor }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    )
  }

  if (bookmarkedHymns.length === 0) {
    return (
      <View className="flex-1" style={{ backgroundColor: bgColor }}>
        <View className="flex-1 justify-center items-center px-8">
          <Text className="text-xl font-extrabold text-center mb-2" style={{ color: textColor }}>
            You haven't bookmarked any hymns yet
          </Text>
          <Text className="text-base text-center leading-6" style={{ color: secondaryTextColor }}>
            Tap the bookmark icon while viewing a hymn to save it here
          </Text>
        </View>
      </View>
    )
  }

  return (
    <View className="flex-1" style={{ backgroundColor: bgColor }} testID="bookmark-list">
      <FlatList
        data={bookmarkedHymns}
        renderItem={({ item }) => (
          <View testID="bookmark-item">
            <HymnListItem hymn={item} onPress={() => handleSelectHymn(item)} />
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 40 }}
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
  )
}

export default BookmarksScreen
