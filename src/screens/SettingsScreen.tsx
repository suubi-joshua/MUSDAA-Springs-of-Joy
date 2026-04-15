/**
 * Settings Screen
 * User preferences: theme, font size
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Switch,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors, spacing, typography } from '../theme';

const SettingsScreen = ({ navigation }: any) => {
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
    saveSettings(newValue, largeText);
  };

  const handleLargeTextToggle = () => {
    const newValue = !largeText;
    setLargeText(newValue);
    saveSettings(darkMode, newValue);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {/* Display Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Display</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingName}>Dark Mode</Text>
            <Text style={styles.settingDescription}>
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

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingLabel}>
            <Text style={styles.settingName}>Large Text</Text>
            <Text style={styles.settingDescription}>
              Increase default font size
            </Text>
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
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>App Version</Text>
          <Text style={styles.infoValue}>1.0.0</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Hymns Available</Text>
          <Text style={styles.infoValue}>462</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Organization</Text>
          <Text style={styles.infoValue}>MUSDAA</Text>
        </View>
      </View>

      {/* Help Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Tips',
              '• Tap any hymn to view full lyrics\n• Use the search tab to find specific hymns\n• Bookmark hymns by tapping the bookmark icon\n• Adjust font size using +/- buttons in detail view\n• Swipe back or use phone\'s back button to return'
            );
          }}
        >
          <Text style={styles.actionButtonText}>Tips & Tricks</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => {
            Alert.alert(
              'Contact',
              'For issues or feedback, please contact MUSDAA\n\nEmail: musdaa@example.com'
            );
          }}
        >
          <Text style={styles.actionButtonText}>Contact & Feedback</Text>
        </TouchableOpacity>
      </View>

      {/* Privacy Section */}
      <View style={[styles.section, styles.lastSection]}>
        <Text style={styles.privacyText}>
          Songs of Joy is locally stored on your device. No data is sent to external servers.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.veryLightGrey,
  },
  content: {
    paddingBottom: spacing.xl,
  },
  section: {
    backgroundColor: colors.white,
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
  },
  lastSection: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold' as any,
    color: colors.primary,
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  settingLabel: {
    flex: 1,
    marginRight: spacing.lg,
  },
  settingName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600' as any,
    color: colors.darkGrey,
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.grey,
  },
  divider: {
    height: 1,
    backgroundColor: colors.lightGrey,
    marginVertical: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  infoLabel: {
    fontSize: typography.fontSize.base,
    color: colors.darkGrey,
    fontWeight: '600' as any,
  },
  infoValue: {
    fontSize: typography.fontSize.base,
    color: colors.grey,
  },
  actionButton: {
    paddingVertical: spacing.md,
    paddingHorizontal: 0,
  },
  actionButtonText: {
    fontSize: typography.fontSize.base,
    color: colors.primary,
    fontWeight: 'bold' as any,
  },
  privacyText: {
    fontSize: typography.fontSize.sm,
    color: colors.grey,
    lineHeight: 20,
    textAlign: 'center',
  },
});

export default SettingsScreen;
