/**
 * Settings Screen
 * User preferences: theme
 */

import React, { useEffect } from 'react'
import { View, Text, Switch, ScrollView, Alert, TouchableOpacity } from 'react-native'
import { colors } from '../theme'
import { useThemeMode } from '../theme/ThemeContext'

const SettingsScreen = ({ navigation }: any) => {
  const { mode, toggleDarkMode } = useThemeMode()
  const darkMode = mode === 'dark'

  useEffect(() => {
    navigation.setOptions({
      title: 'Settings',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    })
  }, [navigation])

  const handleDarkModeToggle = () => {
    toggleDarkMode()
  }

  const cardBgColor = darkMode ? colors.darkSecondaryBg : colors.white
  const textColor = darkMode ? colors.darkText : colors.black
  const secondaryTextColor = darkMode ? colors.lightGrey : colors.grey

  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: darkMode ? colors.darkBg : colors.lightGrey }}
      contentContainerStyle={{ paddingBottom: 48, paddingHorizontal: 20, paddingTop: 24 }}
    >
      {/* Display Settings */}
      <View
        className="rounded-3xl px-5 py-6 mb-6 shadow-sm"
        style={{ backgroundColor: cardBgColor }}
      >
        <Text className="text-xl font-extrabold text-brand-green mb-4">Display</Text>

        <View className="flex-row justify-between items-center py-4">
          <View className="flex-1 mr-6">
            <Text className="text-lg font-semibold mb-1" style={{ color: textColor }}>
              Dark Mode
            </Text>
            <Text className="text-base" style={{ color: secondaryTextColor }}>
              Use dark theme for easier reading
            </Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: colors.lightGrey, true: colors.primary }}
            thumbColor={darkMode ? colors.primary : colors.grey}
          />
        </View>
      </View>

      {/* About Section */}
      <View
        className="rounded-3xl px-5 py-6 mb-6 shadow-sm"
        style={{ backgroundColor: cardBgColor }}
      >
        <Text className="text-xl font-extrabold text-brand-green mb-4">About</Text>

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg font-semibold" style={{ color: textColor }}>
            App Version
          </Text>
          <Text className="text-lg" style={{ color: secondaryTextColor }}>
            1.0.0
          </Text>
        </View>

        <View
          className="h-px my-3"
          style={{ backgroundColor: darkMode ? colors.darkBg : colors.lightGrey }}
        />

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg font-semibold" style={{ color: textColor }}>
            Hymns Available
          </Text>
          <Text className="text-lg" style={{ color: secondaryTextColor }}>
            462
          </Text>
        </View>

        <View
          className="h-px my-3"
          style={{ backgroundColor: darkMode ? colors.darkBg : colors.lightGrey }}
        />

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg font-semibold" style={{ color: textColor }}>
            Organization
          </Text>
          <Text className="text-lg" style={{ color: secondaryTextColor }}>
            MUSDAA
          </Text>
        </View>
      </View>

      {/* Help Section */}
      <View
        className="rounded-3xl px-5 py-6 mb-6 shadow-sm"
        style={{ backgroundColor: cardBgColor }}
      >
        <Text className="text-xl font-extrabold text-brand-green mb-4">Help</Text>

        <TouchableOpacity
          className="py-3 px-0"
          onPress={() => {
            Alert.alert(
              'Tips',
              "• Tap any hymn to view full lyrics\n• Use the search tab to find specific hymns\n• Bookmark hymns by tapping the bookmark icon\n• Adjust font size using +/- buttons in detail view\n• Swipe back or use phone's back button to return"
            )
          }}
        >
          <Text className="text-lg text-brand-green font-bold">Tips & Tricks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="py-3 px-0"
          onPress={() => {
            Alert.alert(
              'Contact',
              'For issues or feedback, please contact\n\nEmail: ssebaanajoshua@gmail.com'
            )
          }}
        >
          <Text className="text-lg text-brand-green font-bold">Contact & Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Section */}
      <View
        className="rounded-3xl px-5 py-5 mb-10 shadow-sm"
        style={{ backgroundColor: cardBgColor }}
      >
        <Text
          className="text-base text-center leading-relaxed"
          style={{ color: secondaryTextColor }}
        >
          Songs of Joy is locally stored on your device. No data is sent to external servers.
        </Text>
      </View>
    </ScrollView>
  )
}

export default SettingsScreen
