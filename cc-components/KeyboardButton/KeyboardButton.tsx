import React, { ReactNode } from "react";
import { StyleSheet, ViewStyle, StyleProp } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import { FacePrimary, FaceDisabled, LayerBackground, SpacingM16 } from "../../generated-tokens/tokens";
import { BellIcon } from "../assets/BlueSkyIcons/BellIcon";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { AlarmClockIcon } from "../assets/BlueSkyIcons/AlarmClockIcon";
import { XCloseIcon } from "../assets/BlueSkyIcons/XCloseIcon";

// Simple icon registry
const ICONS = {
  Bell: BellIcon,
  Bank: BankIcon,
  Alarm: AlarmClockIcon,
  Close: XCloseIcon,
  close: XCloseIcon,
  XClose: XCloseIcon,
} as const;

type IconKey = keyof typeof ICONS;

export type KeyboardButtonProps = {
  variant: "iconOnly" | "textOnly";
  icon?: ReactNode | string; // Accept strings from Figma (icon name) or a React node
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
  
  // Create a ViewStyle object that FoldPressable can accept
  const buttonStyles: ViewStyle = {
    ...styles.button,
    backgroundColor: disabled ? FaceDisabled : LayerBackground,
    ...(style ? (StyleSheet.flatten(style) as ViewStyle) : {}),
  };

  const renderIcon = () => {
    if (!isIconOnly) return null;
    if (React.isValidElement(icon)) return icon;
    if (typeof icon === "string") {
      const IconComp = ICONS[icon as IconKey];
      return IconComp ? <IconComp /> : null;
    }
    return null;
  };

  return (
    <FoldPressable
      onPress={disabled ? undefined : onPress}
      style={buttonStyles}
    >
      {isIconOnly ? (
        renderIcon()
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