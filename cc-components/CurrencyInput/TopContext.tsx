import React from "react";
import { View, StyleSheet } from "react-native";
import { SpacingM1, SpacingM10 } from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface TopContextProps {
  // From Figma mapping:
  // - isEmpty: boolean
  // - leadingIcon: ReactNode (figma.instance) or undefined
  // - label: string
  // Local convenience (optional): allow a boolean to force showing the slot even if icon is absent
  leadingSlot?: boolean;
  isEmpty?: boolean;
  leadingIcon?: React.ReactNode;
  label?: string | React.ReactNode;
}

const TopContext: React.FC<TopContextProps> = ({
  isEmpty,
  leadingSlot,
  leadingIcon,
  label,
}) => {
  const hasLabel = typeof label === "string" ? label.trim().length > 0 : !!label;
  const hasIcon = !!leadingIcon;

  // Auto-enable slot semantics if an icon is present (like ActionTile)
  const showLeading = hasIcon || !!leadingSlot;

  // If flagged empty but any content is present, content wins
  const resolvedIsEmpty = !!isEmpty && !hasLabel && !hasIcon;
  if (resolvedIsEmpty) {
    return <View style={styles.topContext} />;
  }

  const labelNode =
    typeof label === "string" ? (
      <FoldText type="body-sm-bold-v2">{label}</FoldText>
    ) : (
      label
    );

  return (
    <View style={styles.topContext}>
      {showLeading && hasIcon && hasLabel ? (
        <View style={styles.inline}>
          <View style={styles.iconMargin}>{leadingIcon}</View>
          {labelNode}
        </View>
      ) : showLeading && hasIcon ? (
        <View style={styles.inline}>{leadingIcon}</View>
      ) : hasLabel ? (
        labelNode
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  topContext: {
    height: SpacingM10,
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
