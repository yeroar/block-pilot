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
    bgPrimary: ObjectPrimaryBoldDefault,
    bgPrimaryPressed: ObjectPrimaryBoldPressed,

    bgSecondary: ObjectSecondaryDefault,
    bgSecondaryPressed: ObjectSecondaryPressed,

    bgDisabled: ObjectDisabledDisabled,

    textDefault: FacePrimary,
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
  labelSlot?: React.ReactNode;
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
  labelSlot,
}: FWButtonProps) => {
  const isDisabled = disabled;
  const bgDefault =
    variant === 'primary' ? TOKENS.colors.bgPrimary : TOKENS.colors.bgSecondary;
  const bgPressed =
    variant === 'primary' ? TOKENS.colors.bgPrimaryPressed : TOKENS.colors.bgSecondaryPressed;
  const textColor = disabled ? TOKENS.colors.textDisabled : TOKENS.colors.textDefault;

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: pressed && !isDisabled ? bgPressed : bgDefault,
          borderRadius: TOKENS.borderRadius,
          paddingVertical: TOKENS.spacing.vertical,
          paddingHorizontal: TOKENS.spacing.horizontal,
          height: TOKENS.spacing.height,
          opacity: isDisabled ? 0.5 : 1,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : labelSlot ? (
        labelSlot
      ) : (
        <FoldText type="button-lrg-v2" style={[{ color: textColor }, textStyle]}>
          {label}
        </FoldText>
      )}
    </Pressable>
  );
};

export default FWButton
