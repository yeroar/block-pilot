import React from 'react';
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { FoldText } from '../Primitives/FoldText'; // Import FoldText
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimaryBoldPressed,
  ObjectDisabledDisabled,
  FacePrimary,
  FaceDisabled,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed,
  BorderRadiusBr1,
  SpacingM0,
  SpacingM3,
  SpacingM8,
} from '../../generated-tokens/tokens';

const TOKENS = {
  colors: {
    default: ObjectPrimaryBoldDefault,
    pressed: ObjectPrimaryBoldPressed,
    secondaryPressed: ObjectSecondaryPressed,
    secondaryDefault: ObjectSecondaryDefault,
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

interface FWButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const FWButton = ({
  label = 'Fold button',
  onPress,
  disabled = false,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
}: FWButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return TOKENS.colors.disabled;

    return variant === 'primary'
      ? TOKENS.colors.default
      : TOKENS.colors.secondaryDefault;
  };

  const getTextColor = () => {
    return disabled ? TOKENS.colors.textDisabled : TOKENS.colors.textPrimary;
  };

  return (
    <Pressable
      onPress={disabled || loading ? null : onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed && !disabled
            ? variant === 'primary'
              ? TOKENS.colors.pressed
              : TOKENS.colors.secondaryPressed
            : getBackgroundColor(),
          borderRadius: TOKENS.borderRadius,
          paddingVertical: Number(TOKENS.spacing.vertical),
          paddingHorizontal: Number(TOKENS.spacing.horizontal),
          height: Number(TOKENS.spacing.height),
          opacity: disabled || loading ? 0.5 : 1,
        },
        style, // Apply custom button styles
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <FoldText
          type="button-lrg-v2"
          style={[
            { color: getTextColor() },
            textStyle,
          ]}
        >
          {label}
        </FoldText>
      )}
    </Pressable>
  );
};

export default FWButton
