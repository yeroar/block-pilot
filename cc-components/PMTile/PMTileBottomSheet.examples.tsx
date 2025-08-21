import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Selector from "../Selector/Selector";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import {
  BorderRadiusDefault,
  SpacingM6,
  SpacingM4,
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

// New: card samples rendered as radio list
export const CardsPaymentContentExample = ({
  onSelect,
}: {
  onSelect?: (cardId: string) => void;
}) => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      id: "visa",
      title: "Visa Debit Card",
      subtitle: "**** 1234",
      icon: <CreditCardIcon width={20} height={20} />,
    },
    {
      id: "mastercard",
      title: "Mastercard Credit",
      subtitle: "**** 5678",
      icon: <CreditCardIcon width={20} height={20} />,
    },
    {
      id: "amex",
      title: "American Express",
      subtitle: "**** 9012",
      icon: <CreditCardIcon width={20} height={20} />,
    },
  ];

  return (
    <View style={[styles.content, styles.cardList]}>
      {cards.map((c) => (
        <Pressable
          key={c.id}
          style={[styles.cardRow]}
          onPress={() => {
            setSelectedCard(c.id);
            onSelect?.(c.id);
          }}
          accessibilityRole="radio"
          accessibilityState={{ selected: selectedCard === c.id }}
        >
          <View style={styles.cardLeft}>{c.icon}</View>
          <View style={styles.cardMiddle}>
            <Text style={styles.cardTitle}>{c.title}</Text>
            <Text style={styles.cardSubtitle}>{c.subtitle}</Text>
          </View>
          <View style={styles.cardRight}>
            <View
              style={[
                styles.radioOuter,
                selectedCard === c.id && styles.radioOuterSelected,
              ]}
            >
              {selectedCard === c.id && <View style={styles.radioInner} />}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
    marginBottom: SpacingM6,
    gap: 1,
    backgroundColor: "transparent",
  },
  cardList: {
    paddingVertical: SpacingM4,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SpacingM4,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ECECEC",
  },
  cardLeft: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardMiddle: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  cardSubtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },
  cardRight: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 1.5,
    borderColor: "#C4C4C4",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuterSelected: {
    borderColor: "#007AFF",
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
});
