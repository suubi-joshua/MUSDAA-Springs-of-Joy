import './index.css'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { colors } from './src/theme'
import { ThemeProvider, useThemeMode } from './src/theme/ThemeContext'
import { initDatabase, seedIfEmpty } from './src/db/database'

function AppContent() {
  const { mode } = useThemeMode()
  const isDark = mode === 'dark'
  const statusBarBg = isDark ? colors.darkSecondaryBg : colors.primary

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={statusBarBg} />
      <AppNavigator />
    </>
  )
}

export default function App() {
  useEffect(() => {
    const initializeData = async () => {
      try {
        await initDatabase()
        await seedIfEmpty()
      } catch (error) {
        console.error('Failed to initialize database:', error)
      }
    }

    initializeData()
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
