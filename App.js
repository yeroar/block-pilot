import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { enableScreens } from "react-native-screens";
import { LayerBackground, SpacingM2 } from "./generated-tokens/tokens";
import AppNavigator from "./screens/AppNavigator";
import TestSearchScreen from "./screens/TestSearchScreen";

enableScreens(true);

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          {/*
            Temporarily rendering TestSearchScreen for quick search-bar testing.
            The original navigator is commented out so we can iterate fast.
          */}
          <TestSearchScreen />
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
