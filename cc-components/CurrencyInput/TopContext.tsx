import React from "react";
import { View, StyleSheet } from "react-native";
import {
  ObjectAccentBoldDefault,
  SpacingM1,
  SpacingM5,
} from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";

interface TopContextProps {
  leadingSlot?: boolean;
  isEmpty?: boolean;
  leadingIcon?: React.ReactNode;
  label?: string;
  paymentType?: "bank" | "card" | null; // new prop to determine payment type
}

const TopContext: React.FC<TopContextProps> = ({
  leadingIcon,
  label,
  paymentType,
}) => {
  const trimmed = typeof label === "string" ? label.trim() : "";
  const hasLabel = trimmed.length > 0;
  // const hasIcon = !!leadingIcon;

  // Determine icon based on payment type or fallback to provided icon
  const displayIcon =
    paymentType === "bank" ? (
      <BankIcon width={16} height={16} />
    ) : paymentType === "card" ? (
      <CreditCardIcon width={16} height={16} />
    ) : (
      leadingIcon
    );

  const hasIcon = !!displayIcon;

  // Empty: no label (icon-only is not supported)
  if (!hasLabel) {
    return <View style={styles.topContext} />;
  }

  // icon + label
  if (hasIcon) {
    return (
      <View style={styles.topContext}>
        <View style={styles.inline}>
          <View style={styles.iconMargin}>{displayIcon}</View>
          <FoldText type="body-md-bold-v2">{trimmed}</FoldText>
        </View>
      </View>
    );
  }

  // label only
  return (
    <View style={styles.topContext}>
      <FoldText type="body-md-bold-v2">{trimmed}</FoldText>
    </View>
  );
};

const styles = StyleSheet.create({
  topContext: {
    height: SpacingM5,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconMargin: {
    marginRight: SpacingM1,
  },
});

export default TopContext;
