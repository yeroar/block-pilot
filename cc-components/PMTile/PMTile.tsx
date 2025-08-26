import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import StandardBottomSheet from "../BottomSheet/StandardBottomSheet";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimarySubtleDefault,
  SpacingM4,
  SpacingM8,
  LayerBackground,
  SpacingM5,
  BorderRadiusDefault,
  SpacingM2,
} from "../../generated-tokens/tokens";
import {
  EmptyPaymentContentExample,
  CardsPaymentContentExample,
  BankPaymentContentExample,
  getCardDetails,
  getBankDetails,
} from "./PMTileBottomSheet.examples";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";

export type PaymentMethod = {
  key: "bank" | "card";
  icon: React.ReactNode;
  title: string;
  subtitle: string;
};

export type PMTileProps = {
  label?: string;
  selected?: boolean;
  leadingIcon?: boolean;
  trailingIcon?: boolean;
  leadingSlot?: React.ReactNode;
  trailingSlot?: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: ViewStyle;
  enablePaymentSelection?: boolean;
  onPaymentSelect?: (pm: PaymentMethod) => void;
};

export default function PMTile({
  label = "Select payment method",
  selected = false,
  leadingIcon = false,
  trailingIcon = false,
  leadingSlot,
  trailingSlot,
  onPress,
  style,
  textStyle,
  enablePaymentSelection = false,
  onPaymentSelect,
  ...rest
}: PMTileProps) {
  const insets = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>({
    key: "card",
    icon: <CreditCardIcon width={20} height={20} />,
    title: "Add payment method",
    subtitle: "",
  });
  const [sheetMode, setSheetMode] = useState<"select" | "bank" | "card">(
    "select"
  );

  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheetModal>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // Handle initial payment method selection (bank or card)
  const handleSelectPm = useCallback((pm) => {
    // Navigate to the specific sheet instead of closing
    if (pm.key === "bank") {
      setSheetMode("bank");
    } else if (pm.key === "card") {
      setSheetMode("card");
    }
  }, []);

  // Handle specific payment selection from bank/card sheets
  const handleSpecificPaymentSelect = useCallback(
    (paymentId: string) => {
      if (sheetMode === "bank") {
        const bankDetails = getBankDetails(paymentId) as
          | PaymentMethod
          | undefined;
        if (bankDetails) {
          setSelectedPayment(bankDetails);
          onPaymentSelect?.(bankDetails);
        }
      } else if (sheetMode === "card") {
        const cardDetails = getCardDetails(paymentId) as
          | PaymentMethod
          | undefined;
        if (cardDetails) {
          setSelectedPayment(cardDetails);
          onPaymentSelect?.(cardDetails);
        }
      }

      bottomSheetRef.current?.dismiss();
    },
    [sheetMode, onPaymentSelect]
  );

  // Handle back navigation from bank/card to select
  const handleBackToSelect = useCallback(() => {
    setSheetMode("select");
  }, []);

  // Handle bottom sheet close
  const handleSheetClose = useCallback(() => {
    // Reset to select mode when sheet closes
    setSheetMode("select");
  }, []);

  const handlePress = useCallback(() => {
    if (enablePaymentSelection) {
      // Determine which sheet to open based on current selection
      if (
        !selectedPayment.title ||
        selectedPayment.title === "Select payment method"
      ) {
        setSheetMode("select");
      } else if (selectedPayment.key === "bank") {
        setSheetMode("bank");
      } else if (selectedPayment.key === "card") {
        setSheetMode("card");
      }
      bottomSheetRef.current?.present();
    } else {
      onPress?.();
    }
  }, [enablePaymentSelection, selectedPayment, onPress]);

  // Render header content
  const renderSheetHeader = useCallback(() => {
    const showBackButton = sheetMode !== "select";
    const getTitle = () => {
      switch (sheetMode) {
        case "card":
          return "Select Payment Card";
        case "bank":
          return "Select Bank Account";
        default:
          return "Add payment method";
      }
    };

    const handleLeftPress = () => {
      if (showBackButton) {
        handleBackToSelect();
      } else {
        bottomSheetRef.current?.dismiss();
      }
    };

    return (
      <FoldPageViewHeader
        style={{ marginTop: -insets.top }}
        title={getTitle()}
        leftComponent={
          <StackControl
            variant="left"
            leadingSlot={<ChevronLeftIcon width={24} height={24} />}
            onLeftPress={handleLeftPress}
          />
        }
      />
    );
  }, [sheetMode, handleBackToSelect, insets.top]);

  // Render main content
  const renderSheetContent = useCallback(() => {
    try {
      if (sheetMode === "select") {
        return <EmptyPaymentContentExample onSelect={handleSelectPm} />;
      }
      if (sheetMode === "card") {
        return (
          <CardsPaymentContentExample
            onSelect={(cardId) => handleSpecificPaymentSelect(cardId)}
          />
        );
      }
      if (sheetMode === "bank") {
        return (
          <BankPaymentContentExample
            onSelect={(accountId) => handleSpecificPaymentSelect(accountId)}
          />
        );
      }
      return null;
    } catch (error) {
      // Absolutely guarantee non-null children
      return (
        <View
          style={{
            minHeight: 100,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FoldText type="body-sm-bold-v2">Add payment method</FoldText>
        </View>
      );
    }
  }, [
    sheetMode,
    handleSelectPm,
    handleSpecificPaymentSelect,
    handleBackToSelect,
    insets.top,
  ]);

  // Render footer (optional action bar)
  const renderSheetFooter = useCallback(() => {
    const showActionBar = false; // Currently disabled

    if (!showActionBar) return null;

    return (
      <ActionBar>
        <Button
          label="Use this payment method"
          variant="primary"
          size="lg"
          onPress={() => bottomSheetRef.current?.dismiss()}
        />
      </ActionBar>
    );
  }, []);

  // Display logic for payment selection mode - prioritize props over internal state
  const displayLeadingSlot =
    // explicit null wins (hide), undefined means fallback, otherwise use provided node
    leadingSlot === null
      ? undefined
      : leadingSlot ??
        (enablePaymentSelection ? undefined : selectedPayment.icon);

  // Show leading only when explicitly requested or when a computed node exists
  const showLeading =
    leadingIcon === true || (!!displayLeadingSlot && leadingIcon !== false);

  const displayLabel =
    label !== "Select payment method"
      ? label
      : enablePaymentSelection &&
        selectedPayment.title !== "Select payment method"
      ? selectedPayment?.title
      : label;

  // Show slots if enabled or provided
  const showTrailing = trailingIcon || !!trailingSlot;

  const backgroundColor = selected
    ? ObjectPrimarySubtleDefault // selected payment method gets subtle color
    : enablePaymentSelection &&
      selectedPayment.title !== "Select payment method"
    ? ObjectPrimaryBoldDefault // "Add payment method" when clicked gets bold color
    : ObjectPrimarySubtleDefault; // default state gets subtle color

  return (
    <>
      <FoldPressable onPress={handlePress} {...rest}>
        <View style={[styles.tileContainer, { backgroundColor }]}>
          {showLeading && displayLeadingSlot}
          <FoldText type="body-sm-bold-v2" style={textStyle}>
            {displayLabel}
          </FoldText>
          {showTrailing && trailingSlot}
        </View>
      </FoldPressable>

      <StandardBottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        closeOnBackdropPress={false}
        backdropOpacity={0.5}
        onDismiss={handleSheetClose}
        headerSlot={enablePaymentSelection ? renderSheetHeader() : null}
        contentSlot={enablePaymentSelection ? renderSheetContent() : null}
        footerSlot={enablePaymentSelection ? renderSheetFooter() : null}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", // match list rows
    height: SpacingM8,
    paddingHorizontal: SpacingM4,
    borderRadius: BorderRadiusDefault,
    gap: SpacingM2,
  },
});
