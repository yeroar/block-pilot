import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import FWButton from "./cc-components/Button/FWButton";
import ActionTile from "./cc-components/ActionTile/ActionTile";
import FoldPageViewHeader from "./cc-components/FoldPageViewHeader/FoldPageViewHeader";
import CurrencyInput from "./cc-components/CurrencyInput/CurrencyInput";
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
        {/* FWButton examples */}
        <FWButton
          label="Primary Button"
          variant="primary"
          onPress={() => console.log("Primary Button Pressed")}
        />
        <FWButton
          label="Secondary Button"
          variant="secondary"
          onPress={() => console.log("Secondary Button Pressed")}
        />
        {/* ActionTile example */}
        <ActionTile
          label="Cash balance"
          selected={false}
          trailingSlot={<PlusCircleIcon width={12} height={12} />}
        ></ActionTile>

        {/* CurrencyInput example */}
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <CurrencyInput
            topContextVariant="Weekly"
            amount="$0"
            bottomContextVariant="addPayment"
          />
        </View>
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
