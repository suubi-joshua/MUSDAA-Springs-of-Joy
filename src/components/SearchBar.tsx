/**
 * Search Bar Component
 * Reusable search input with clear button
 */

import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, shadows } from '../theme';

const { width } = Dimensions.get('window');

interface Props {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
}

const SearchBar: React.FC<Props> = ({
  placeholder = 'Search...',
  value,
  onChangeText,
  onClear,
}) => {
  return (
    <View style={[styles.container, shadows.sm]}>
      <Ionicons
        name="search"
        size={20}
        color={colors.grey}
        style={styles.icon}
      />

      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        value={value}
        onChangeText={onChangeText}
        clearButtonMode="never"
        autoCapitalize="none"
        autoCorrect={false}
      />

      {value !== '' && (
        <TouchableOpacity
          style={styles.clearButton}
          onPress={onClear}
        >
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.grey}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: spacing.md,
    marginVertical: spacing.md,
    paddingHorizontal: spacing.md,
    height: 44,
  },
  icon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.black,
    paddingVertical: spacing.sm,
  },
  clearButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
});

export default SearchBar;
