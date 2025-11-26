import React from "react";
import {
  Pressable,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FoldText } from "../Primitives/FoldText"; // Import FoldText
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimaryBoldPressed,
  ObjectDisabledDisabled,
  FacePrimary,
  FaceDisabled,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed,
  BorderRadiusSm,
  SpacingM0,
  SpacingM3,
  SpacingM14,
  LayerPrimaryPressed,
  SpacingM8,
  BorderTertiary,
  BorderSecondary,
} from "../../generated-tokens/tokens";

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
    heightLG: SpacingM14,
    heightXS: SpacingM8,
  },
  borderRadius: BorderRadiusSm,
};

interface ButtonProps {
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary" | "outline";
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  size?: "lg" | "xs";
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
});

const Button = ({
  label = "Fold button",
  onPress,
  disabled = false,
  variant = "primary",
  loading = false,
  style,
  textStyle,
  size = "lg",
}: ButtonProps) => {
  const isDisabled = disabled;

  // background tokens per variant
  const bgDefault =
    variant === "primary"
      ? ObjectPrimaryBoldDefault
      : variant === "secondary"
      ? ObjectSecondaryDefault
      : "transparent"; // tertiary/outline transparent

  const bgPressed =
    variant === "primary"
      ? ObjectPrimaryBoldPressed
      : variant === "secondary"
      ? ObjectSecondaryPressed
      : LayerPrimaryPressed; // pressed state for outline

  // use disabled-aware text color
  const textColor = isDisabled
    ? TOKENS.colors.textDisabled
    : TOKENS.colors.textDefault;

  const isXs = size === "xs";
  const height = isXs ? TOKENS.spacing.heightXS : TOKENS.spacing.heightLG;
  const textType: Parameters<typeof FoldText>[0]["type"] = isXs
    ? "body-sm-bold-v2"
    : "button-lrg-v2";
  const width = isXs ? undefined : "100%";
  const alignSelf = isXs ? undefined : "stretch";

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isDisabled
            ? TOKENS.colors.bgDisabled
            : pressed
            ? bgPressed
            : bgDefault,
          borderRadius: TOKENS.borderRadius,
          paddingVertical: TOKENS.spacing.vertical,
          paddingHorizontal: TOKENS.spacing.horizontal,
          height,
          opacity: 1,
          width,
          alignSelf,
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: variant === "outline" ? BorderTertiary : "transparent",
        },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={textColor} />
      ) : (
        <FoldText type={textType} style={[{ color: textColor }, textStyle]}>
          {label}
        </FoldText>
      )}
    </Pressable>
  );
};

export default Button;
