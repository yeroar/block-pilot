import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionTile from "../ActionTile/ActionTile";
import FWButton from "../Button/FWButton";
import { AddIcon } from "../../generated-tokens/tokens";
import MinimalIcon from "../../components/content/MinimalIcon";

const TopContext: React.FC<{ content: string }> = ({ content }) => {
  if (!content) return null;

  return (
    <View style={styles.topContext}>
      <Text style={styles.topContextText}>{content}</Text>
    </View>
  );
};

const BottomContext: React.FC<{ state?: "maxButton" | "empty" | "payment" | "addPayment" }> = ({ state = "maxButton" }) => {
  if (!state || state === "empty") return null;

  return (
    <View style={styles.bottomContext}>
      {state === "maxButton" && (
        <FWButton
          label="$100"
          onPress={() => console.log("Max button pressed")}
        />
      )}
      {state === "payment" && (
        <ActionTile
        selected={false}
          label="Payment Method"
          onPress={() => console.log("Payment method pressed")}
        />
      )}
      {state === "addPayment" && (
        <ActionTile
        selected={true}
          label="Add payment method"
          trailingSlot={<MinimalIcon name={AddIcon} size={16} />} // Use AddIcon from tokens
          onPress={() => console.log("Add payment method pressed")}
        />
      )}
    </View>
  );
};

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
  topContext: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topContextText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  amount: {
    fontSize: 72,
    fontWeight: "bold",
    textAlign: "center",
  },
  bottomContext: {
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default CurrencyInput;
