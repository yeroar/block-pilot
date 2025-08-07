import React from "react";
import { View, StyleSheet, ViewStyle, Text } from "react-native"; // Import ViewStyle for type definitions
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText"; // Import FoldText component
import { FaceNegative, FacePrimary, SpacingM32, ObjectPrimaryBoldDefault, ObjectPrimaryBoldPressed, ObjectPrimarySubtleDefault, ObjectPrimarySubtlePressed, ObjectPrimarySubtleSelected, SpacingM2, SpacingM3, SpacingM8 } from "../../generated-tokens/tokens";

export type ActionTileProps = {
  label: string;
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
  label,
  selected = false,
  leadingIcon = false,
  trailingIcon = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  textStyle,
  ...rest
}: ActionTileProps) {
  // If a slot is provided, always show it
  const showLeading = leadingIcon || !!leadingSlot;
  const showTrailing = trailingIcon || !!trailingSlot;
  const backgroundColor = selected ? ObjectPrimaryBoldDefault : ObjectPrimarySubtleDefault;

  return (
    <FoldPressable onPress={onPress} style={style} {...rest}>
      <View style={[styles.container, { backgroundColor }]}> 
        {showLeading && leadingSlot}
        <FoldText type="body-sm-bold-v2" style={textStyle}>
          {label}
        </FoldText>
        {showTrailing && trailingSlot}
      </View>
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SpacingM32,
    paddingHorizontal: SpacingM3,
    borderRadius: 8,
    gap: SpacingM2/2,
  },
  icon: {
    marginHorizontal: SpacingM2,
  },
});