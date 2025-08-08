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
  SpacingM1,
  SpacingM3,
  SpacingM14,
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
    height: SpacingM14,
  },
  borderRadius: BorderRadiusBr1,
};

interface ButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  labelSlot?: React.ReactNode;
  size?: 'lg' | 'xs';
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

const Button = ({
  label = 'Fold button',
  onPress,
  disabled = false,
  variant = 'primary',
  loading = false,
  style,
  textStyle,
  labelSlot,
  size = 'lg',
}: ButtonProps) => {
  const isDisabled = disabled;
  const bgDefault =
    variant === 'primary' ? TOKENS.colors.bgPrimary : TOKENS.colors.bgSecondary;
  const bgPressed =
    variant === 'primary' ? TOKENS.colors.bgPrimaryPressed : TOKENS.colors.bgSecondaryPressed;
  const textColor = disabled ? TOKENS.colors.textDisabled : TOKENS.colors.textDefault;

  const isXs = size === 'xs';
  const paddingHorizontal = isXs ? SpacingM1 : TOKENS.spacing.horizontal;
  const height = isXs ? 40 : TOKENS.spacing.height; // Figma: Spacing/m-10 = 40
  const textType: Parameters<typeof FoldText>[0]['type'] = isXs ? 'body-sm-bold-v2' : 'button-lrg-v2';
  const width = isXs ? undefined : '100%';
  const alignSelf = isXs ? undefined : 'stretch';

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
          paddingHorizontal,
          height,
          opacity: isDisabled ? 0.5 : 1,
          width,
          alignSelf,
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : labelSlot ? (
        labelSlot
      ) : (
        <FoldText type={textType} style={[{ color: textColor }, textStyle]}>
          {label}
        </FoldText>
      )}
    </Pressable>
  );
};

export default Button
