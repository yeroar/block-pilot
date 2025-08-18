import React from "react";
import { View, StyleSheet } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { SpacingM12, SpacingM4 } from "../../generated-tokens/tokens";
import { LastCharBubble } from "./animations"; // moved animation component here

interface CurrencyInputProps {
  amount?: string; // e.g. "$12.34"
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount = "$0",
  topSlot,
  bottomSlot,
}) => {
  const chars = amount.split("");
  const lastIndex = chars.length - 1;

  return (
    <View style={styles.container}>
      {topSlot}

      <View style={styles.amountRow}>
        {chars.map((ch, i) =>
          i === lastIndex ? (
            // key includes length so a new last char mounts and animates
            <LastCharBubble key={`last-${ch}-${chars.length}`} ch={ch} />
          ) : (
            <FoldText key={`ch-${i}-${ch}`} type="header-xl-v2">
              {ch}
            </FoldText>
          )
        )}
      </View>

      {bottomSlot}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    alignSelf: "stretch",
    gap: SpacingM4,
    alignItems: "center",
    padding: SpacingM12,
    borderRadius: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default CurrencyInput;
