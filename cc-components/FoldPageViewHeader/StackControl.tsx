import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { SpacingM0 } from "../../generated-tokens/tokens";

type StackControlProps = {
  variant: "left" | "right";
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

const StackControl: React.FC<StackControlProps> = ({
  variant,
  leadingSlot,
  trailingSlot,
  children,
  style,
}) => {
  const showLeading = !!leadingSlot;
  const showTrailing = !!trailingSlot;

  return (
    <View
      style={[
        styles.base,
        variant === "left" ? styles.left : styles.right,
        variant === "left" ? styles.padLeft : styles.padRight,
        style,
      ]}
    >
      {showLeading && leadingSlot}
      {showTrailing && trailingSlot}
      {!showLeading && !showTrailing ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "flex-start",
    // gap between icons: 24px
    gap: 0,
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  padLeft: {
    paddingLeft: SpacingM0,
  },
  padRight: {
    paddingRight: SpacingM0,
  },
});

export default StackControl;