/**
 * Hymn List Item Component
 * Reusable component for displaying a hymn in a list
 */

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme'
import { Hymn } from '../types'

interface Props {
  hymn: Hymn
  onPress: () => void
}

const HymnListItem: React.FC<Props> = ({ hymn, onPress }) => {
  // Extract first number from hymn ID for badge
  const hymnetNumber = hymn.id.toString()

  return (
    <TouchableOpacity
      className="flex-row items-center bg-white rounded-3xl mb-5 px-5 py-5 shadow-lg"
      onPress={onPress}
      activeOpacity={0.7}
      testID="hymn-item"
    >
      <View className="w-14 h-14 rounded-full bg-brand-green justify-center items-center mr-5">
        <Text className="text-xl font-extrabold text-white" testID="hymn-number">
          {hymnetNumber}
        </Text>
      </View>

      <View className="flex-1 pr-4">
        <Text
          className="text-xl font-extrabold text-gray-900 mb-1"
          numberOfLines={2}
          testID="hymn-title"
        >
          {hymn.title}
        </Text>
        <Text className="text-base text-gray-700" numberOfLines={1} testID="hymn-preview">
          {hymn.body.split('\n')[0]}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={colors.grey} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  )
}

export default HymnListItem
