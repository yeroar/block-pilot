import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import { FacePrimary, FaceDisabled, LayerBackground, SpacingM16 } from "../../generated-tokens/tokens";

export type KeyboardButtonProps = {
  variant: "iconOnly" | "textOnly";
  icon?: ReactNode;
  label?: string;
  disabled?: boolean;
  onPress: () => void;
  style?: ViewStyle;
};

export default function KeyboardButton({
  variant,
  icon,
  label,
  disabled = false,
  onPress,
  style,
}: KeyboardButtonProps) {
  const isIconOnly = variant === "iconOnly";
  
  // Create a ViewStyle object that FoldPressable can accept
  const buttonStyles = {
    ...styles.button,
    backgroundColor: disabled ? FaceDisabled : LayerBackground,
    ...(style || {})
  };

  return (
    <FoldPressable
      onPress={disabled ? undefined : onPress}
      style={buttonStyles}
    >
      {isIconOnly ? (
        icon
      ) : (
        <FoldText 
          type="header-md-v2" 
          style={{ color: disabled ? FaceDisabled : FacePrimary }}
        >
          {label}
        </FoldText>
      )}
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: SpacingM16,
    borderRadius: 0,
  },
});