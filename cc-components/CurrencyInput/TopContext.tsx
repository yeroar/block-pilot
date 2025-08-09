import React from "react";
import { View, StyleSheet } from "react-native";
import { SpacingM1, SpacingM10 } from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface TopContextProps {
  content?: "empty" | "label" | "iconLabel";
  label?: string | React.ReactNode;
  icon?: React.ReactNode;
}

const TopContext: React.FC<TopContextProps> = ({ content, label, icon }) => {
  const hasLabel = label !== undefined && label !== null && label !== "";
  const hasIcon = !!icon;
  const resolvedContent: "empty" | "label" | "iconLabel" =
    content ?? (hasLabel ? (hasIcon ? "iconLabel" : "label") : "empty");

  if (resolvedContent === "empty") {
    // Preserve layout height even when empty
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
      {resolvedContent === "iconLabel" ? (
        <View style={styles.inline}>
          {icon ? <View style={{ marginRight: SpacingM1 }}>{icon}</View> : null}
          {labelNode}
        </View>
      ) : (
        labelNode
      )}
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
});

export default TopContext;
