import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopContext from "./TopContext";
import BottomContext from "./BottomContext";

interface CurrencyInputProps {
  topContextVariant?: "Frequency" | "~฿" | "Empty";
  amount?: string;
  bottomContextVariant?: "maxButton" | "empty" | "payment" | "addPayment";
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  topContextVariant = "~฿",
  amount = "$0",
  bottomContextVariant = "maxButton",
}) => {
  return (
    <View style={styles.container}>
      {topContextVariant !== "Empty" && <TopContext content={topContextVariant} />}
      <Text style={styles.amount}>{amount}</Text>
      <BottomContext state={bottomContextVariant} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fcfaf2",
    borderRadius: 8,
  },
  amount: {
    fontSize: 72,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CurrencyInput;
