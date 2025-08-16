import React from "react";
import { View, StyleSheet } from "react-native";
import ActionTile from "../PMTile/PMTile";
import Button from "../Button/Button";
import { FoldText } from "../Primitives/FoldText";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import {
  ObjectPrimarySubtleDefault,
  BorderRadiusBr1,
  SpacingM3,
  SpacingM8,
} from "../../generated-tokens/tokens";

interface BottomContextProps {
  content?: "maxButton" | "empty" | "payment" | "addPayment";
}

const BottomContext: React.FC<BottomContextProps> = ({
  content = "maxButton",
}) => {
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
          leadingSlot={<BankIcon width={16} height={16} />}
          label="Wells Fargo ---- 0823"
          selected={false}
          onPress={() => console.log("Payment method pressed")}
        />
      )}
      {content === "addPayment" && (
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
});

export default BottomContext;
