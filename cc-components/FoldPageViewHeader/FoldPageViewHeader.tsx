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
  titleType?: string; // New prop for title typography
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
  titleType = "header-xs-v2", // Default value
  style, // added
}: FoldPageViewHeaderProps) {
  const insets = useSafeAreaInsets();
  const headerTextColor = titleColor || TOKENS.colors.textPrimary;

  const iconStyles = { margin: 12 };

  return (
    <View
      style={[
        {
          width: "100%",
          backgroundColor: backgroundColor || "transparent",
          height: HEADER_HEIGHT + insets.top,
          paddingTop: insets.top,
          marginBottom: 16,
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
        <View style={[styles.center]}>
          <FoldText
            type={titleType as any}
            numberOfLines={1}
            ellipsizeMode="tail"
            style={{
              textAlign: "center",
              color: headerTextColor,
            }}
          >
            {title || ""}
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
    height: "100%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
});
