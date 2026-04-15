/**
 * App Navigation structure
 * Using React Navigation with Stack + Bottom Tabs
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { RootStackParamList, HomeStackParamList, SearchStackParamList, BookmarksStackParamList } from '../types';
import { colors } from '../theme';

// Screens
import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import HymnDetailScreen from '../screens/HymnDetailScreen';
import SearchScreen from '../screens/SearchScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const RootStack = createStackNavigator<RootStackParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();
const SearchStack = createStackNavigator<SearchStackParamList>();
const BookmarksStack = createStackNavigator<BookmarksStackParamList>();
const Tab = createBottomTabNavigator();

/**
 * Home Stack Navigator
 */
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: 'Springs of Joy',
        }}
      />
      <HomeStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Hymn',
        })}
      />
    </HomeStack.Navigator>
  );
}

/**
 * Search Stack Navigator
 */
function SearchStackNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <SearchStack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: 'Search Hymns',
        }}
      />
      <SearchStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Hymn',
        })}
      />
    </SearchStack.Navigator>
  );
}

/**
 * Bookmarks Stack Navigator
 */
function BookmarksStackNavigator() {
  return (
    <BookmarksStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <BookmarksStack.Screen
        name="BookmarksScreen"
        component={BookmarksScreen}
        options={{
          title: 'My Bookmarks',
        }}
      />
      <BookmarksStack.Screen
        name="HymnDetail"
        component={HymnDetailScreen}
        options={({ route }) => ({
          title: route.params?.title || 'Hymn',
        })}
      />
    </BookmarksStack.Navigator>
  );
}

/**
 * Main Tab Navigator
 */
function MainTabsNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'SearchTab') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'BookmarksTab') {
            iconName = focused ? 'bookmark' : 'bookmark-outline';
          } else if (route.name === 'SettingsTab') {
            iconName = focused ? 'settings' : 'settings-outline';
          }

          return (
            <Ionicons
              name={iconName as any}
              size={size}
              color={color}
            />
          );
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.grey,
        tabBarStyle: {
          backgroundColor: colors.white,
          borderTopColor: colors.lightGrey,
          borderTopWidth: 1,
        },
      })}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackNavigator}
        options={{
          title: 'Home',
        }}
      />
      <Tab.Screen
        name="SearchTab"
        component={SearchStackNavigator}
        options={{
          title: 'Search',
        }}
      />
      <Tab.Screen
        name="BookmarksTab"
        component={BookmarksStackNavigator}
        options={{
          title: 'Bookmarks',
        }}
      />
      <Tab.Screen
        name="SettingsTab"
        component={SettingsScreen}
        options={{
          title: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * Root Navigator with Splash Screen
 */
export function RootNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen
        name="Splash"
        component={SplashScreen}
      />
      <RootStack.Screen
        name="MainTabs"
        component={MainTabsNavigator}
      />
    </RootStack.Navigator>
  );
}

/**
 * Navigation Container with theme
 */
export function AppNavigator() {
  return (
    <NavigationContainer
      theme={
        {
          dark: false,
          colors: {
            primary: colors.primary,
            background: colors.white,
            card: colors.white,
            text: colors.black,
            border: colors.lightGrey,
            notification: colors.error,
          },
          fonts: {
            regular: { fontFamily: 'System', fontWeight: '400' },
            medium: { fontFamily: 'System', fontWeight: '500' },
            light: { fontFamily: 'System', fontWeight: '300' },
            thin: { fontFamily: 'System', fontWeight: '100' },
          },
        } as any
      }
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

export default AppNavigator;
