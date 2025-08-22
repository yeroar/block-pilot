import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import Chip from "../Chip/Chip";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import {
  LayerSecondary,
  BorderSecondary,
  BorderRadiusDefault,
  SpacingM1,
  SpacingM16,
} from "../../generated-tokens/tokens";

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

// Only export this example - updated to match card/bank styling
export const EmptyPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (pm: { key: "bank" | "card" }) => void;
}) => (
  <View style={[styles.listContainer, styles.addPaymentContainer]}>
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

      <ActionBar>
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
    gap: SpacingM1,
  },

  // Modifier for add payment method (no action bar)
  addPaymentContainer: {
    marginBottom: SpacingM16,
  },

  // Container for selector items with background and borders
  selectorList: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
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
