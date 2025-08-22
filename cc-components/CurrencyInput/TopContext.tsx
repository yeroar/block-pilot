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
  paymentType?: "bank" | "card" | null;
  fiatAmount?: string;
}

const TopContext: React.FC<TopContextProps> = ({
  leadingIcon,
  label,
  paymentType,
  fiatAmount,
}) => {
  const trimmed = typeof label === "string" ? label.trim() : "";

  // parse fiat -> btc
  const parseFiat = (s?: string) => {
    if (!s) return null;
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  };
  const fiat = parseFiat(fiatAmount);
  const BTC_PRICE = 100000;
  const btc = fiat ? fiat / BTC_PRICE : null;

  // primary label uses BTC conversion when available, otherwise provided label
  const btcSymbolLabel = btc ? `~฿${btc.toFixed(6)}` : null;
  const primaryLabel = btcSymbolLabel ?? trimmed;

  // when we have btc conversion, show a small ฿ symbol instead of icon
  const displayIcon = btc ? (
    <FoldText type="body-sm-bold-v2" style={{ marginRight: SpacingM1 }}>
      ฿
    </FoldText>
  ) : paymentType === "bank" ? (
    <BankIcon width={16} height={16} />
  ) : paymentType === "card" ? (
    <CreditCardIcon width={16} height={16} />
  ) : (
    leadingIcon
  );

  const hasIcon = !!displayIcon;

  if (!primaryLabel) return <View style={styles.topContext} />;

  if (hasIcon) {
    return (
      <View style={styles.topContext}>
        <View style={styles.inline}>
          <View>
            <FoldText type="body-md-bold-v2">{primaryLabel}</FoldText>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.topContext}>
      <FoldText type="body-md-bold-v2">{primaryLabel}</FoldText>
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
});

export default TopContext;
