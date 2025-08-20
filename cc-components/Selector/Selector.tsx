import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import Chip from "../Chip/Chip";
import { ChevronRightIcon } from "../assets/BlueSkyIcons/ChevronRightIcon";
import { CircleIcon } from "../assets/BlueSkyIcons/CircleIcon";
import { SquareIcon } from "../assets/BlueSkyIcons/SquareIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import {
  FacePrimary,
  FaceSecondary,
  ObjectSecondaryDefault,
  LayerSecondary,
  SpacingM4,
  SpacingM3,
  SpacingM2,
  SpacingM1,
  BorderRadiusDefault,
} from "../../generated-tokens/tokens";

export type SelectorVariant = "navigation" | "radio" | "checkbox";

export interface SelectorProps {
  variant?: SelectorVariant;
  title?: string;
  subtext?: string;
  footnote?: string;
  feeText?: string;
  leadingSlot?: React.ReactNode;
  subtextSlot?: React.ReactNode;
  footnoteSlot?: React.ReactNode;
  showLeadingIcon?: boolean;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}

const Selector: React.FC<SelectorProps> = ({
  variant,
  title,
  subtext,
  footnote,
  feeText,
  leadingSlot,
  subtextSlot,
  footnoteSlot,
  showLeadingIcon,
  selected,
  onPress,
  style,
}) => {
  const renderTrailingElement = () => {
    switch (variant) {
      case "radio":
        return <CircleIcon width={20} height={20} />;
      case "checkbox":
        return <SquareIcon width={20} height={20} />;
      case "navigation":
      default:
        return <ChevronRightIcon width={20} height={20} />;
    }
  };

  // Simplified render logic
  const showLeading = showLeadingIcon || !!leadingSlot;
  const showSubtext = subtext || !!subtextSlot;
  const showFootnote = footnote || !!footnoteSlot;

  return (
    <FoldPressable
      onPress={onPress}
      style={StyleSheet.flatten([styles.container, style])}
    >
      <View style={styles.listItem}>
        <View style={styles.content}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {showLeading && (
              <View style={styles.iconContainer}>{leadingSlot}</View>
            )}

            <View style={styles.textContent}>
              {/* Title Row with Fee Chip */}
              <View style={styles.titleRow}>
                <FoldText type="body-md-bold-v2" style={styles.titleText}>
                  {title}
                </FoldText>
                {feeText && (
                  <Chip bold={false} label={feeText} style={styles.feeChip} />
                )}
              </View>

              {/* Subtext */}
              {showSubtext && (
                <FoldText type="body-md-v2" style={styles.subtextText}>
                  {subtextSlot || subtext}
                </FoldText>
              )}

              {/* Footnote */}
              {showFootnote && (
                <FoldText type="body-md-v2" style={styles.footnoteText}>
                  {footnoteSlot || footnote}
                </FoldText>
              )}
            </View>
          </View>

          {/* Trailing Element */}
          <View style={styles.trailingContainer}>
            {renderTrailingElement()}
          </View>
        </View>
      </View>
    </FoldPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: LayerSecondary,
    paddingHorizontal: SpacingM4,
    paddingVertical: SpacingM4,
  },
  listItem: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SpacingM3,
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM4,
  },
  iconContainer: {
    backgroundColor: ObjectSecondaryDefault,
    padding: 10,
    borderRadius: BorderRadiusDefault,
    alignItems: "center",
    justifyContent: "center",
  },
  textContent: {
    flex: 1,
    gap: SpacingM1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM1,
  },
  titleText: {
    color: FacePrimary,
  },
  feeChip: {
    alignSelf: "flex-start",
  },
  subtextText: {
    color: FaceSecondary,
  },
  footnoteText: {
    color: "#7a5700", // Yellow/800 from design tokens
  },
  trailingContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Selector;
