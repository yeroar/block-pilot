import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import Button from "./cc-components/Button/Button";
import FoldPageViewHeader from "./cc-components/FoldPageViewHeader/FoldPageViewHeader";
import CurrencyInput from "./cc-components/CurrencyInput/CurrencyInput";
import CustomKeyboard from "./cc-components/Keyboard/CustomKeyboard";
import { LoadingIcon } from "./cc-components/assets/BlueSkyIcons/LoadingIcon";
import { XCloseIcon } from "./cc-components/assets/BlueSkyIcons/XCloseIcon";
import ActionTile from "./cc-components/ActionTile/ActionTile";
import { FaceNegative, SpacingM2 } from "./generated-tokens/tokens";

export default function App() {
  return (
    <SafeAreaProvider style={{ paddingHorizontal: SpacingM2 }}>
      {" "}
      {/* Ensure SafeAreaProvider wraps the app */}
      {/* Wrap the app with SafeAreaProvider */}
      <View style={styles.container}>
        {/* ActionTile with leading and trailing slots */}

        {/* FoldPageViewHeader */}
        <FoldPageViewHeader
          title="Block pilot test"
          leftIcon={<XCloseIcon />}
          rightIcon="menu"
          onLeftPress={() => console.log("Left icon pressed")}
          onRightPress={() => console.log("Right icon pressed")}
          backgroundColor="#f5f5f5"
          titleColor="#333"
        />
        <ActionTile
          label="Code connect component"
          leadingSlot={
            <LoadingIcon
              width={SpacingM2}
              height={SpacingM2}
              fill={FaceNegative}
            />
          }
          trailingSlot={<XCloseIcon />}
          onPress={() => console.log("Action tile pressed")}
        />
        <Button
          label="Button label"
          size="lg"
          variant="primary"
          onPress={() => {}}
        ></Button>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 100,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
