import React from "react";
import { View, StyleSheet, Image } from "react-native";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ArrowNarrowLeftIcon } from "../cc-components/assets/BlueSkyIcons/ArrowNarrowLeftIcon";

import {
  ObjectPrimaryBoldDefault,
  LayerBackground,
  SpacingM4,
  SpacingM12,
  SpacingM2,
  SpacingM3,
  SpacingM8,
} from "../generated-tokens/tokens";

type Props = {
  navigation: any;
  route: {
    params?: {
      amount?: string;
      giftCard?: {
        title: string;
        subtitle: string;
        logoUri?: string;
      };
    };
  };
};

export default function GiftCardSuccessScreen({ navigation, route }: Props) {
  const amount = route?.params?.amount ?? "$100";
  const giftCard = route?.params?.giftCard ?? {
    title: "Airbnb",
    subtitle: "5% sats back",
    logoUri: undefined,
  };
  const logoAirbnb = require("../cc-components/assets/logoABNB.png");

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Gift card purchased"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ArrowNarrowLeftIcon />} />
        }
        rightComponent={<StackControl variant="right" />}
      />

      <View style={styles.body}>
        <View style={styles.amountSection}>
          <CurrencyInput
            amount={amount}
            topSlot={
              <TopContext
                variant="cash"
                fiatAmount={amount}
                label={giftCard.title}
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
              <Button
                label="View gift card"
                variant="secondary"
                size="xs"
                onPress={() =>
                  navigation.navigate("GiftCardDetails", {
                    amount,
                    giftCard,
                  })
                }
              />
            }
          />
        </View>
      </View>

      <ActionBar>
        <View style={styles.actions}>
          <Button
            label="Claim code"
            size="lg"
            // black background + white text
            style={{ backgroundColor: "#000" }}
            textStyle={{ color: "#FFF" }}
            onPress={() =>
              navigation.navigate("GiftCardDetails", {
                amount,
                giftCard,
              })
            }
          />
          <Button
            label="Done"
            variant="secondary"
            size="lg"
            onPress={() => navigation.popToTop()}
          />
        </View>
      </ActionBar>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: ObjectPrimaryBoldDefault, // Yellow background - no animation, instant appear
    paddingHorizontal: SpacingM4,
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
  },
  amountSection: {
    alignItems: "center",
    alignSelf: "stretch",
    paddingVertical: SpacingM12,
  },
  actions: {
    width: "100%",
    gap: SpacingM3,
    marginBottom: SpacingM8,
  },
});
