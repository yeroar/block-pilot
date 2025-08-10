import React from "react";
import { View, StyleSheet } from "react-native";
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import { ArrowNarrowLeftIcon } from "../cc-components/assets/BlueSkyIcons/ArrowNarrowLeftIcon";
import { InfoCircleIcon } from "../cc-components/assets/BlueSkyIcons/InfoCircleIcon";
import { ScanIcon } from "../cc-components/assets/BlueSkyIcons/ScanIcon"; 
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";

import {
  SpacingM4,   // 16
  SpacingM6,   // 24
  SpacingM10,
} from "../generated-tokens/tokens";
import Button from "../cc-components/Button/Button";

const TransferScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      {/* Header */}
      <FoldPageViewHeader
        title="Title"
        leftComponent={
          <StackControl 
            variant="left" 
            leadingSlot={<ArrowNarrowLeftIcon />} 
          />
        }
        rightComponent={
          <StackControl
            variant="right"
            leadingSlot={<ScanIcon />}
            trailingSlot={<InfoCircleIcon />}
          />
        }
      />

      {/* Main content: currency input, keypad, button */}
      
        <View style={styles.amountBlock}>
          <CurrencyInput
            amount="$100"
            topSlot={
              <TopContext
                leadingIcon={<CalendarIcon width={16} height={16} />} //EDIT
                label="Weekly"
              />
            }
            bottomSlot={<BottomContext content="maxButton" />}
          />

        <CustomKeyboard />
      </View>

        <View style={styles.footer}>
          <Button
            label="Preview Button"
            variant="primary"
            size="lg"
            onPress={() => {}}
          />
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: SpacingM4,
  },

  amountBlock: {
    flex: 1,
    justifyContent: "space-between",
  },
  footer: {
    width: "100%",
    paddingTop: SpacingM6, // 48px spacing below header
    paddingBottom: SpacingM10, // 24px spacing at bottom
  },
});

export default TransferScreen;