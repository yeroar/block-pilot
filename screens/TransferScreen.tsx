import React from "react";
import { View, StyleSheet } from "react-native";
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import { XCloseIcon } from "../cc-components/assets/BlueSkyIcons/XCloseIcon";
import { LayerBackground, SpacingM4, SpacingM12, SpacingM6 } from "../generated-tokens/tokens";


const TransferScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Title"
        leftComponent={<StackControl variant="left" leadingSlot={<XCloseIcon />} />}
        rightComponent={<StackControl variant="right" leadingSlot={<XCloseIcon />} />}
      />

      <View style={styles.body}>
        <View style={styles.amountBlock}>
          <CurrencyInput
            amount="$100"
            topSlot={<TopContext leadingIcon={<XCloseIcon />} label="Weekly" />}
            bottomSlot={<BottomContext content="maxButton" />}
          />
        </View>

        <CustomKeyboard onKeyPress={undefined} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LayerBackground,
    paddingHorizontal: SpacingM4, // lateral margins = 16
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: SpacingM12, // space below header
    paddingBottom: SpacingM6,
  },
  amountBlock: {
    alignItems: "center",
    gap: SpacingM6,
  },
});

export default TransferScreen;