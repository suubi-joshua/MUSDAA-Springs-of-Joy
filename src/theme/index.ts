/**
 * Theme configuration for Springs of Joy
 * MUSDAA branding with SDA green and white
 */

export const colors = {
  // Primary SDA green
  primary: '#005F3A',
  primaryDark: '#003D24',
  primaryLight: '#007F52',

  // Secondary and neutral colors
  secondary: '#F4A460', // Sandy brown
  accent: '#FF6B6B',

  // Neutral palette
  white: '#FFFFFF',
  black: '#000000',
  darkGrey: '#2C3E50',
  grey: '#7F8C8D',
  lightGrey: '#ECF0F1',
  veryLightGrey: '#F5F5F5',

  // Status colors
  success: '#27AE60',
  warning: '#F39C12',
  error: '#E74C3C',
  info: '#3498DB',

  // Dark mode
  darkBg: '#1A1A1A',
  darkText: '#ECECEC',
  darkSecondaryBg: '#2D2D2D',
};

export const typography = {
  // Font sizes
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },

  // Font weights
  fontWeight: {
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },

  // Line heights
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  md: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  lg: {
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 6.68,
    elevation: 12,
  },
};

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
};
