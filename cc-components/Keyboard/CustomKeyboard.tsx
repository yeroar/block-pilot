import React from "react";
import { View, StyleSheet } from "react-native";
import KeyboardButton from "../KeyboardButton/KeyboardButton";
import { LayerBackground, SpacingM2, SpacingM4, SpacingM6 } from "../../generated-tokens/tokens";
import { ArrowNarrowLeftIcon } from "../assets/BlueSkyIcons/ArrowNarrowLeftIcon";

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "←"];

export default function CustomKeyboard({ onKeyPress }) {
  return (
    <View style={styles.keyboardGrid}>
      {KEYS.map((key, idx) => (
        <View key={key + idx} style={styles.keyCell}>
          {key === "←" ? (
            <KeyboardButton
              variant="iconOnly"
              icon={<ArrowNarrowLeftIcon width={24} height={24} />}
              onPress={() => onKeyPress(key)}
            />
          ) : (
            <KeyboardButton
              variant="textOnly"
              label={key}
              onPress={() => onKeyPress(key)}
            />
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: LayerBackground,
    overflow: "hidden",
  },
  keyCell: {
    flexBasis: "33.33%", // 3 columns
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
});
