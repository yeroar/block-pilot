import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { SpacingM12, SpacingM4 } from "../../generated-tokens/tokens";

interface CurrencyInputProps {
  amount?: string;
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount = "$0",
  topSlot,
  bottomSlot,
}) => {
  return (
    <View style={styles.container}>
      {topSlot}
      <FoldText type="currency-input" style={styles.amount}>
        {amount}
      </FoldText>
      {bottomSlot}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    alignSelf: "stretch",
    gap: SpacingM4,
    alignItems: "center",
    padding: SpacingM12,
    borderRadius: 8,
  },
  amount: {
    textAlign: "center",
  },
});

export default CurrencyInput;
