import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import {
  // Accent surface + text tokens from design
  ObjectAccentSubtleDefault,
  ObjectAccentBoldDefault,
  FaceInverse,
  SpacingM1,
  SpacingM2,
  FaceAccent,
  BorderRadiusXs,
} from "../../generated-tokens/tokens";

export type ChipProps = {
  label: string;
  bold?: boolean; // filled variant
  disabled?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export default function Chip({
  label,
  bold = false,
  disabled = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  textStyle,
}: ChipProps) {
  const bgColor = bold ? ObjectAccentBoldDefault : ObjectAccentSubtleDefault;
  // Use accent color for subtle text (re-use bold surface as accent ink),
  // and inverse for bold (filled) chip text.
  const textColor = bold ? FaceInverse : FaceAccent;

  return (
    <FoldPressable
      disabled={disabled}
      onPress={onPress}
      style={StyleSheet.flatten<ViewStyle>([
        styles.container,
        { backgroundColor: bgColor, opacity: disabled ? 0.5 : 1 },
        style,
      ])}
    >
      <View style={styles.content}>
        {!!leadingSlot && <View style={styles.icon}>{leadingSlot}</View>}
        <FoldText
          type="body-sm-bold-v2"
          style={[{ color: textColor }, textStyle as TextStyle]}
        >
          {label}
        </FoldText>
        {!!trailingSlot && <View style={styles.icon}>{trailingSlot}</View>}
      </View>
    </FoldPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadiusXs, // border-radii/xsmall
    paddingHorizontal: SpacingM2, // m/2
    alignSelf: "flex-start",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM1,
    minHeight: 24,
  },
  icon: {
    // small spacing already handled by gap
  },
});
