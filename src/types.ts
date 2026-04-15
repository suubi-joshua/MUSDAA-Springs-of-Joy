/**
 * Type definitions for the Springs of Joy app
 */

export interface Hymn {
  id: number;
  title: string;
  body: string;
}

export type RootStackParamList = {
  Splash: undefined;
  MainTabs: undefined;
  Home: undefined;
  HymnDetail: {
    id: number;
    title: string;
    body: string;
  };
  Search: undefined;
  Bookmarks: undefined;
  Settings: undefined;
};

export type HomeStackParamList = {
  HomeScreen: undefined;
  HymnDetail: {
    id: number;
    title: string;
    body: string;
  };
};

export type SearchStackParamList = {
  SearchScreen: undefined;
  HymnDetail: {
    id: number;
    title: string;
    body: string;
  };
};

export type BookmarksStackParamList = {
  BookmarksScreen: undefined;
  HymnDetail: {
    id: number;
    title: string;
    body: string;
  };
};

export type SettingsStackParamList = {
  SettingsScreen: undefined;
};

export interface AppSettings {
  fontSize: number;
  darkMode: boolean;
  prefersLargeText: boolean;
}
