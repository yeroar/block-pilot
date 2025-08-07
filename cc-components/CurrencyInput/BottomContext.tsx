import React from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../ActionTile/ActionTile";
import FWButton from "../Button/FWButton";
import { PlusCircleIcon } from "../../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../../assets/BlueSkyIcons/BankIcon";

interface BottomContextProps {
  state?: "maxButton" | "empty" | "payment" | "addPayment";
}

const BottomContext: React.FC<BottomContextProps> = ({ state = "maxButton" }) => {
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
          leadingSlot={<BankIcon />}
          label="Wells Fargo ---- 0823"
          onPress={() => console.log("Payment method pressed")}
        />
      )}
      {state === "addPayment" && (
        <ActionTile
          selected={true}
          label="Add payment method"
          trailingSlot={<PlusCircleIcon />}
          onPress={() => console.log("Add payment method pressed")}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContext: {
    height: 32,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default BottomContext;
