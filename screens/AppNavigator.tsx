import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { NavigationContainer } from "@react-navigation/native"; // not used here
import TransferScreen from "./TransferScreen";
import PreviewBuy from "./PreviewBuy";

export type RootStackParamList = {
  Transfer: undefined;
  PreviewBuy: { amountStr?: string } | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id={undefined} // satisfies @react-navigation v7 TS types
      initialRouteName="Transfer"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="PreviewBuy" component={PreviewBuy} />
    </Stack.Navigator>
  );
}
