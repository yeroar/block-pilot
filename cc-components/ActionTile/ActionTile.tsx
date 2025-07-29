import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MinimalIcon from "../../components/content/MinimalIcon"; // Updated to use MinimalIcon
import { FacePrimary, ObjectPrimaryBoldDefault, ObjectPrimaryBoldPressed, ObjectPrimarySubtleDefault, ObjectPrimarySubtlePressed, ObjectPrimarySubtleSelected, SpacingM2, SpacingM3 } from "../../generated-tokens/tokens";

export type ActionTileProps = {
  label: string;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  state?: "default" | "pressed" | "selected"; // Added state prop
  onPress?: () => void; // Added onPress prop
};

export default function ActionTile({
  label,
  leadingIcon = false,
  trailingIcon = false,
  leadingSlot = null,
  trailingSlot = null,
  state = "default", // Default state
  onPress, // Added onPress prop
}: ActionTileProps) {
  const backgroundColor =
    state === "pressed"
      ? ObjectPrimaryBoldPressed
      : state === "selected"
      ? ObjectPrimarySubtleDefault
      : ObjectPrimaryBoldDefault; // Determine background color based on state

  console.log("ActionTile rendered with state:", state); // Debugging state rendering

  return (
    <TouchableOpacity onPress={onPress}> {/* Make button interactive */}
      <View style={[styles.container, { backgroundColor }]}> {/* Apply dynamic background color */}
        {leadingIcon && (leadingSlot || <MinimalIcon name="default-leading" size={16} />)}
        <Text style={styles.label}>{label}</Text>
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
  label: {
    color: FacePrimary, // Updated to use FacePrimary token
    fontSize: 14,
    fontWeight: "500",
    paddingHorizontal: SpacingM2,
  },
  icon: {
    marginHorizontal: SpacingM2,
  },
});