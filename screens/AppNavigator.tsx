import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransferScreen from "./TransferScreen";
import PreviewBuy from "./PreviewBuy";
import SuccessScreen from "./SuccessScreen";
import PreviewBuyGift from "./PreviewBuyGift";

export type RootStackParamList = {
  Transfer: undefined;
  PreviewBuy: { amountStr?: string } | undefined;
  Success: { amount?: string } | undefined;
  PreviewBuyGift:
    | {
        title?: string;
        subtitle?: string;
        logoUri?: string;
        amountStr?: string;
      }
    | undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      id={undefined}
      initialRouteName="Transfer"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Transfer" component={TransferScreen} />
      <Stack.Screen name="PreviewBuy" component={PreviewBuy} />
      <Stack.Screen name="PreviewBuyGift" component={PreviewBuyGift} />
      <Stack.Screen
        name="Success"
        component={SuccessScreen}
        options={{
          animation: "fade", // Use fade instead of none
          animationDuration: 0, // Make transition instant
        }}
      />
    </Stack.Navigator>
  );
}
