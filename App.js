import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider
import { LayerBackground, SpacingM2 } from "./generated-tokens/tokens";
import TransferScreen from "./screens/TransferScreen"; // Import TransferScreen

export default function App() {
  return (
    <SafeAreaProvider
      style={{
        paddingHorizontal: SpacingM2,
        backgroundColor: LayerBackground,
      }}
    >
      <TransferScreen /> {/* Render TransferScreen */}
    </SafeAreaProvider>
  );
}
