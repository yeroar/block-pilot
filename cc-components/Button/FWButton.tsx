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
  children?: React.ReactNode; // Add children as an optional prop
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  primary?: boolean; // Add the primary prop
  loading?: boolean; // Loading state
  style?: ViewStyle; // Custom styles for the button
  textStyle?: TextStyle; // Custom styles for the text
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const FWButton = ({
  children,
  label = 'Fold button',
  onPress,
  disabled = false,
  primary = true,
  loading = false,
  style, // Custom button styles
  textStyle, // Custom text styles
}: FWButtonProps) => {
  const getBackgroundColor = () => {
    if (disabled) return TOKENS.colors.disabled;

    return primary
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
            ? primary
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
          type="button-lrg-v2" // Use a single default type for button text
          style={[
            { color: getTextColor() }, // Default text color
            textStyle, // Apply custom text styles
          ]}
        >
          {label || children} {/* Use label if provided, otherwise children */}
        </FoldText>
      )}
    </Pressable>
  );
};

export default FWButton
