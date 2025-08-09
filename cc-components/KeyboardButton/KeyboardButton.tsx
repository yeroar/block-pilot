import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import { FacePrimary, FaceDisabled, LayerBackground, SpacingM16 } from "../../generated-tokens/tokens";


export type KeyboardButtonProps = {
  variant: "iconOnly" | "textOnly";
  icon?: ReactNode; // simplified: only React node
  label?: string;
  disabled?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
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

  const buttonStyles: ViewStyle = {
    ...styles.button,
    backgroundColor: disabled ? FaceDisabled : LayerBackground,
    ...(style ? (StyleSheet.flatten(style) as ViewStyle) : {}),
  };

  const renderIcon = () => {
    if (!isIconOnly) return null;
    return React.isValidElement(icon) ? icon : null;
  };

  return (
    <FoldPressable onPress={disabled ? undefined : onPress} style={buttonStyles}>
      {isIconOnly ? (
        renderIcon()
      ) : (
        <FoldText type="header-md-v2" style={{ color: disabled ? FaceDisabled : FacePrimary }}>
          {label}
        </FoldText>
      )}
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: SpacingM16,
    borderRadius: 0,
  },
});