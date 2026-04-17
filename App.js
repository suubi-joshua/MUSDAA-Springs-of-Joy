import './index.css'
import React, { useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import AppNavigator from './src/navigation/AppNavigator'
import { colors } from './src/theme'
import { ThemeProvider } from './src/theme/ThemeContext'
import { initDatabase, seedIfEmpty } from './src/db/database'

export default function App() {
  useEffect(() => {
    // Initialize database on app startup
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
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}
