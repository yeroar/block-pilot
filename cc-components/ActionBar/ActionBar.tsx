import React, { ReactNode } from "react";
import { View, StyleSheet, ViewStyle, StyleProp } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  SpacingM2,
  SpacingM4,
  SpacingM10,
} from "../../generated-tokens/tokens";

type ActionBarProps = {
  children?: ReactNode;
  isEmpty?: boolean;
  style?: StyleProp<ViewStyle>; // use margins here if needed
};

const ActionBar: React.FC<ActionBarProps> = ({ children, isEmpty, style }) => {
  const count = React.Children.count(children);
  if (isEmpty || count === 0) return null;

  return (
    <SafeAreaView edges={["bottom"]} style={[styles.safeArea, style]}>
      {/* Inner wrapper guarantees extra bottom space; cannot be overridden by caller */}
      <View style={styles.container}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
  },
  container: {
    backgroundColor: "red",
    width: "100%",
    gap: SpacingM2,
    paddingTop: SpacingM4,
    paddingBottom: SpacingM10, // extra space above home indicator
  },
});

export default ActionBar;
