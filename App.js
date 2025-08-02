import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import FWButton from "./cc-components/Button/FWButton";
import ActionTile from "./cc-components/ActionTile/ActionTile";
import FoldPageViewHeader from "./cc-components/FoldPageViewHeader/FoldPageViewHeader";

export default function App() {
  return (
    <SafeAreaProvider>
      {" "}
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
          primary={true}
          onPress={() => console.log("Primary Button Pressed")}
        />
        <FWButton
          label="Secondary Button"
          primary={false}
          onPress={() => console.log("Secondary Button Pressed")}
        />

        {/* ActionTile example */}
        <ActionTile
          selected={false}
          trailingSlot={
            <View style={{ width: 24, height: 24, backgroundColor: "blue" }} />
          }
        >
          Cash balance
        </ActionTile>
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
