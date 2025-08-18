import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimarySubtleDefault,
  SpacingM1,
  SpacingM2,
  SpacingM3,
  SpacingM10,
  BorderRadiusBr1,
} from "../../generated-tokens/tokens";

export type PMTileProps = {
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

export default function PMTile({
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
}: PMTileProps) {
  // If a slot is provided, always show it
  const showLeading = leadingIcon || !!leadingSlot;
  const showTrailing = trailingIcon || !!trailingSlot;
  const backgroundColor = selected
    ? ObjectPrimaryBoldDefault
    : ObjectPrimarySubtleDefault;

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
    height: SpacingM10,
    paddingHorizontal: SpacingM3,
    borderRadius: BorderRadiusBr1,
    gap: SpacingM1,
  },
  icon: {
    marginHorizontal: SpacingM2,
  },
});
