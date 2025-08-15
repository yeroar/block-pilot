import React from "react";
import { View, StyleSheet } from "react-native";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";

import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";

import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ArrowNarrowLeftIcon } from "../cc-components/assets/BlueSkyIcons/ArrowNarrowLeftIcon";
import { ScanIcon } from "../cc-components/assets/BlueSkyIcons/ScanIcon";
import { InfoCircleIcon } from "../cc-components/assets/BlueSkyIcons/InfoCircleIcon";
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";

import {
  LayerBackground,
  SpacingM4,
  SpacingM6,
  SpacingM12,
} from "../generated-tokens/tokens";

const TransferScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Title"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ArrowNarrowLeftIcon />} />
        }
        rightComponent={
          <StackControl
            variant="right"
            leadingSlot={<ScanIcon />}
            trailingSlot={<InfoCircleIcon />}
          />
        }
      />

      <View style={styles.body}>
        <View style={styles.amountSection}>
          <CurrencyInput
            amount="$100"
            topSlot={
              <TopContext
                leadingIcon={<CalendarIcon width={16} height={16} />}
                label="Weekly"
              />
            }
            bottomSlot={<BottomContext content="maxButton" />}
          />
        </View>

        <CustomKeyboard onKeyPress={(k: string) => {}} />

        <ActionBar>
          <Button
            label="Preview buy"
            variant="primary"
            size="lg"
            onPress={() => {}}
          />
        </ActionBar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LayerBackground,
    paddingHorizontal: SpacingM4, // 16
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: SpacingM12, // 48 under header
    paddingBottom: SpacingM12, // 48 above ActionBar baseline
  },
  amountSection: {
    alignItems: "center",
    gap: SpacingM6, // 24 between top/bottom contexts internally
  },
});

export default TransferScreen;
