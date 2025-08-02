import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
  BorderRadiusBr1,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed
} from '../../generated-tokens/tokens';
import { FoldText } from '../FoldText/FoldText'; // Import FoldText

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

interface FWButtonProps {
  children?: React.ReactNode; // Add children as an optional prop
  label?: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
  size?: "sm" | "default";
  state?: "default" | "pressed";
  disabled?: boolean;
}

const FWButton = ({ label, onPress, disabled, state = 'default', variant = 'primary', size = 'default' }: FWButtonProps) => {
const getBackgroundColor = () => {
  if (disabled) return TOKENS.colors.disabled;

  const isSecondary = variant === 'secondary';
  const isPressed = state === 'pressed';

  if (isSecondary) {
    return isPressed ? ObjectSecondaryPressed : ObjectSecondaryDefault;
  }

  return isPressed ? ObjectPrimaryBoldPressed : ObjectPrimaryBoldDefault;
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
      <FoldText
        type={size === 'sm' ? 'button-sm-v2' : 'button-lrg-v2'} // Use FoldText with appropriate type
        style={{
          color: getTextColor(),
        }}
      >
        {label}
      </FoldText>
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
