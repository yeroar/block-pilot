import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import {
  LayerBackground,
  LayerBackgroundPressed,
  FacePrimary,
  ObjectDisabledDisabled,
  FaceDisabled,
  MobileTitle03,
} from '../../generated-tokens/tokens';

/**
 * CustomKeyButton component
 * @param {Object} props
 * @param {string} props.variant - The variant of the button ("iconOnly" or "textOnly")
 * @param {React.ReactNode} props.icon - The icon to display (for "iconOnly" variant)
 * @param {string} props.label - The label to display (for "textOnly" variant)
 * @param {boolean} props.disabled - Whether the button is disabled
 * @param {function} props.onPress - The function to call when the button is pressed
 */
export type CustomKeyButtonProps = {
  variant: "iconOnly";
  icon: React.ReactElement;
  disabled?: boolean;
  onPress: () => void;
} | {
  variant: "textOnly";
  label: string;
  disabled?: boolean;
  onPress: () => void;
};

export default function CustomKeyButton(props: CustomKeyButtonProps) {
  const { variant, disabled = false, onPress } = props;

  const getButtonStyle = () => {
    if (disabled) {
      return [styles.button, styles.buttonDisabled];
    }
    return styles.button;
  };

  const getTextColor = () => {
    return disabled ? FaceDisabled : FacePrimary;
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.85}
      disabled={disabled}
    >
      <View style={styles.labelContainer}>
 {variant === "iconOnly" && "icon" in props ? (
  <View style={styles.iconContainer}>
    {React.cloneElement(props.icon, {
      ...(props.icon.props && typeof props.icon.props === 'object' ? props.icon.props : {})
    })}
  </View>
) : variant === "textOnly" && "label" in props ? (
  <Text style={[styles.label, { color: getTextColor() }]}>{props.label}</Text>
) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: LayerBackground,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 0,
    height: 48, // Ensure all buttons have the same height
    minWidth: 48, // Optional: ensure square buttons
  },
  buttonDisabled: {
    backgroundColor: ObjectDisabledDisabled,
  },
  iconContainer: {
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 20,
  },
  label: {
    fontFamily: MobileTitle03.fontFamily,
    fontSize: Number(MobileTitle03.fontSize),
    lineHeight: Number(MobileTitle03.lineHeight),
    letterSpacing: Number(MobileTitle03.letterSpacing),
  },

});