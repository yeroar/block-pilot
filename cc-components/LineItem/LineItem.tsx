import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import {
  FacePrimary,
  SpacingM1,
  SpacingM4,
} from "../../generated-tokens/tokens";

export type LineItemProps = {
  label?: string;
  variable?: string;

  leadingIcon?: boolean;
  leadingSlot?: React.ReactNode;

  trailingIcon?: boolean;
  trailingSlot?: React.ReactNode;

  varLeadingIcon?: boolean;
  varLeadingSlot?: React.ReactNode;
  varTrailingIcon?: boolean;
  varTrailingSlot?: React.ReactNode;

  // Just a React node, no boolean needed
  showChip?: React.ReactNode;

  containerStyle?: StyleProp<ViewStyle>;
};

export default function LineItem({
  label = "Bitcoin price",
  variable = "$100,000.00",

  leadingIcon = false,
  leadingSlot,

  trailingIcon = false,
  trailingSlot,

  varLeadingIcon = false,
  varLeadingSlot,

  varTrailingIcon = false,
  varTrailingSlot,

  showChip, // no default; just render directly

  containerStyle,
}: LineItemProps) {
  const showLeading = leadingIcon || !!leadingSlot;
  const showTrailing = trailingIcon || !!trailingSlot;
  const showVarLeading = varLeadingIcon || !!varLeadingSlot;
  const showVarTrailing = varTrailingIcon || !!varTrailingSlot;

  return (
    <View style={[styles.row, containerStyle]}>
      <View style={styles.left}>
        {showLeading && leadingSlot}

        <FoldText type="body-md-v2" style={{ color: FacePrimary }}>
          {label}
        </FoldText>

        {showChip}

        {showTrailing && trailingSlot}
      </View>

      <View style={styles.right}>
        {showVarLeading && varLeadingSlot}

        <FoldText type="body-md-bold-v2" style={{ color: FacePrimary }}>
          {variable}
        </FoldText>

        {showVarTrailing && varTrailingSlot}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: SpacingM4,
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM1,
    flexShrink: 1,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM1,
    flexShrink: 0,
  },
});
