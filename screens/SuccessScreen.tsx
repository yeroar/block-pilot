import React from "react";
import { View, StyleSheet } from "react-native";

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
} from "../generated-tokens/tokens";

type Props = {
  navigation: any;
  route: { params?: { amount?: string } };
};

export default function SuccessScreen({ navigation, route }: Props) {
  const amount = route?.params?.amount ?? "$100";

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Buy initiated"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ArrowNarrowLeftIcon />} />
        }
        rightComponent={<StackControl variant="right" />}
      />

      <View style={styles.body}>
        <View style={styles.amountSection}>
          <CurrencyInput
            amount={amount}
            topSlot={<TopContext variant="btc" fiatAmount={amount} />}
            bottomSlot={
              <Button
                label="View details"
                variant="secondary"
                size="xs"
                onPress={() => navigation.navigate("Receipt", { amount })}
              />
            }
          />
        </View>
      </View>

      <ActionBar>
        <Button
          label="Done"
          variant="secondary"
          size="lg"
          onPress={() => navigation.popToTop()}
        />
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
});
