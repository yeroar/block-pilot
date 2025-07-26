import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

const FWButton = ({ label, onPress, disabled, variant = 'default' }) => {
  const getBackgroundColor = () => {
    if (disabled) return styles.disabled.backgroundColor;
    switch (variant) {
      case 'primary':
        return styles.primary.backgroundColor;
      case 'subtle':
        return styles.subtle.backgroundColor;
      default:
        return styles.default.backgroundColor;
    }
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={[styles.button, { backgroundColor: getBackgroundColor() }]}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: 'ObjectPrimaryBoldDefault',
  },
  default: {
    backgroundColor: 'ColorBackgroundAccentPurpleBolderDefault',
  },
  primary: {
    backgroundColor: 'ObjectPrimaryBoldDefault',
  },
  subtle: {
    backgroundColor: 'ColorBackgroundAccentPurpleSubtlestDefault',
  },
  disabled: {
    backgroundColor: 'ObjectDisabledDisabled',
  },
});

export default FWButton;
