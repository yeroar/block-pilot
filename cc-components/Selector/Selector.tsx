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
  SpacingM6,
  BorderRadiusDefault,
  ObjectSecondaryDefault,
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
  showLeadingIcon?: boolean;
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
  // Simplified render logic
  const showLeading = showLeadingIcon || !!leadingSlot;
  const showSubtext = subtext || !!subtextSlot;
  const showFootnote = footnote || !!footnoteSlot;

  // Get dynamic styles based on selection state
  const selectionStyle = getSelectionStyle(variant, selected);
  const containerStyle = StyleSheet.flatten([
    styles.container,
    selectionStyle,
    style,
  ]);

  return (
    <FoldPressable onPress={onPress} style={containerStyle}>
      <View style={styles.listItem}>
        <View style={styles.content}>
          {/* Left Column */}
          <View style={styles.leftCol}>
            {showLeading && (
              <View style={styles.iconContainer}>
                {leadingSlot || <CreditCardIcon width={20} height={20} />}
              </View>
            )}

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
                <FoldText type="body-sm-v2" style={styles.footnote}>
                  {footnoteSlot || footnote}
                </FoldText>
              )}
            </View>
          </View>

          {/* Right Column - Trailing Element */}
          <View style={styles.rightCol}>
            {renderTrailingIcon(variant, selected)}
          </View>
        </View>
      </View>
    </FoldPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: BorderRadiusDefault,
  },
  listItem: {
    paddingVertical: SpacingM4,
    paddingHorizontal: SpacingM4,
  },
  content: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  leftCol: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SpacingM2,
  },
  iconContainer: {
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  textContent: {
    flex: 1,
    gap: SpacingM2,
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
    color: FacePrimary,
  },
  footnote: {
    color: FacePrimary,
  },
  rightCol: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Selector;
