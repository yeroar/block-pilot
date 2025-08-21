import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import PMTileBottomSheet from "./PMTileBottomSheet";
import Button from "../Button/Button";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import Chip from "../Chip/Chip";
import {
  SpacingM4,
  SpacingM6,
  LayerSecondary,
  BorderRadiusDefault,
} from "../../generated-tokens/tokens";

// Add Payment Content Example (navigation selectors)
export const AddPaymentContentExample = () => (
  <View style={styles.content}>
    <Selector
      variant="navigation"
      title="Bank account"
      subtext="Fund your purchase via ACH"
      footnote="Deposit fee waived"
      showLeadingIcon={<BankIcon width={20} height={20} />}
      hasChip={<Chip label="5%" />}
    />

    <Selector
      variant="navigation"
      title="Debit card"
      subtext="Link your debit card"
      footnote="[n.n]% deposit fee ($[n.nn] min)"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
      hasChip={<Chip label="5%" />}
    />
  </View>
);

// Default Payment Content Example (navigation selectors - existing payment methods)
export const DefaultPaymentContentExample = () => (
  <View style={styles.content}>
    <Selector
      variant="navigation"
      title="Debit card"
      subtext="**** 1234"
      footnote="Expires 12/26"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
    />
    <Selector
      variant="navigation"
      title="Bank account"
      subtext="Wells Fargo ****0823"
      footnote="Checking account"
      showLeadingIcon={<BankIcon width={20} height={20} />}
    />
  </View>
);

// Radio Payment Selection Example (with selection state)
export const RadioPaymentContentExample = ({
  selectedPayment,
  onRadioSelect,
}: {
  selectedPayment: string | null;
  onRadioSelect: (paymentId: string) => void;
}) => (
  <View style={styles.content}>
    <Selector
      variant="radio"
      title="Debit card"
      subtext="**** 1234"
      footnote="Expires 12/26"
      showLeadingIcon={<CreditCardIcon width={20} height={20} />}
      selected={selectedPayment === "credit"}
      onPress={() => onRadioSelect("credit")}
    />
    <Selector
      variant="radio"
      title="Bank account"
      subtext="Wells Fargo ****0823"
      footnote="Checking account"
      showLeadingIcon={<BankIcon width={20} height={20} />}
      selected={selectedPayment === "bank"}
      onPress={() => onRadioSelect("bank")}
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
      <View style={styles.info}>
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
      </View>

      <PMTileBottomSheet
        variant="add-payment"
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
    backgroundColor: LayerSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusDefault,
  },
  info: {
    alignItems: "center",
    gap: SpacingM6,
  },
  selectedInfo: {
    width: "100%",
    maxWidth: 300,
  },
});

export default InteractiveAddPaymentExample;
