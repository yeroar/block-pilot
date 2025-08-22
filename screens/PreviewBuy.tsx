import React, { useState } from "react";
import { View, StyleSheet, Animated, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
  ObjectPrimaryBoldDefault,
  SpacingM4,
  SpacingM0,
  SpacingM2,
} from "../generated-tokens/tokens";

import ConfirmationTradeBitcoin from "../cc-components/Confirmation/ConfirmationTradeBitcoin";
import { PaymentMethod } from "../cc-components/PMTile/PMTile";

type RouteParams = { amountStr?: string };

const { height: screenHeight } = Dimensions.get("window");

export default function PreviewBuy({
  route,
}: {
  route?: { params?: RouteParams };
}) {
  const navigation = useNavigation<any>();
  const amountStr = route?.params?.amountStr ?? "0";
  const amountNum = parseFloat(amountStr) || 0;

  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnimation = useState(new Animated.Value(screenHeight))[0]; // Start off-screen at bottom

  // disable preview until amount is valid AND a payment method is selected
  const previewDisabled = amountNum < 10 || !selectedPayment;

  const handlePaymentSelect = (pm: PaymentMethod) => {
    setSelectedPayment(pm);
    console.log("Payment selected:", pm);
  };

  const handleConfirmBuy = () => {
    if (!previewDisabled && !isAnimating) {
      setIsAnimating(true);

      // Start animation - yellow overlay slides up from bottom to top
      Animated.timing(slideAnimation, {
        toValue: 0, // Move to cover the screen
        duration: 500, // Slightly faster animation
        useNativeDriver: true,
      }).start();

      // Navigate when overlay is almost covering the screen (not after animation completes)
      setTimeout(() => {
        navigation.replace("Success", { amount: `$${amountStr}.00` });
        // Reset animation for next time
        slideAnimation.setValue(screenHeight);
        setIsAnimating(false);
      }, 400); // Navigate before animation completes
    }
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
            amount={`$${amountStr}` + ".00"}
            topSlot={<TopContext variant="btc" fiatAmount={`$${amountStr}`} />}
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
          amount={`$${amountStr}` + ".00"}
          feePercentLabel="1%"
        />
      </View>

      <ActionBar>
        <Button
          label="Confirm buy"
          variant="primary"
          size="lg"
          onPress={handleConfirmBuy}
          disabled={previewDisabled || isAnimating}
        />
      </ActionBar>

      {/* Yellow slide animation overlay */}
      {isAnimating && (
        <Animated.View
          style={[
            styles.slideOverlay,
            {
              transform: [{ translateY: slideAnimation }],
            },
          ]}
        />
      )}
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
  slideOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: screenHeight,
    backgroundColor: ObjectPrimaryBoldDefault, // Yellow overlay
    zIndex: 1000,
  },
});
