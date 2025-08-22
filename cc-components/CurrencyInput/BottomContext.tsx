import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../PMTile/PMTile";
import Button from "../Button/Button";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { SpacingM8 } from "../../generated-tokens/tokens";
import { PaymentMethod } from "../PMTile/PMTile";

interface BottomContextProps {
  content?: "maxButton" | "empty" | "payment" | "addPayment";
  selectedPayment?: PaymentMethod | null;
  onPaymentSelect?: (pm: PaymentMethod) => void;
}

const BottomContext: React.FC<BottomContextProps> = ({
  content = "maxButton",
  selectedPayment,
  onPaymentSelect,
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  if (!content || content === "empty") return null;

  return (
    <View style={styles.bottomContext}>
      {content === "maxButton" && (
        <Button
          size="xs"
          variant="secondary"
          label="Max $100"
          onPress={() => console.log("Max button pressed")}
        />
      )}
      {content === "payment" && (
        <ActionTile
          leadingSlot={selectedPayment?.icon}
          label={selectedPayment?.title || "Wells Fargo ---- 0823"}
          selected={false}
          enablePaymentSelection={true}
          onPaymentSelect={onPaymentSelect}
        />
      )}
      {content === "addPayment" && (
        <ActionTile
          label="Add payment method"
          trailingSlot={<PlusCircleIcon width={16} height={16} />}
          selected={true}
          enablePaymentSelection={true}
          onPaymentSelect={onPaymentSelect}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContext: {
    height: SpacingM8,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
});

export default BottomContext;
