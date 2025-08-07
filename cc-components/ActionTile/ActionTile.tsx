import React from "react";
import { View, StyleSheet, TouchableOpacity, ViewStyle, Text } from "react-native"; // Import ViewStyle for type definitions
import { FoldText } from "../Primitives/FoldText"; // Import FoldText component
import MinimalIcon from "../../components/content/MinimalIcon"; // Updated to use MinimalIcon
import { FaceNegative, FacePrimary, SpacingM32, ObjectPrimaryBoldDefault, ObjectPrimaryBoldPressed, ObjectPrimarySubtleDefault, ObjectPrimarySubtlePressed, ObjectPrimarySubtleSelected, SpacingM2, SpacingM3, SpacingM8 } from "../../generated-tokens/tokens";

export type ActionTileProps = {
  children?: React.ReactNode; // Add children if needed
  label?: string; // Make label optional
  selected?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: ViewStyle;
};



export default function ActionTile({
  children,
  label,
  selected = false,
  leadingIcon = false,
  trailingIcon = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  textStyle,
  ...rest
}: ActionTileProps) {
  // Automatically enable trailingIcon if trailingSlot is defined
  const hasTrailingIcon = trailingIcon || !!trailingSlot;

  const backgroundColor =
    selected === false
      ? ObjectPrimarySubtleDefault
      : ObjectPrimaryBoldDefault;

  const renderChildren = () => {
    if (typeof children === "string" || typeof children === "number") {
      return <Text>{children}</Text>;
    }
    if (Array.isArray(children)) {
      return children.map((child, idx) =>
        typeof child === "string" || typeof child === "number" ? (
          <Text key={idx}>{child}</Text>
        ) : (
          child
        )
      );
    }
    return children;
  };

  return (
    <TouchableOpacity onPress={onPress} style={style} {...rest}>
      <View style={[styles.container, { backgroundColor }]}>
        {leadingIcon && (leadingSlot || <MinimalIcon name="default-leading" size={16} />)}
        {label ? (
          <FoldText type="body-sm-bold-v2" style={textStyle}>
            {label}
          </FoldText>
        ) : (
          renderChildren()
        )}
        {children && (
          <FoldText type="body-sm-bold-v2" style={textStyle}>
            {children}
          </FoldText>
        )}
        {hasTrailingIcon && (trailingSlot || <MinimalIcon name="default-trailing" size={16} />)}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SpacingM32,
    paddingHorizontal: SpacingM3,
    borderRadius: 8,
    gap: SpacingM2/2,
  },
  icon: {
    marginHorizontal: SpacingM2,
  },
});