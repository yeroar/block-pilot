import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  LayoutChangeEvent,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import {
  SpacingM2,
  SpacingM4,
  SpacingM10,
} from "../../generated-tokens/tokens";

type ActionBarProps = {
  children?: ReactNode;
  isEmpty?: boolean;
  style?: StyleProp<ViewStyle>; // use margins here if needed
  sticky?: boolean; // fixed to bottom of viewport
  onHeightChange?: (h: number) => void; // report total height (incl. safe area)
};

const ActionBar: React.FC<ActionBarProps> = ({
  children,
  isEmpty,
  style,
  sticky = false,
  onHeightChange,
}) => {
  const count = React.Children.count(children);
  const insets = useSafeAreaInsets();
  if (isEmpty || count === 0) return null;

  const onLayout = (e: LayoutChangeEvent) => {
    const contentHeight = e.nativeEvent.layout.height; // container padding included
    onHeightChange?.(contentHeight + insets.bottom);
  };

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={[styles.safeArea, sticky && styles.sticky, style]}
      pointerEvents="box-none"
    >
      <View onLayout={onLayout} style={styles.container}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    width: "100%",
  },
  sticky: {
    position: "absolute",
    left: SpacingM4,
    right: SpacingM4,
    bottom: 0,
  },
  container: {
    width: "100%",
    gap: SpacingM2,
    paddingVertical: SpacingM4,
  },
});

export default ActionBar;
