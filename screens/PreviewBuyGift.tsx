import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  Text,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { RootStackParamList } from "./AppNavigator";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";

import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";
import { CreditCardIcon } from "../cc-components/assets/BlueSkyIcons/CreditCardIcon";

import {
  LayerBackground,
  ObjectPrimaryBoldDefault,
  SpacingM4,
  SpacingM5,
  SpacingM6,
  SpacingM8,
} from "../generated-tokens/tokens";

import ConfirmationBuyGiftCard from "../cc-components/Confirmation/ConfirmationBuyGiftCard";
import PMTile, { PaymentMethod } from "../cc-components/PMTile/PMTile";
import { ChevronDownIcon } from "../cc-components/assets/BlueSkyIcons/ChevronDownIcon";

type RouteParams = { amountStr?: string };

const { height: screenHeight } = Dimensions.get("window");

// Add proper typing for navigation
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const logoAirbnb = require("../cc-components/assets/logoABNB.png");

export default function PreviewBuyGiftCard() {
  const navigation = useNavigation<NavigationProp>();

  // static data for preview
  const amountStr = "100";
  const amountNum = 100;

  // no default payment selected
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod | null>(
    null
  );

  const [isAnimating, setIsAnimating] = useState(false);
  const slideAnimation = useState(new Animated.Value(screenHeight))[0];

  // disable preview until a payment method is selected
  const previewDisabled = !selectedPayment;

  const handlePaymentSelect = (pm: PaymentMethod) => {
    setSelectedPayment(pm);
    // In a real app, you could persist this choice here
    // Example: AsyncStorage.setItem('preferredPaymentMethod', JSON.stringify(pm));
  };

  // Create a default cash balance as initial preferred method (example persistence)
  // In a real app, you would load this from AsyncStorage
  const getInitialPaymentMethod = (): PaymentMethod | null => {
    // For demo purposes, let's not set a default - let user choose
    return null;
  };

  const handleConfirmBuy = () => {
    if (!previewDisabled && !isAnimating) {
      setIsAnimating(true);

      Animated.timing(slideAnimation, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        navigation.replace("SuccessGC", {
          amount: `$${amountStr}.00`,
          giftCard: {
            title: "Airbnb",
            subtitle: "5% sats back",
            logoUri: undefined,
          },
        });
        slideAnimation.setValue(screenHeight);
        setIsAnimating(false);
      }, 400);
    }
  };

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Buy gift card"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />
        }
      />

      <View style={styles.body}>
        <View style={styles.amountSection}>
          <CurrencyInput
            amount={`$${amountStr}.00`}
            topSlot={
              <TopContext
                variant="cash"
                label="Airbnb"
                leadingIcon={
                  <Image
                    source={logoAirbnb}
                    style={{ width: 16, height: 16, borderRadius: 3 }}
                    resizeMode="cover"
                  />
                }
              />
            }
            bottomSlot={
              // PMTile for payment method selection - adapts based on selection
              <PMTile
                enablePaymentSelection
                hideSheetHeader
                onPaymentSelect={handlePaymentSelect}
                initialSelectedPayment={selectedPayment}
                leadingIcon={true}
                leadingSlot={<CreditCardIcon width={20} height={20} />}
                trailingSlot={<ChevronDownIcon width={20} height={20} />}
                textType="body-sm-bold-v2"
              />
            }
          />
        </View>

        <ConfirmationBuyGiftCard
          location="Online and in-store"
          total={`$${amountStr}.00`}
          feePercentLabel="5%"
          feeValue="$5.00"
        />
      </View>

      <ActionBar style={{ marginBottom: SpacingM8 }}>
        <Button
          label="Confirm buy"
          variant="primary"
          size="lg"
          onPress={handleConfirmBuy}
          disabled={previewDisabled || isAnimating}
        />
      </ActionBar>

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
    paddingHorizontal: SpacingM5,
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
    backgroundColor: ObjectPrimaryBoldDefault,
    zIndex: 1000,
  },
});
