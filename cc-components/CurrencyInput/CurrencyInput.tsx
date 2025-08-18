import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { SpacingM12 } from "../../generated-tokens/tokens";

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
      <FoldText type="header-xl-v2" style={styles.amount}>
        {amount}
      </FoldText>
      {bottomSlot}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: SpacingM12,
    borderRadius: 8,
  },
  amount: {
    textAlign: "center",
  },
});

export default CurrencyInput;
