import React from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"; // Import ViewStyle for type definitions
import { FoldText } from "../Primitives/FoldText"; // Import FoldText component
import MinimalIcon from "../../components/content/MinimalIcon"; // Updated to use MinimalIcon
import { FaceNegative, FacePrimary, ObjectPrimaryBoldDefault, ObjectPrimaryBoldPressed, ObjectPrimarySubtleDefault, ObjectPrimarySubtlePressed, ObjectPrimarySubtleSelected, SpacingM2, SpacingM3 } from "../../generated-tokens/tokens";

export type ActionTileProps = {
  children?: React.ReactNode; // Add children if needed
  label?: string; // Make label optional
  selected?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: ViewStyle;
};



export default function ActionTile({
  children, // Add children prop
  label, // Keep label for backward compatibility
  selected = false,
  leadingIcon = false,
  trailingIcon = false,
  leadingSlot = null,
  trailingSlot = null,
  onPress, // Added onPress prop
  style, // Custom container styles
  textStyle, // Custom label styles
}: ActionTileProps) {
  const backgroundColor =
      selected === false
      ? ObjectPrimarySubtleDefault
      : ObjectPrimaryBoldDefault; // Determine background color based on state

  return (
    <TouchableOpacity onPress={onPress} style={style}> {/* Make button interactive */}
      <View style={[styles.container, { backgroundColor }]}> {/* Apply dynamic background color */}
        {leadingIcon && (leadingSlot || <MinimalIcon name="default-leading" size={16} />)}
        {label && (
          <FoldText type="body-md-v2" style={textStyle}>{label}</FoldText>
        )}
        {children && (
          <FoldText type="body-md-v2" style={textStyle}>{children}</FoldText>
        )}
        {trailingIcon && (trailingSlot || <MinimalIcon name="default-trailing" size={16} />)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SpacingM2,
    paddingHorizontal: SpacingM3,
    borderRadius: 8,
  },
  icon: {
    marginHorizontal: SpacingM2,
  },
});