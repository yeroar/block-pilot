import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../PMTile/PMTile";
import Button from "../Button/Button";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { SpacingM8 } from "../../generated-tokens/tokens";

interface BottomContextProps {
  content?: "maxButton" | "empty" | "payment" | "addPayment";
  onPaymentChange?: (paymentId: string) => void;
}

const BottomContext: React.FC<BottomContextProps> = ({
  content = "maxButton",
  onPaymentChange,
}) => {
  const [showBottomSheet, setShowBottomSheet] = useState(false);

  if (!content || content === "empty") return null;

  const handlePMTilePress = () => {
    setShowBottomSheet(true);
  };

  const handlePaymentSelect = (paymentId: string) => {
    onPaymentChange?.(paymentId);
  };

  const handleAddPayment = () => {
    console.log("Navigate to add payment flow");
  };

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
          leadingSlot={<BankIcon width={16} height={16} />}
          label="Wells Fargo ---- 0823"
          selected={false}
          onPress={handlePMTilePress}
        />
      )}
      {content === "addPayment" && (
        <ActionTile
          label="Add payment method"
          trailingSlot={<PlusCircleIcon width={16} height={16} />}
          selected={true}
          onPress={handlePMTilePress}
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
