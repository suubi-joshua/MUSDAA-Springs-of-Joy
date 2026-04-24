/**
 * Search Bar Component
 * Reusable search input with clear button
 */

import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme'
import { useThemeMode } from '../theme/ThemeContext'

interface Props {
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  onClear?: () => void
}

const SearchBar: React.FC<Props> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
}) => {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'

  const bgColor = isDark ? colors.darkSecondaryBg : colors.white
  const textColor = isDark ? colors.darkText : colors.black
  const iconColor = isDark ? colors.lightGrey : colors.grey

  return (
    <View
      className="flex-row items-center rounded-2xl mx-4 mt-4 mb-3 px-4 h-12 shadow-md"
      style={{ backgroundColor: bgColor }}
    >
      <Ionicons name="search" size={22} color={iconColor} style={{ marginRight: 8 }} />

      <TextInput
        className="flex-1 text-base"
        style={{ color: textColor }}
        placeholder={placeholder}
        placeholderTextColor={iconColor}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="never"
        autoCapitalize="none"
        testID="search-input"
      />

      {value !== '' && (
        <TouchableOpacity className="p-2 ml-2" onPress={onClear} testID="clear-search">
          <Ionicons name="close-circle" size={22} color={iconColor} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
