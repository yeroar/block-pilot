import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import KeyboardButton from "../KeyboardButton/KeyboardButton";
import { DeleteIcon } from "../assets/BlueSkyIcons/DeleteIcon";
import {
  SpacingM16,
  SpacingM4,
  SpacingM8,
} from "../../generated-tokens/tokens";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "←"],
];

export default function CustomKeyboard({ onKeyPress }) {
  // Calculate screen width minus padding
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={styles.keyboardContainer}>
      {KEYS.map((row, rowIndex) => (
        <View key={`row-${rowIndex}`} style={styles.keyboardRow}>
          {row.map((key, keyIndex) => (
            <View
              key={key}
              style={[
                styles.keyCell,
                { width: screenWidth / 3 }, // Divide available width by 3
                keyIndex === 0 && { paddingLeft: 0 }, // First column: 32px left padding
                keyIndex === row.length - 1 && { paddingRight: 0 }, // Last column: 32px right padding
              ]}
            >
              {key === "←" ? (
                <KeyboardButton
                  variant="iconOnly"
                  icon={<DeleteIcon width={24} height={24} />}
                  onPress={() => onKeyPress?.(key)}
                />
              ) : (
                <KeyboardButton
                  variant="textOnly"
                  label={key}
                  onPress={() => onKeyPress?.(key)}
                />
              )}
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  keyboardRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  },
  keyCell: {
    alignItems: "center",
    justifyContent: "center",
    height: SpacingM16,
  },
});
