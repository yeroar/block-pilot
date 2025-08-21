import React, { ReactNode } from "react";
import { View, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FoldPressable from "../Primitives/FoldPressable";
import { SpacingM0, SpacingM6 } from "../../generated-tokens/tokens";

type StackControlProps = {
  variant: "left" | "right";
  leadingSlot?: ReactNode;
  trailingSlot?: ReactNode;
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onLeftPress?: () => void; // кастомное действие для левой иконки
  onRightPress?: () => void; // кастомное действие для правой иконки
};

const StackControl: React.FC<StackControlProps> = ({
  variant,
  leadingSlot,
  trailingSlot,
  children,
  style,
  onLeftPress,
  onRightPress,
}) => {
  // Make navigation optional
  let navigation = null;
  try {
    navigation = useNavigation();
  } catch (error) {
    if (__DEV__) {
      console.warn("Navigation context not available:", error);
    }
    navigation = null;
  }
  const showLeading = !!leadingSlot;
  const showTrailing = !!trailingSlot;

  const handleLeftPress = () => {
    if (onLeftPress) {
      onLeftPress();
    } else if (navigation?.canGoBack?.()) {
      navigation.goBack();
    }
  };

  const handleRightPress = () => {
    if (onRightPress) {
      onRightPress();
    }
    // По умолчанию правая иконка не делает навигацию назад
  };

  return (
    <View
      style={[
        styles.base,
        variant === "left" ? styles.left : styles.right,
        variant === "left" ? styles.padLeft : styles.padRight,
        style,
      ]}
    >
      {showLeading && (
        <FoldPressable
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={variant === "left" ? handleLeftPress : handleRightPress}
        >
          {leadingSlot}
        </FoldPressable>
      )}
      {showTrailing && (
        <FoldPressable
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={variant === "right" ? handleRightPress : handleLeftPress}
        >
          {trailingSlot}
        </FoldPressable>
      )}
      {!showLeading && !showTrailing ? children : null}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SpacingM6,
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
