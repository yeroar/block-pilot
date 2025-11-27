import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import {
  FacePrimary,
  SpacingM4,
  ObjectSecondaryDefault,
  SpacingM0,
  FaceSecondary,
  Yellow800,
  Blue100,
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

  const renderLeadingIcon = () => {
    if (React.isValidElement(showLeadingIcon)) {
      return showLeadingIcon;
    }
    if (leadingSlot) {
      return leadingSlot;
    }
    return <CreditCardIcon width={20} height={20} />;
  };

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
          <View style={styles.titleRow}>
            <FoldText type="body-md-bold-v2" style={styles.title}>
              {title}
            </FoldText>
            {hasChip && hasChip}
          </View>

          {showSubtext && (
            <FoldText type="body-md-v2" style={styles.subtext}>
              {subtextSlot || subtext}
            </FoldText>
          )}

          {showFootnote && (
            <FoldText type="body-md-v2" style={styles.footnote}>
              {footnoteSlot || footnote}
            </FoldText>
          )}
        </View>

        {/* Trailing Icon */}
        {renderTrailingIcon(variant, selected)}
      </View>
    </FoldPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: SpacingM4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: ObjectSecondaryDefault,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textContent: {
    flex: 1,
    gap: SpacingM0,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
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
