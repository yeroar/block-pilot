import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  StyleProp,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FoldText } from "../Primitives/FoldText";
import FoldPressable from "../Primitives/FoldPressable";
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimaryBoldPressed,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed,
  ObjectDisabledDisabled,
  FacePrimary,
  FaceDisabled,
} from "../../generated-tokens/tokens";
import StackControl from "./StackControl";
import { XCloseIcon } from "../assets/BlueSkyIcons/XCloseIcon";

const TOKENS = {
  colors: {
    default: ObjectPrimaryBoldDefault,
    pressed: ObjectPrimaryBoldPressed,
    secondaryDefault: ObjectSecondaryDefault,
    secondaryPressed: ObjectSecondaryPressed,
    disabled: ObjectDisabledDisabled,
    textPrimary: FacePrimary,
    textDisabled: FaceDisabled,
  },
};

interface FoldPageViewHeaderProps {
  title?: string;
  subTitle?: string;
  leftIcon?: string;
  rightIcon?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  backgroundColor?: string;
  rightIconColor?: string;
  titleColor?: string;
  style?: StyleProp<ViewStyle>; // added
}

const HEADER_HEIGHT = 48;
const SIDE_WIDTH = 88;

export default function FoldPageViewHeader({
  title,
  subTitle,
  leftIcon,
  rightIcon,
  onLeftPress,
  onRightPress,
  leftComponent,
  rightComponent,
  backgroundColor,
  rightIconColor,
  titleColor,
  style, // added
}: FoldPageViewHeaderProps) {
  const insets = useSafeAreaInsets();
  const headerTextColor = titleColor || TOKENS.colors.textPrimary;

  // Center max width = screen - 176 (88 per side)
  const centerMaxWidth = Dimensions.get("window").width - 176;

  const iconStyles = { margin: 12 };

  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: backgroundColor || "transparent",
          height: HEADER_HEIGHT + insets.top,
          paddingTop: insets.top,
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {/* Left (88 wide) */}
        <View style={styles.leftSide}>
          {leftComponent ? (
            <StackControl variant="left">{leftComponent}</StackControl>
          ) : (
            leftIcon &&
            onLeftPress && (
              <StackControl
                variant="left"
                leadingSlot={
                  <FoldPressable style={iconStyles} onPress={onLeftPress}>
                    <XCloseIcon />
                  </FoldPressable>
                }
              />
            )
          )}
        </View>

        {/* Center (flex:1, capped to screen - 176) */}
        <View style={[styles.center, { maxWidth: centerMaxWidth }]}>
          <FoldText
            type="header-xs-v2"
            style={{
              textAlign: "center",
              paddingTop: 4,
              color: headerTextColor,
            }}
          >
            {title || "Default Title"}
          </FoldText>
        </View>

        {/* Right (88 wide) */}
        <View style={styles.rightSide}>
          {rightComponent ? (
            <StackControl variant="right">{rightComponent}</StackControl>
          ) : (
            rightIcon &&
            onRightPress && (
              <StackControl
                variant="right"
                trailingSlot={
                  <FoldPressable style={iconStyles} onPress={onRightPress}>
                    <XCloseIcon />
                  </FoldPressable>
                }
                leadingSlot={
                  <FoldPressable style={iconStyles} onPress={onRightPress}>
                    <XCloseIcon />
                  </FoldPressable>
                }
              />
            )
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: HEADER_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
  },
  leftSide: {
    width: SIDE_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  center: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  rightSide: {
    width: SIDE_WIDTH,
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
