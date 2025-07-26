import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { 
  MobileButton01, 
  ObjectPrimaryBoldDefault, 
  ObjectPrimaryBoldPressed, 
  ObjectDisabledDisabled, 
  FacePrimary, 
  FaceDisabled,
  SpacingM0,
  SpacingM3,
  SpacingM8,
  BorderRadiusBr1
} from '../../generated-tokens/tokens';

const TOKENS = {
  colors: {
    default: ObjectPrimaryBoldDefault,
    pressed: ObjectPrimaryBoldPressed,
    disabled: ObjectDisabledDisabled,
    textPrimary: FacePrimary,
    textDisabled: FaceDisabled,
  },
  spacing: {
    vertical: SpacingM0,
    horizontal: SpacingM3,
    height: SpacingM8,
  },
  borderRadius: BorderRadiusBr1,
};

const FWButton = ({ label, onPress, disabled, state = 'default' }) => {
  const getBackgroundColor = () => {
    if (disabled) return TOKENS.colors.disabled;
    if (state === 'pressed') return TOKENS.colors.pressed;
    return TOKENS.colors.default;
  };

  const getTextColor = () => {
    return disabled ? TOKENS.colors.textDisabled : TOKENS.colors.textPrimary;
  };

  const mapFontWeight = (weight) => {
    switch (weight.toLowerCase()) {
      case 'medium':
        return '500';
      case 'regular':
        return '400';
      case 'light':
        return '300';
      default:
        return '400';
    }
  };

  return (
    <Pressable
      onPress={disabled ? null : onPress}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderRadius: TOKENS.borderRadius,
          paddingVertical: Number(TOKENS.spacing.vertical),
          paddingHorizontal: Number(TOKENS.spacing.horizontal),
          height: Number(TOKENS.spacing.height),
        },
      ]}
    >
      <Text
        style={[
          styles.label,
          {
            color: getTextColor(),
            fontSize: Number(MobileButton01.fontSize),
            fontWeight: mapFontWeight(MobileButton01.fontWeight),
            lineHeight: Number(MobileButton01.lineHeight),
            fontFamily: MobileButton01.fontFamily,
          },
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {},
});

export default FWButton;
