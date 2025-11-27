import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import Chip from "../Chip/Chip";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import { FoldText } from "../Primitives/FoldText";
import {
  LayerSecondary,
  BorderSecondary,
  BorderRadiusDefault,
  SpacingM1,
  SpacingM16,
  SpacingM5,
  SpacingM0,
  SpacingM4,
  ObjectPrimaryBoldDefault,
  ObjectAccentBoldDefault,
  FacePrimary,
  SpacingM8,
  Blue100,
  SpacingM3,
} from "../../generated-tokens/tokens";

// Lightning icon using asset as fill
const LightningIcon = () => (
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <Image
      source={require("../assets/Lighting.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    />
  </View>
);

// Bitcoin/cash icon using asset as fill
const BitcoinIcon = () => (
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <Image
      source={require("../assets/Cash balance.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    />
  </View>
);

// Card icon using asset as fill
const CardIconContainer = () => (
  <View
    style={{
      width: 40,
      height: 40,
      borderRadius: 12,
      overflow: "hidden",
    }}
  >
    <Image
      source={require("../assets/Visa.png")}
      style={{ width: "100%", height: "100%" }}
      resizeMode="cover"
    />
  </View>
);

// Updated payment methods to match Figma design
const cashBalanceMethod = {
  key: "cash" as const,
  icon: <BitcoinIcon />,
  title: "Cash balance",
  subtitle: "$500.00",
  chip: "2.5%",
  chipColor: ObjectAccentBoldDefault, // blue chip
};

const visaCardMethod = {
  key: "card" as const,
  icon: <CardIconContainer />,
  title: "Visa",
  subtitle: "•••• 0823",
  chip: "0.5%",
  chipColor: ObjectAccentBoldDefault,
};

const lightningMethod = {
  key: "lightning" as const,
  icon: <LightningIcon />,
  title: "Lightning",
  subtitle: "Instant delivery, minimal fees",
  chip: "1.5%",
  chipColor: ObjectAccentBoldDefault,
};

// Legacy methods for backward compatibility
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

// New: Payment method selection matching Figma design
export const PaymentMethodSelectionExample = ({
  onSelect,
}: {
  onSelect?: (methodKey: string) => void;
}) => {
  const insets = useSafeAreaInsets();
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const paymentMethods = [cashBalanceMethod, visaCardMethod, lightningMethod];

  return (
    <View
      style={[
        styles.listContainer,
        {
          marginBottom: insets.bottom,
        },
      ]}
    >
      <FoldText type="header-md-v2" style={styles.header}>
        Choose payment method
      </FoldText>

      <View style={[styles.selectorListClean, styles.selectorListPadding]}>
        {paymentMethods.map((method, index) => (
          <React.Fragment key={method.key}>
            <Selector
              variant="radio"
              title={method.title}
              subtext={method.subtitle}
              showLeadingIcon={method.icon}
              hasChip={
                <Chip
                  label={method.chip}
                  onPress={() => {}}
                  bold={selectedMethod === method.key}
                />
              }
              selected={selectedMethod === method.key}
              onPress={() => setSelectedMethod(method.key)}
            />
          </React.Fragment>
        ))}
      </View>

      <ActionBar>
        <Button
          label="Use this payment method"
          variant="primary"
          size="lg"
          onPress={() => selectedMethod && onSelect?.(selectedMethod)}
          disabled={!selectedMethod}
        />
      </ActionBar>
    </View>
  );
};

// Keep existing EmptyPaymentContentExample for backward compatibility
export const EmptyPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (pm: { key: "bank" | "card" }) => void;
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.listContainer,
        {
          marginBottom: SpacingM16 + insets.bottom,
        },
      ]}
    >
      <View style={styles.selectorList}>
        <Selector
          variant="navigation"
          title={bankMethod.title}
          subtext={bankMethod.subtitle}
          footnote={bankMethod.subsubtitle}
          showLeadingIcon={bankMethod.icon}
          onPress={() => onSelect?.({ key: "bank" })}
        />
        <View style={styles.divider} />
        <Selector
          variant="navigation"
          title={cardMethod.title}
          subtext={cardMethod.subtitle}
          footnote={cardMethod.subsubtitle}
          showLeadingIcon={cardMethod.icon}
          onPress={() => onSelect?.({ key: "card" })}
        />
      </View>
    </View>
  );
};

// Updated: card samples with chip indicators matching the Figma design
export const CardsPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (cardId: string) => void;
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "wells",
      title: "Wells Fargo",
      subtitle: "---- 0823",
      icon: <CreditCardIcon width={20} height={20} />,
      chip: "5%",
    },
    {
      id: "chase",
      title: "Chase",
      subtitle: "---- 1234",
      icon: <CreditCardIcon width={20} height={20} />,
      chip: "5%",
    },
  ];

  return (
    <View style={styles.listContainer}>
      <View style={styles.selectorList}>
        {cards.map((card, index) => (
          <React.Fragment key={card.id}>
            <Selector
              variant="radio"
              title={card.title}
              subtext={card.subtitle}
              showLeadingIcon={card.icon}
              hasChip={<Chip label={card.chip} onPress={() => {}} />}
              selected={selectedCard === card.id}
              onPress={() => setSelectedCard(card.id)}
            />
            {index < cards.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      <ActionBar style={{ marginBottom: SpacingM4 }}>
        <Button
          label="Use this payment card"
          variant="primary"
          size="lg"
          onPress={() => selectedCard && onSelect?.(selectedCard)}
          disabled={!selectedCard}
        />
      </ActionBar>
    </View>
  );
};

// Updated: bank accounts with same design pattern as cards
export const BankPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (accountId: string) => void;
}) => {
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

  const accounts = [
    {
      id: "wells",
      title: "Wells Fargo",
      subtitle: "---- 0823",
      icon: <CreditCardIcon width={20} height={20} />,
      chip: "5%",
    },
    {
      id: "chase",
      title: "Chase",
      subtitle: "---- 1234",
      icon: <CreditCardIcon width={20} height={20} />,
      chip: "5%",
    },
  ];

  return (
    <View style={styles.listContainer}>
      <View style={styles.selectorList}>
        {accounts.map((account, index) => (
          <React.Fragment key={account.id}>
            <Selector
              variant="radio"
              title={account.title}
              subtext={account.subtitle}
              showLeadingIcon={account.icon}
              hasChip={<Chip label={account.chip} onPress={() => {}} />}
              selected={selectedAccount === account.id}
              onPress={() => setSelectedAccount(account.id)}
            />
            {index < accounts.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      <ActionBar>
        <Button
          label="Use this account"
          variant="primary"
          size="lg"
          onPress={() => selectedAccount && onSelect?.(selectedAccount)}
          disabled={!selectedAccount}
        />
      </ActionBar>
    </View>
  );
};

export const getCardDetails = (id: string) => {
  const cards = {
    wells: {
      key: "card",
      icon: <CreditCardIcon width={20} height={20} />,
      title: "Wells Fargo",
      subtitle: "---- 0823",
    },
    chase: {
      key: "card",
      icon: <CreditCardIcon width={20} height={20} />,
      title: "Chase",
      subtitle: "---- 1234",
    },
  };
  return cards[id];
};

export const getBankDetails = (id: string) => {
  const banks = {
    wells: {
      key: "bank",
      icon: <BankIcon width={20} height={20} />,
      title: "Wells Fargo",
      subtitle: "---- 0823",
    },
    chase: {
      key: "bank",
      icon: <BankIcon width={20} height={20} />,
      title: "Chase",
      subtitle: "---- 1234",
    },
  };
  return banks[id];
};

const styles = StyleSheet.create({
  // Main container for the list design
  listContainer: {
    gap: SpacingM0,
  },

  // Header with vertical padding
  header: {
    paddingTop: SpacingM3,
    paddingBottom: 20,
  },

  // Modifier for add payment method (no action bar)
  addPaymentContainer: {
    marginBottom: SpacingM16,
  },

  // Container for selector items with background and borders (legacy)
  selectorList: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
  },

  // Clean selector list without background, padding, or dividers
  selectorListClean: {
    // No background, padding, or borders
  },

  // Vertical padding for selectors list
  selectorListPadding: {
    paddingVertical: 12,
  },

  // Divider between selector items
  divider: {
    height: 1,
    backgroundColor: BorderSecondary,
  },

  // Legacy styles kept for backward compatibility
  content: {
    gap: 1,
  },
});
