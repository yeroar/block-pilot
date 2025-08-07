import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import FWButton from "./cc-components/Button/FWButton";
import ActionTile from "./cc-components/ActionTile/ActionTile";
import FoldPageViewHeader from "./cc-components/FoldPageViewHeader/FoldPageViewHeader";
import CurrencyInput from "./cc-components/CurrencyInput/CurrencyInput";
import CustomKeyboard from "./cc-components/Keyboard/CustomKeyboard";
import { PlusCircleIcon } from "./assets/BlueSkyIcons/PlusCircleIcon";

export default function App() {
  return (
    <SafeAreaProvider>
      {/* Wrap the app with SafeAreaProvider */}
      <View style={styles.container}>
        {/* FoldPageViewHeader */}
        <FoldPageViewHeader
          title="My Page Title"
          subTitle="My Subtitle"
          leftIcon="back"
          rightIcon="menu"
          onLeftPress={() => console.log("Left icon pressed")}
          onRightPress={() => console.log("Right icon pressed")}
          backgroundColor="#f5f5f5"
          titleColor="#333"
        />

        {/* CurrencyInput with maxbutton and sats */}
        <CurrencyInput
          topContextVariant="~ 10,000 sats"
          amount="$0"
          bottomContextVariant="maxButton"
        />

        {/* CustomKeyboard */}
        <CustomKeyboard
          onKeyPress={(key) => console.log("Key pressed:", key)}
        />

        {/* Primary FWButton for preview buy */}
        <FWButton
          label="Preview Buy"
          variant="primary"
          onPress={() => console.log("Preview Buy Pressed")}
          style={{ marginTop: 24 }}
        />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
