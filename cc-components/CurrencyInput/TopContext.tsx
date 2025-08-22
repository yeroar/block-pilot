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
  variant?: "btc" | "cash" | "auto"; // new
}

const TopContext: React.FC<TopContextProps> = ({
  leadingIcon,
  label,
  paymentType,
  fiatAmount,
  variant,
}) => {
  const trimmed = typeof label === "string" ? label.trim() : "";

  // parse fiat -> btc
  const parseFiat = (s?: string) => {
    if (!s) return null;
    const n = parseFloat(s.replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) ? n : null;
  };
  const fiat = parseFiat(fiatAmount); // returns 0 for "$0"
  const BTC_PRICE = 100000;
  const btc = fiat !== null ? fiat / BTC_PRICE : null; // treat 0 as valid

  // primary label uses BTC conversion when available, otherwise provided label
  const btcSymbolLabel = btc !== null ? `~฿${btc.toFixed(6)}` : null;

  // variant controls display:
  // - "btc": show BTC conversion as primary label + ฿ icon
  // - "cash": show provided label / payment icons
  // - "auto": fallback to conversion when fiat is provided, otherwise label
  const activeVariant = (variant ?? "auto") as "btc" | "cash" | "auto";

  const showBtc =
    activeVariant === "btc" || (activeVariant === "auto" && btc !== null);
  const primaryLabel = showBtc ? btcSymbolLabel ?? trimmed : trimmed;

  const displayIcon = showBtc ? (
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
