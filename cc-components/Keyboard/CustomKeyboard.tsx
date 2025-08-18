import React from "react";
import { View, StyleSheet } from "react-native";
import KeyboardButton from "../KeyboardButton/KeyboardButton";
import { DeleteIcon } from "../assets/BlueSkyIcons/DeleteIcon";
import { SpacingM4, SpacingM16 } from "../../generated-tokens/tokens";

const KEYS = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  [".", "0", "←"], // add '.' to input cents
];

type Props = { onKeyPress: (k: string) => void };

export default function CustomKeyboard({ onKeyPress }: Props) {
  return (
    <View style={styles.keyboardContainer}>
      {KEYS.map((row, rIdx) => (
        <View key={rIdx} style={styles.keyboardRow}>
          {row.map((k, idx) => {
            const isDelete = k === "←";
            const isEmpty = k === "";
            if (isEmpty)
              return <View key={`sp-${idx}`} style={styles.keyCell} />;
            if (isDelete) {
              return (
                <View key={k} style={styles.keyCell}>
                  <KeyboardButton
                    variant="iconOnly"
                    icon={<DeleteIcon width={24} height={24} />}
                    onPress={() => onKeyPress("backspace")}
                  />
                </View>
              );
            }
            return (
              <View key={k} style={styles.keyCell}>
                <KeyboardButton
                  variant="textOnly"
                  label={k}
                  onPress={() => onKeyPress(k)}
                />
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    width: "100%",
    gap: SpacingM4,
  },
  keyboardRow: {
    flexDirection: "row",
    width: "100%",
    gap: SpacingM4,
  },
  keyCell: {
    flex: 1,
    height: SpacingM16,
  },
});
