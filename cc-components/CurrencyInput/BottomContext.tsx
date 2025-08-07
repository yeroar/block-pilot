import React from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../ActionTile/ActionTile";
import FWButton from "../Button/FWButton";
import { PlusCircleIcon } from "../../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../../assets/BlueSkyIcons/BankIcon";
import {
  ObjectPrimarySubtleDefault,
  BorderRadiusBr1,
  SpacingM3,
  SpacingM8,
  FacePrimary,
  MobileButton02,
  FontWeightsMedium
} from "../../generated-tokens/tokens";

interface BottomContextProps {
  state?: "maxButton" | "empty" | "payment" | "addPayment";
}

const BottomContext: React.FC<BottomContextProps> = ({ state = "maxButton" }) => {
  if (!state || state === "empty") return null;

  return (
    <View style={styles.bottomContext}>
      {state === "maxButton" && (
        <FWButton
          label="Max $100"
          onPress={() => console.log("Max button pressed")}
          style={styles.maxButton}
          textStyle={styles.maxButtonText}
        />
      )}
      {state === "payment" && (
        <ActionTile
          leadingSlot={<BankIcon width={16} height={16} />}
          label="Wells Fargo ---- 0823"
          selected={false}
          onPress={() => console.log("Payment method pressed")}
        />
      )}
      {state === "addPayment" && (
        <ActionTile
          label="Add payment method"
          trailingSlot={<PlusCircleIcon width={16} height={16} />}
          selected={true}
          onPress={() => console.log("Add payment method pressed")}
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
  maxButton: {
    height: SpacingM8,
    backgroundColor: ObjectPrimarySubtleDefault,
    paddingHorizontal: SpacingM3,
    borderRadius: BorderRadiusBr1,
  },
  maxButtonText: {
    ...MobileButton02,
    fontWeight: FontWeightsMedium, // Ensure compatibility with React Native
    color: FacePrimary,
  },
});

export default BottomContext;
