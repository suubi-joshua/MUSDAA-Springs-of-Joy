/**
 * Settings Screen
 * User preferences: theme, font size
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../theme';
import { useThemeMode } from '../theme/ThemeContext';

const SettingsScreen = ({ navigation }: any) => {
  const { mode, toggleDarkMode } = useThemeMode();
  const [darkMode, setDarkMode] = useState(false);
  const [largeText, setLargeText] = useState(false);

  useEffect(() => {
    loadSettings();

    navigation.setOptions({
      title: 'Settings',
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTintColor: colors.white,
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
  }, [navigation]);

  const loadSettings = async () => {
    try {
      const saved = await AsyncStorage.getItem('appSettings');
      if (saved) {
        const settings = JSON.parse(saved);
        setDarkMode(settings.darkMode || false);
        setLargeText(settings.largeText || false);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    }
  };

  const saveSettings = async (darkModeValue: boolean, largeTextValue: boolean) => {
    try {
      const settings = {
        darkMode: darkModeValue,
        largeText: largeTextValue,
        savedAt: new Date().toISOString(),
      };
      await AsyncStorage.setItem('appSettings', JSON.stringify(settings));
    } catch (err) {
      console.error('Error saving settings:', err);
      Alert.alert('Error', 'Failed to save settings');
    }
  };

  const handleDarkModeToggle = () => {
    const newValue = !darkMode;
    setDarkMode(newValue);
    toggleDarkMode();
    saveSettings(newValue, largeText);
  };

  const handleLargeTextToggle = () => {
    const newValue = !largeText;
    setLargeText(newValue);
    saveSettings(darkMode, newValue);
  };

  return (
    <ScrollView className="flex-1 bg-gray-50" contentContainerStyle={{ paddingBottom: 48, paddingHorizontal: 20, paddingTop: 24 }}>
      {/* Display Settings */}
      <View className="bg-white rounded-3xl px-5 py-6 mb-6 shadow-sm">
        <Text className="text-xl font-extrabold text-brand-green mb-4">Display</Text>

        <View className="flex-row justify-between items-center py-4">
          <View className="flex-1 mr-6">
            <Text className="text-lg font-semibold text-black mb-1">Dark Mode</Text>
            <Text className="text-base text-gray-600">Use dark theme for easier reading</Text>
          </View>
          <Switch
            value={darkMode}
            onValueChange={handleDarkModeToggle}
            trackColor={{ false: colors.lightGrey, true: colors.primary }}
            thumbColor={darkMode ? colors.primary : colors.grey}
          />
        </View>

        <View className="h-px bg-gray-200 my-3" />

        <View className="flex-row justify-between items-center py-4">
          <View className="flex-1 mr-6">
            <Text className="text-lg font-semibold text-black mb-1">Large Text</Text>
            <Text className="text-base text-gray-600">Increase default font size</Text>
          </View>
          <Switch
            value={largeText}
            onValueChange={handleLargeTextToggle}
            trackColor={{ false: colors.lightGrey, true: colors.primary }}
            thumbColor={largeText ? colors.primary : colors.grey}
          />
        </View>
      </View>

      {/* About Section */}
      <View className="bg-white rounded-3xl px-5 py-6 mb-6 shadow-sm">
        <Text className="text-xl font-extrabold text-brand-green mb-4">About</Text>

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg text-black font-semibold">App Version</Text>
          <Text className="text-lg text-gray-600">1.0.0</Text>
        </View>

        <View className="h-px bg-gray-200 my-3" />

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg text-black font-semibold">Hymns Available</Text>
          <Text className="text-lg text-gray-600">462</Text>
        </View>

        <View className="h-px bg-gray-200 my-3" />

        <View className="flex-row justify-between items-center py-3">
          <Text className="text-lg text-black font-semibold">Organization</Text>
          <Text className="text-lg text-gray-600">MUSDAA</Text>
        </View>
      </View>

      {/* Help Section */}
      <View className="bg-white rounded-3xl px-5 py-6 mb-6 shadow-sm">
        <Text className="text-xl font-extrabold text-brand-green mb-4">Help</Text>

        <TouchableOpacity
          className="py-3 px-0"
          onPress={() => {
            Alert.alert(
              'Tips',
              '• Tap any hymn to view full lyrics\n• Use the search tab to find specific hymns\n• Bookmark hymns by tapping the bookmark icon\n• Adjust font size using +/- buttons in detail view\n• Swipe back or use phone\'s back button to return'
            );
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
            );
          }}
        >
          <Text className="text-lg text-brand-green font-bold">Contact & Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Section */}
      <View className="bg-white rounded-3xl px-5 py-5 mb-10 shadow-sm">
        <Text className="text-base text-gray-600 text-center leading-relaxed">
          Songs of Joy is locally stored on your device. No data is sent to external servers.
        </Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;
