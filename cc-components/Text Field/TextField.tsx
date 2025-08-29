import React from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import FoldPressable from "../Primitives/FoldPressable";
import { CopyIcon } from "../assets/BlueSkyIcons/CopyIcon";

// Design tokens from Figma node (fallback to hex so no extra deps needed)
const COLORS = {
  layerSecondary: "#fffdfa", // Layer/secondary
  borderSecondary: "#f5efd6", // Border/secondary
  faceTertiary: "#817e73", // Face/tertiary (label)
  facePrimary: "#3f3e3a", // Face/primary (value)
};
const SPACING = {
  m1: 4,
  m4: 16,
  iconPad: 8,
};
const RADII = {
  outer: 12,
  icon: 8,
};

export interface ClaimCodeFieldProps {
  label?: string; // e.g., "Claim code"
  code: string; // e.g., "SKN2-YX7NK2-SAAU"
  style?: ViewStyle;
  labelStyle?: TextStyle;
  codeStyle?: TextStyle;
  onCopy?: (code: string) => void; // called when pressing the copy icon
}

const ClaimCodeField: React.FC<ClaimCodeFieldProps> = ({
  label = "Claim code",
  code,
  style,
  labelStyle,
  codeStyle,
  onCopy,
}) => {
  const handleCopy = () => {
    if (onCopy) {
      onCopy(code);
      return;
    }
    // Optional best-effort fallback without adding deps
    try {
      // Dynamically import if available in the project
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Clipboard = require("@react-native-clipboard/clipboard");
      Clipboard?.setString?.(code);
    } catch {
      // no-op fallback
    }
  };

  return (
    <View style={[styles.lineAction, style]}>
      {/* Left content: label + code */}
      <View style={styles.content}>
        <View style={styles.topRow}>
          <FoldText type="body-md-v2" style={[styles.label, labelStyle]}>
            {label}
          </FoldText>
        </View>
        <View style={styles.bottomRow}>
          <FoldText type="body-md-v2" style={[styles.value, codeStyle]}>
            {code}
          </FoldText>
        </View>
      </View>

      {/* Copy button */}
      <FoldPressable
        accessibilityRole="button"
        accessibilityLabel="Copy code"
        onPress={handleCopy}
        style={styles.iconButton}
      >
        <CopyIcon />
      </FoldPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  lineAction: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.layerSecondary,
    borderColor: COLORS.borderSecondary,
    borderWidth: 1,
    borderRadius: RADII.outer,
    padding: SPACING.m4, // 16
  },
  content: {
    flexShrink: 1,
  },
  topRow: {
    height: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.m1,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.m1,
  },
  label: {
    color: COLORS.faceTertiary,
    // Body-md-v2 font is handled by FoldText type, keep only color here
  },
  value: {
    color: COLORS.facePrimary,
    // Body-md-v2 font handled by FoldText
  },
  iconButton: {
    backgroundColor: COLORS.layerSecondary,
    padding: SPACING.iconPad, // 8
    borderRadius: RADII.icon,
  },
});

export default ClaimCodeField;
