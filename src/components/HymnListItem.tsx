/**
 * Hymn List Item Component
 * Reusable component for displaying a hymn in a list
 */

import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { colors } from '../theme'
import { Hymn } from '../types'
import { useThemeMode } from '../theme/ThemeContext'

interface Props {
  hymn: Hymn
  onPress: () => void
}

const HymnListItem: React.FC<Props> = ({ hymn, onPress }) => {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'

  const hymnetNumber = hymn.id.toString()

  const cardBg = isDark ? colors.darkSecondaryBg : colors.white
  const titleColor = isDark ? colors.darkText : colors.black
  const previewColor = isDark ? colors.darkText : colors.grey

  return (
    <TouchableOpacity
      className="flex-row items-center rounded-3xl mb-5 px-5 py-5 shadow-lg"
      style={{ backgroundColor: cardBg }}
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
          className="text-xl font-extrabold mb-1"
          numberOfLines={2}
          style={{ color: titleColor }}
          testID="hymn-title"
        >
          {hymn.title}
        </Text>
        <Text
          className="text-base"
          numberOfLines={1}
          style={{ color: previewColor }}
          testID="hymn-preview"
        >
          {hymn.body.split('\n')[0]}
        </Text>
      </View>

      <Ionicons name="chevron-forward" size={22} color={colors.grey} style={{ marginLeft: 8 }} />
    </TouchableOpacity>
  )
}

export default HymnListItem
