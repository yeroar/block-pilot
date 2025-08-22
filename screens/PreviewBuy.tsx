import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";

import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";

import {
  LayerBackground,
  SpacingM4,
  SpacingM0,
  SpacingM2,
} from "../generated-tokens/tokens";

import ConfirmationTradeBitcoin from "../cc-components/Confirmation/ConfirmationTradeBitcoin";
import { PaymentMethod } from "../cc-components/PMTile/PMTile";

type RouteParams = { amountStr?: string };

export default function PreviewBuy({
  route,
}: {
  route?: { params?: RouteParams };
}) {
  const amountStr = route?.params?.amountStr ?? "0";
  const amountNum = parseFloat(amountStr) || 0;
  const previewDisabled = amountNum < 10;

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );

  const handlePaymentSelect = (pm: PaymentMethod) => {
    setSelectedPayment(pm);
    console.log("Payment selected:", pm);
  };

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Buy bitcoin"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />
        }
      />
      <View style={[styles.body]}>
        <View style={styles.amountSection}>
          <CurrencyInput
            amount={`$${amountStr}`}
            topSlot={
              <TopContext
                // only show the Bitcoin icon when there is no fiat amount and no selected payment
                label={selectedPayment?.title}
                fiatAmount={`$${amountStr}`} // ensure BTC conversion appears as primary label
              />
            }
            bottomSlot={
              <BottomContext
                content={selectedPayment ? "payment" : "addPayment"}
                selectedPayment={selectedPayment}
                onPaymentSelect={handlePaymentSelect}
              />
            }
          />
        </View>

        <ConfirmationTradeBitcoin
          price="$100,000.00"
          amount="$99.00"
          feePercentLabel="1%"
          feeValue="+ $1.00"
        />
      </View>

      <ActionBar>
        <Button
          label="Preview buy"
          variant="primary"
          size="lg"
          onPress={() => {}}
          disabled={previewDisabled}
        />
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LayerBackground,
    paddingHorizontal: SpacingM4,
  },
  body: {
    flex: 1,
  },
  amountSection: {
    alignItems: "center",
    alignSelf: "stretch",
  },
});
