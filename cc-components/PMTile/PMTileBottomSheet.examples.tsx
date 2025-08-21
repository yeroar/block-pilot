import React from "react";
import { View, StyleSheet } from "react-native";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import { BorderRadiusDefault, SpacingM6 } from "../../generated-tokens/tokens";

// Minimal items for selection
const bankMethod = {
  key: "bank" as const,
  icon: <BankIcon width={20} height={20} />,
  title: "Bank account",
  subtitle: "Fund your purchase via ACH",
  subsubtitle: "Deposit fee waived",
};

const cardMethod = {
  key: "card" as const,
  icon: <CreditCardIcon width={20} height={20} />,
  title: "Debit card",
  subtitle: "Link your debit card",
  subsubtitle: "n.n% deposit fee ($n.nn min)",
};

// Only export this example
export const EmptyPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (pm: { key: "bank" | "card" }) => void;
}) => (
  <View style={styles.content}>
    <Selector
      variant="navigation"
      title={bankMethod.title}
      subtext={bankMethod.subtitle}
      footnote={bankMethod.subsubtitle}
      showLeadingIcon={bankMethod.icon}
      onPress={() => onSelect?.({ key: "bank" })}
    />
    <Selector
      variant="navigation"
      title={cardMethod.title}
      subtext={cardMethod.subtitle}
      footnote={cardMethod.subsubtitle}
      showLeadingIcon={cardMethod.icon}
      onPress={() => onSelect?.({ key: "card" })}
    />
  </View>
);

const styles = StyleSheet.create({
  content: {
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
    marginBottom: SpacingM6,
    gap: 1,
  },
});
