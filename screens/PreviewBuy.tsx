import React from "react";
import { View, StyleSheet } from "react-native";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";

import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";

import {
  LayerBackground,
  SpacingM4,
  SpacingM6,
  SpacingM12,
  SpacingM0,
} from "../generated-tokens/tokens";

import ConfirmationTradeBitcoin from "../cc-components/Confirmation/ConfirmationTradeBitcoin";

type RouteParams = { amountStr?: string };

export default function PreviewBuy({
  route,
}: {
  route?: { params?: RouteParams };
}) {
  const amountStr = route?.params?.amountStr ?? "0";
  const amountNum = parseFloat(amountStr) || 0;
  const previewDisabled = amountNum < 10;

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Buy bitcoin"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />
        }
      />

      <View style={styles.body}>
        <View>
          <CurrencyInput
            amount={`$${amountStr}`}
            topSlot={
              <TopContext
                leadingIcon={<CalendarIcon width={16} height={16} />}
                label="Weekly"
              />
            }
            bottomSlot={<BottomContext content="addPayment" />}
          />
        </View>

        <View style={styles.confirmationRow}>
          <ConfirmationTradeBitcoin
            price="$100,000.00"
            amount="$99.00"
            feePercentLabel="1%"
            feeValue="+ $1.00"
          />
        </View>

        {/* Flex spacer pushes the ActionBar down */}
        <View style={{ flex: 1 }} />

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
    paddingVertical: SpacingM12,
    gap: SpacingM6, // use gap instead of space-between
  },
  confirmationRow: {
    paddingVertical: SpacingM0,
  },
});
