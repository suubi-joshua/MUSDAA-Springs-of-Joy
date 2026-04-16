import React from 'react'
import { View, Text, Pressable } from 'react-native'
import { render, fireEvent, act } from '@testing-library/react-native'
import { ThemeProvider, useThemeMode, navigationThemes } from '../src/theme/ThemeContext'

const TestComponent = () => {
  const { mode, toggleDarkMode } = useThemeMode()
  return (
    <View>
      <Text testID="mode-text">{mode === 'dark' ? 'dark-mode' : 'light-mode'}</Text>
      <Pressable onPress={toggleDarkMode} testID="toggle-btn">
        <Text>Toggle</Text>
      </Pressable>
    </View>
  )
}

describe('ThemeProvider', () => {
  it('provides light mode by default', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )
    expect(getByTestId('mode-text').props.children).toBe('light-mode')
  })

  it('toggles between light and dark modes', async () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    )

    expect(getByTestId('mode-text').props.children).toBe('light-mode')

    const toggleBtn = getByTestId('toggle-btn')
    await act(async () => {
      fireEvent.press(toggleBtn)
    })

    expect(getByTestId('mode-text').props.children).toBe('dark-mode')
  })

  it('provides navigationThemes with light and dark variants', () => {
    expect(navigationThemes.light).toBeDefined()
    expect(navigationThemes.dark).toBeDefined()
    expect(navigationThemes.light.colors.primary).toBe('#53B175')
    expect(navigationThemes.dark.colors.primary).toBe('#3d9c5e')
  })
})
