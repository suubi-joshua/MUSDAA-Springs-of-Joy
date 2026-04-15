/**
 * Splash Screen
 * Displays MUSDAA logo and branding
 */

import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../theme';

const { width, height } = Dimensions.get('window');

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    // Navigate after splash timeout
    const timer = setTimeout(() => {
      navigation?.navigate('MainTabs');
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../../assets/Logo-Components.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* App Title */}
        <Image
          source={require('../../assets/StartupImage.png')}
          style={styles.title}
          resizeMode="contain"
        />
      </View>

      {/* Loading indicator or decorative element */}
      <View style={styles.footer}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    width: 250,
    height: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.white,
    opacity: 0.6,
  },
});

export default SplashScreen;
