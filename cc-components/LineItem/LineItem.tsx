import React from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import {
  FacePrimary,
  SpacingM1,
  SpacingM4,
} from "../../generated-tokens/tokens";
import Chip from "../Chip/Chip";

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

  // accept a Chip node or boolean (true => default chip)
  showChip?: boolean | React.ReactNode;

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

  showChip, // no default; can be boolean or ReactNode

  containerStyle,
}: LineItemProps) {
  const showLeading = leadingIcon || !!leadingSlot;
  const showTrailing = trailingIcon || !!trailingSlot;
  const showVarLeading = varLeadingIcon || !!varLeadingSlot;
  const showVarTrailing = varTrailingIcon || !!varTrailingSlot;

  // resolve chip node: true -> default chip, node -> as passed
  const chipNode =
    showChip === true ? (
      <Chip label="[n]%" />
    ) : (
      (showChip as React.ReactNode | null) ?? null
    );

  return (
    <View style={[styles.row, containerStyle]}>
      <View style={styles.left}>
        {showLeading && leadingSlot}

        <FoldText type="body-md-v2" style={{ color: FacePrimary }}>
          {label}
        </FoldText>

        {chipNode}

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
