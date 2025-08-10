import React from "react";
import { View, StyleSheet } from "react-native";
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import FoldPressable from "../cc-components/Primitives/FoldPressable";
import { FoldText } from "../cc-components/Primitives/FoldText";

// Import your icons - from Figma I see:
// - Arrow/back icon for header left
// - Info circle and scan icons for header right
// - Calendar icon for Weekly label
import { ArrowNarrowLeftIcon } from "../cc-components/assets/BlueSkyIcons/ArrowNarrowLeftIcon";
import { InfoCircleIcon } from "../cc-components/assets/BlueSkyIcons/InfoCircleIcon";
import { ScanIcon } from "../cc-components/assets/BlueSkyIcons/ScanIcon"; 
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";

import {
  LayerBackground,
  SpacingM4,   // 16
  SpacingM6,   // 24
  SpacingM12,  // 48
  FacePrimary,
  SpacingM10,
  SpacingM8,
  SpacingM5,
} from "../generated-tokens/tokens";

// Button styling constants from Figma variables
const YELLOW_BG = "#ffdd33";     // color/bg/accent/yellow/bold/default
const YELLOW_BORDER = "#ffd600"; // Border/primary

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
          <FoldPressable style={styles.cta} onPress={() => {}}>
            <FoldText type="body-lg-bold-v2" style={styles.ctaText}>
              Preview deposit
            </FoldText>
          </FoldPressable>
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
  cta: {
    width: "100%",
    height: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: YELLOW_BG,
    borderWidth: 1,
    borderColor: YELLOW_BORDER,
  },
  ctaText: {
    color: FacePrimary,
  },
});

export default TransferScreen;