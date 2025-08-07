import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SpacingM10 } from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface TopContextProps {
  content: string;
}

const TopContext: React.FC<TopContextProps> = ({ content }) => {
  if (!content) return null;

  return (
    <View style={styles.topContext}>
      <FoldText type="body-sm-bold-v2">{content}</FoldText>
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
});

export default TopContext;
