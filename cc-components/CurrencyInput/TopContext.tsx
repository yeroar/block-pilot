import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ObjectAccentBoldDefault,
  SpacingM1,
  SpacingM5,
} from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface TopContextProps {
  leadingSlot?: boolean; // ignored in simplified logic
  isEmpty?: boolean; // ignored in simplified logic
  leadingIcon?: React.ReactNode;
  label?: string; // string-only
}

const TopContext: React.FC<TopContextProps> = ({ leadingIcon, label }) => {
  const trimmed = typeof label === "string" ? label.trim() : "";
  const hasLabel = trimmed.length > 0;
  const hasIcon = !!leadingIcon;

  // Empty: no label (icon-only is not supported)
  if (!hasLabel) {
    return <View style={styles.topContext} />;
  }

  // icon + label
  if (hasIcon) {
    return (
      <View style={styles.topContext}>
        <View style={styles.inline}>
          <View style={styles.iconMargin}>{leadingIcon}</View>
          <FoldText type="body-md-bold-v2">{trimmed}</FoldText>
        </View>
      </View>
    );
  }

  // label only
  return (
    <View style={styles.topContext}>
      <FoldText type="body-md-bold-v2">{trimmed}</FoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  topContext: {
    height: SpacingM5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMargin: {
    marginRight: SpacingM1,
  },
});

export default TopContext;
