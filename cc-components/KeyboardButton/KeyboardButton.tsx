import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ViewStyle, TextStyle } from "react-native";
import { FacePrimary, FaceDisabled, ObjectPrimaryBoldDefault, ObjectPrimaryBoldPressed, SpacingM2, SpacingM3 } from "../../generated-tokens/tokens";

export type KeyboardButtonProps = {
  variant: "iconOnly" | "textOnly"; // Define the variant prop
  icon?: React.ReactNode; // Icon for iconOnly variant
  label?: string; // Label for textOnly variant
  children?: React.ReactNode; // Allow children for flexibility
  disabled?: boolean; // Disable the button
  onPress: () => void; // Callback for button press
  style?: ViewStyle; // Custom styles for the button
  textStyle?: TextStyle; // Custom styles for the text
};

export default function KeyboardButton({
  variant,
  icon,
  label,
  children,
  disabled = false,
  onPress,
  style,
  textStyle,
}: KeyboardButtonProps) {
  const getBackgroundColor = () => {
    return disabled ? FaceDisabled : ObjectPrimaryBoldDefault;
  };

  const getTextColor = () => {
    return disabled ? FaceDisabled : FacePrimary;
  };

  const renderContent = () => {
    if (variant === "iconOnly") {
      if (React.isValidElement(icon)) {
        return (
          <View style={styles.iconContainer}>
            {icon}
          </View>
        );
      } else {
        console.warn("KeyboardButton: Invalid icon prop.");
        return null;
      }
    } else if (variant === "textOnly") {
      if (children) {
        return children; // Render children if provided
      } else if (label) {
        return (
          <Text style={[styles.label, { color: getTextColor() }]}>{label}</Text>
        );
      } else {
        console.warn("KeyboardButton: Missing label or children for textOnly variant.");
        return null;
      }
    }
    console.warn("KeyboardButton: Invalid variant.");
    return null;
  };

  return (
    <TouchableOpacity
      onPress={disabled ? undefined : onPress}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: disabled ? 0.5 : 1,
        },
        style, // Apply custom styles
      ]}
    >
      {renderContent()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: SpacingM2,
    paddingHorizontal: SpacingM3,
    borderRadius: 8,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    textAlign: "center",
  },
});