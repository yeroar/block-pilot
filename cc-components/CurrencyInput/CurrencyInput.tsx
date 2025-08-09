import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface CurrencyInputProps {
  amount?: string;
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({ amount = "$0", topSlot, bottomSlot }) => {
  return (
    <View style={styles.container}>
      {topSlot}
      <Text style={styles.amount}>{amount}</Text>
      {bottomSlot}
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
