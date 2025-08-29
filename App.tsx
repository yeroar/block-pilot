import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { enableScreens } from "react-native-screens";
import TestSearchScreen from "./screens/TestSearchScreen";
import PreviewBuyGift from "./screens/PreviewBuyGift";
import SuccessGC from "./screens/SuccessGC";

enableScreens(true);

export type RootStackParamList = {
  TestSearch: undefined;
  PreviewBuyGift: undefined;
  SuccessGC:
    | {
        amount?: string;
        giftCard?: { title: string; subtitle: string; logoUri?: string };
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="TestSearch"
              screenOptions={{ headerShown: false }}
            >
              <Stack.Screen name="TestSearch" component={TestSearchScreen} />
              <Stack.Screen name="PreviewBuyGift" component={PreviewBuyGift} />
              <Stack.Screen name="SuccessGC" component={SuccessGC} />
            </Stack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
