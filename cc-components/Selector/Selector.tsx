import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import Chip from "../Chip/Chip";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import {
  FacePrimary,
  SpacingM2,
  SpacingM4,
  BorderRadiusDefault,
  ObjectSecondaryDefault,
  LayerSecondary,
  SpacingM0,
  FaceSecondary,
  Yellow800,
} from "../../generated-tokens/tokens";
import {
  renderTrailingIcon,
  getSelectionStyle,
  SelectorVariant,
} from "./SelectorLogic";

export interface SelectorProps {
  variant?: SelectorVariant;
  title?: string;
  subtext?: string;
  footnote?: string;
  hasChip?: React.ReactNode;
  leadingSlot?: React.ReactNode;
  subtextSlot?: React.ReactNode;
  footnoteSlot?: React.ReactNode;
  showLeadingIcon?: boolean | React.ReactNode;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const Selector: React.FC<SelectorProps> = ({
  variant = "navigation",
  title,
  subtext,
  footnote,
  hasChip,
  leadingSlot,
  subtextSlot,
  footnoteSlot,
  showLeadingIcon = false,
  selected = false,
  onPress,
  style,
}) => {
  // Simplified render logic with flexible showLeadingIcon support
  const showLeading = !!showLeadingIcon || !!leadingSlot;
  const showSubtext = subtext || !!subtextSlot;
  const showFootnote = footnote || !!footnoteSlot;

  // Render the leading icon - prioritize showLeadingIcon, then leadingSlot, then default
  const renderLeadingIcon = () => {
    if (React.isValidElement(showLeadingIcon)) {
      return showLeadingIcon;
    }
    if (leadingSlot) {
      return leadingSlot;
    }
    return <CreditCardIcon width={20} height={20} />;
  };

  // Get dynamic styles based on selection state
  const selectionStyle = getSelectionStyle(variant, selected);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    selectionStyle,
    style,
  ]);

  return (
    <FoldPressable onPress={onPress} style={containerStyle}>
      <View style={styles.content}>
        {/* Leading Icon */}
        {showLeading && (
          <View style={styles.iconContainer}>{renderLeadingIcon()}</View>
        )}

        {/* Text Content */}
        <View style={styles.textContent}>
          {/* Title Row with Chip */}
          <View style={styles.titleRow}>
            <FoldText type="body-md-bold-v2" style={styles.title}>
              {title}
            </FoldText>
            {hasChip && hasChip}
          </View>

          {/* Subtext */}
          {showSubtext && (
            <FoldText type="body-md-v2" style={styles.subtext}>
              {subtextSlot || subtext}
            </FoldText>
          )}

          {/* Footnote */}
          {showFootnote && (
            <FoldText type="body-md-v2" style={styles.footnote}>
              {footnoteSlot || footnote}
            </FoldText>
          )}
        </View>

        {/* Trailing Icon - Centered vertically */}
        {renderTrailingIcon(variant, selected)}
      </View>
    </FoldPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: SpacingM4,
    backgroundColor: LayerSecondary,
  },
  content: {
    flexDirection: "row",
    alignItems: "center", // Center all items vertically
    justifyContent: "space-between",
    gap: SpacingM4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: ObjectSecondaryDefault,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8, // Add some border radius for better visual
  },
  textContent: {
    flex: 1,
    gap: SpacingM0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM2,
  },
  title: {
    color: FacePrimary,
  },
  subtext: {
    color: FaceSecondary,
  },
  footnote: {
    color: Yellow800,
  },
});

export default Selector;
