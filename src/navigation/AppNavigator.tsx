/**
 * App Navigation structure
 * Using React Navigation with Stack + Bottom Tabs
 */

import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons'

import {
  RootStackParamList,
  HomeStackParamList,
  SearchStackParamList,
  BookmarksStackParamList,
} from '../types'
import { colors } from '../theme'
import { navigationThemes, useThemeMode } from '../theme/ThemeContext'

// Screens
import SplashScreen from '../screens/SplashScreen'
import GetStarted from '../screens/GetStarted'
import HomeScreen from '../screens/HomeScreen'
import HymnDetailScreen from '../screens/HymnDetailScreen'
import SearchScreen from '../screens/SearchScreen'
import BookmarksScreen from '../screens/BookmarksScreen'
import SettingsScreen from '../screens/SettingsScreen'

const RootStack = createStackNavigator<RootStackParamList>()
const HomeStack = createStackNavigator<HomeStackParamList>()
const SearchStack = createStackNavigator<SearchStackParamList>()
const BookmarksStack = createStackNavigator<BookmarksStackParamList>()
const Tab = createBottomTabNavigator()

/**
 * Home Stack Navigator
 */
function HomeStackNavigator() {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const headerBg = isDark ? colors.darkSecondaryBg : colors.primary

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: 'Springs of Joy' }}
      />
      <HomeStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={{ title: 'Hymn' }}
      />
    </HomeStack.Navigator>
  )
}

/**
 * Search Stack Navigator
 */
function SearchStackNavigator() {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const headerBg = isDark ? colors.darkSecondaryBg : colors.primary

  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{ title: 'Search Hymns' }}
      />
      <SearchStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={{ title: 'Hymn' }}
      />
    </SearchStack.Navigator>
  )
}

/**
 * Bookmarks Stack Navigator
 */
function BookmarksStackNavigator() {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const headerBg = isDark ? colors.darkSecondaryBg : colors.primary

  return (
    <BookmarksStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: headerBg },
        headerTintColor: colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <BookmarksStack.Screen
        name="BookmarksScreen"
        component={BookmarksScreen}
        options={{ title: 'My Bookmarks' }}
      />
      <BookmarksStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={{ title: 'Hymn' }}
      />
    </BookmarksStack.Navigator>
  )
}

/**
 * Get tab icon
 */
function getTabIcon(routeName: string, focused: boolean): string {
  switch (routeName) {
    case 'HomeTab':
      return focused ? 'home' : 'home-outline'
    case 'SearchTab':
      return focused ? 'search' : 'search-outline'
    case 'BookmarksTab':
      return focused ? 'bookmark' : 'bookmark-outline'
    case 'SettingsTab':
      return focused ? 'settings' : 'settings-outline'
    default:
      return 'help-outline'
  }
}

/**
 * Main Tab Navigator
 */
function MainTabsNavigator() {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'

  const tabBg = isDark ? colors.darkSecondaryBg : colors.white
  const tabBorder = isDark ? colors.darkBg : colors.lightGrey

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          backgroundColor: tabBg,
          borderTopColor: tabBorder,
          borderTopWidth: 1,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={({ route }) => ({
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={getTabIcon(route.name, focused) as any} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={({ route }) => ({
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={getTabIcon(route.name, focused) as any} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="BookmarksTab"
        component={BookmarksStackNavigator}
        options={({ route }) => ({
          title: 'Bookmarks',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={getTabIcon(route.name, focused) as any} size={size} color={color} />
          ),
        })}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={({ route }) => ({
          title: 'Settings',
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={getTabIcon(route.name, focused) as any} size={size} color={color} />
          ),
        })}
      />
    </Tab.Navigator>
  )
}

/**
 * Root Navigator
 */
function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <RootStack.Screen name="Splash" component={SplashScreen} />
      <RootStack.Screen name="GetStarted" component={GetStarted} />
      <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
    </RootStack.Navigator>
  )
}

/**
 * Navigation Container with theme
 */
function AppNavigator() {
  const { mode } = useThemeMode()

  return (
    <NavigationContainer theme={navigationThemes[mode] as any}>
      <RootNavigator />
    </NavigationContainer>
  )
}

export default AppNavigator
