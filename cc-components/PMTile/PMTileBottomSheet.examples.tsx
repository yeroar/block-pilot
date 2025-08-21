import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PMTileBottomSheet from "./PMTileBottomSheet";
import Button from "../Button/Button";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import Chip from "../Chip/Chip";
import { SpacingM6, BorderRadiusDefault } from "../../generated-tokens/tokens";

// Minimal objects used by EmptyPaymentContentExample to drive selection
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

// Shown first: lets user choose bank or card
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

// Simple radio mockup for card selection
export const CardPaymentContentExample = ({
  selectedPayment,
  onRadioSelect,
}: {
  selectedPayment: string | null;
  onRadioSelect: (paymentId: "visa" | "mastercard" | "amex") => void;
}) => (
  <View style={styles.content}>
    <Selector
      variant="radio"
      title="Visa Debit Card"
      subtext="****1234"
      footnote="Expires 12/26"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
      selected={selectedPayment === "visa"}
      onPress={() => onRadioSelect("visa")}
    />
    <Selector
      variant="radio"
      title="Mastercard Credit"
      subtext="****5678"
      footnote="Expires 08/27"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
      selected={selectedPayment === "mastercard"}
      onPress={() => onRadioSelect("mastercard")}
    />
    <Selector
      variant="radio"
      title="American Express"
      subtext="****9012"
      footnote="Expires 03/28"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
      selected={selectedPayment === "amex"}
      onPress={() => onRadioSelect("amex")}
    />
  </View>
);

// Interactive Example with State
export const InteractiveAddPaymentExample = () => {
  const [visible, setVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handlePaymentSelect = (method: string) => {
    setSelectedMethod(method);
    console.log(`Selected: ${method}`);

    // Simulate navigation to payment setup
    setTimeout(() => {
      setVisible(false);
      alert(`Setting up ${method} payment...`);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <Button
        label="Choose Payment Method"
        variant="secondary"
        size="lg"
        onPress={() => setVisible(true)}
      />
      {selectedMethod && (
        <View style={styles.selectedInfo}>
          <Selector
            variant="navigation"
            title={`Selected: ${
              selectedMethod === "bank" ? "Bank Account" : "Debit Card"
            }`}
            subtext={
              selectedMethod === "bank" ? "ACH Transfer" : "Card Payment"
            }
          />
        </View>
      )}

      <PMTileBottomSheet
        variant="default"
        visible={visible}
        title="Add payment method"
        onClose={() => setVisible(false)}
        onSelectPayment={handlePaymentSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    borderRadius: BorderRadiusDefault,
    overflow: "hidden", // This is the key property!
    marginBottom: SpacingM6,
    gap: 1,
  },

  selectedInfo: {
    width: "100%",
    maxWidth: 300,
  },
});

export default InteractiveAddPaymentExample;
