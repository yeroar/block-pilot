import React from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../ActionTile/ActionTile";
import FWButton from "../Button/FWButton";
import { FoldText } from "../Primitives/FoldText";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import {
  ObjectPrimarySubtleDefault,
  BorderRadiusBr1,
  SpacingM3,
  SpacingM8
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
          labelSlot={<FoldText type="body-sm-bold-v2">Max $100</FoldText>}
          onPress={() => console.log("Max button pressed")}
          style={styles.maxButton}
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
});

export default BottomContext;
