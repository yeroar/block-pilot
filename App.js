import "react-native-gesture-handler"; // keep first
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
import { LayerBackground, SpacingM2 } from "./generated-tokens/tokens";
import AppNavigator from "./screens/AppNavigator";

enableScreens(true);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider
        style={{
          paddingHorizontal: SpacingM2,
          backgroundColor: LayerBackground,
        }}
      >
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
