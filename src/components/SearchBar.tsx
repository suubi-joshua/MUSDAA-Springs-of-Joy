/**
 * Search Bar Component
 * Reusable search input with clear button
 */

import React from 'react'
import { View, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme'

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
  return (
    <View className="flex-row items-center bg-white rounded-2xl mx-4 mt-4 mb-3 px-4 h-12 shadow-md">
      <Ionicons name="search" size={22} color={colors.grey} style={{ marginRight: 8 }} />

      <TextInput
        className="flex-1 text-base text-gray-900"
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="never"
        autoCapitalize="none"
        testID="search-input"
      />

      {value !== '' && (
        <TouchableOpacity className="p-2 ml-2" onPress={onClear} testID="clear-search">
          <Ionicons name="close-circle" size={22} color={colors.grey} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar
