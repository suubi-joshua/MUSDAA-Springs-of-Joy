import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { colors } from './index';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggleDarkMode: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const load = async () => {
      try {
        const saved = await AsyncStorage.getItem('appSettings');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed.darkMode) {
            setMode('dark');
          }
        }
      } catch {
        // ignore
      }
    };
    load();
  }, []);

  const toggleDarkMode = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  return useContext(ThemeContext);
}

export const navigationThemes = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: colors.primary,
      background: colors.white,
      card: colors.white,
      text: colors.black,
      border: colors.lightGrey,
      notification: colors.error,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: colors.primaryDark,
      background: colors.darkBg,
      card: colors.darkSecondaryBg,
      text: colors.darkText,
      border: colors.darkSecondaryBg,
      notification: colors.error,
    },
  },
};

