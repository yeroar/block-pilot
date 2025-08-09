import React from "react";
import { View, StyleSheet } from "react-native";
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";
import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import { XCloseIcon } from "../cc-components/assets/BlueSkyIcons/XCloseIcon";
import { BellIcon } from "../cc-components/assets/BlueSkyIcons/BellIcon";
import { ShieldIcon } from "../cc-components/assets/BlueSkyIcons/ShieldIcon";
import { LayerBackground, SpacingM4, SpacingM12, SpacingM6 } from "../generated-tokens/tokens";


const TransferScreen: React.FC = () => {
  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Title"
        leftComponent={<StackControl variant="left" leadingSlot={<XCloseIcon />} />}
        rightComponent={<StackControl variant="right" leadingSlot={<ShieldIcon />} />}
      />

      <View style={styles.body}>
        <View style={styles.amountBlock}>
          <CurrencyInput
            amount="$100"
            topSlot={<TopContext leadingIcon={<BellIcon />} label="Weekly" />}
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
    backgroundColor: LayerBackground, // Matches Figma's Layer/background (#fbf5e4)
    paddingHorizontal: SpacingM4, // Lateral margins = 16px
  },
  body: {
    flex: 1,
    justifyContent: "space-between",
    paddingTop: SpacingM12, // Space below header = 48px
    paddingBottom: SpacingM6, // Space above keyboard = 24px
  },
  amountBlock: {
    alignItems: "center",
    gap: SpacingM6, // Gap between elements = 24px
  },
});

export default TransferScreen;