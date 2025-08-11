import React, { ReactNode } from "react";
import { View, StyleSheet } from "react-native";
import {
  SpacingM2,
  SpacingM4,
  SpacingM10,
} from "../../generated-tokens/tokens";

type ActionBarProps = {
  children?: ReactNode;
  isEmpty?: boolean;
};

const ActionBar: React.FC<ActionBarProps> = ({ children, isEmpty }) => {
  const count = React.Children.count(children);
  if (isEmpty || count === 0) return null;

  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: SpacingM2,
    paddingTop: SpacingM4,
    paddingBottom: SpacingM10,
  },
});

export default ActionBar;
