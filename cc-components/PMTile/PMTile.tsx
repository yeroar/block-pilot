import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { CreditCardIcon } from "../assets/BlueSkyIcons/CreditCardIcon";
import {
  ObjectPrimaryBoldDefault,
  ObjectPrimarySubtleDefault,
  SpacingM1,
  BorderRadiusRounded,
  SpacingM4,
  SpacingM8,
  LayerBackground,
} from "../../generated-tokens/tokens";
import { EmptyPaymentContentExample } from "./PMTileBottomSheet.examples";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";

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
  onPaymentSelect?: (pm: any) => void;
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
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [sheetMode, setSheetMode] = useState<"select" | "bank" | "card">(
    "select"
  );

  // Bottom sheet ref
  const bottomSheetRef = useRef<BottomSheet>(null);

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
        const bankDetails = {
          chase: {
            key: "bank",
            icon: <BankIcon width={20} height={20} />,
            title: "Chase Checking",
            subtitle: "****0823",
          },
          wells: {
            key: "bank",
            icon: <BankIcon width={20} height={20} />,
            title: "Wells Fargo Savings",
            subtitle: "****1234",
          },
          boa: {
            key: "bank",
            icon: <BankIcon width={20} height={20} />,
            title: "Bank of America Checking",
            subtitle: "****5678",
          },
        }[paymentId];

        if (bankDetails) {
          setSelectedPayment(bankDetails);
          onPaymentSelect?.(bankDetails);
        }
      } else if (sheetMode === "card") {
        const cardDetails = {
          visa: {
            key: "card",
            icon: <CreditCardIcon width={20} height={20} />,
            title: "Visa Debit Card",
            subtitle: "****1234",
          },
          mastercard: {
            key: "card",
            icon: <CreditCardIcon width={20} height={20} />,
            title: "Mastercard Credit",
            subtitle: "****5678",
          },
          amex: {
            key: "card",
            icon: <CreditCardIcon width={20} height={20} />,
            title: "American Express",
            subtitle: "****9012",
          },
        }[paymentId];

        if (cardDetails) {
          setSelectedPayment(cardDetails);
          onPaymentSelect?.(cardDetails);
        }
      }

      bottomSheetRef.current?.close();
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
      if (!selectedPayment) {
        setSheetMode("select");
      } else if (selectedPayment.key === "bank") {
        setSheetMode("bank");
      } else if (selectedPayment.key === "card") {
        setSheetMode("card");
      }
      bottomSheetRef.current?.expand();
    } else {
      onPress?.();
    }
  }, [enablePaymentSelection, selectedPayment, onPress]);

  // Render backdrop
  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  // Render sheet content based on mode
  const renderSheetContent = useCallback(() => {
    const showActionBar = false; // no card radio mock for now
    const showBackButton = sheetMode !== "select";

    const getTitle = () => {
      switch (sheetMode) {
        case "card":
          return "Select Payment Method";
        case "bank":
          return "Select Payment Method";
        default:
          return "Select Payment Method";
      }
    };

    const handleLeftPress = () => {
      if (showBackButton) {
        handleBackToSelect();
      } else {
        bottomSheetRef.current?.close();
      }
    };

    // Always render the simple selector
    const renderContent = () => (
      <EmptyPaymentContentExample onSelect={handleSelectPm} />
    );

    return (
      <BottomSheetView style={styles.sheetContent}>
        <FoldPageViewHeader
          title={getTitle()}
          leftComponent={
            <StackControl
              variant="left"
              leadingSlot={<ChevronLeftIcon width={24} height={24} />}
              onLeftPress={handleLeftPress}
            />
          }
        />
        <View style={styles.sheetBody}>
          {renderContent()}
          {showActionBar && (
            <ActionBar>
              <Button
                label="Use this payment method"
                variant="primary"
                size="lg"
                onPress={() => bottomSheetRef.current?.close()}
              />
            </ActionBar>
          )}
        </View>
      </BottomSheetView>
    );
  }, [sheetMode, handleSelectPm, handleBackToSelect]);

  // Display logic for payment selection mode
  const displayLabel =
    enablePaymentSelection && selectedPayment ? selectedPayment.title : label;

  const displayLeadingSlot =
    enablePaymentSelection && selectedPayment
      ? selectedPayment.icon
      : leadingSlot;

  const isSelected = enablePaymentSelection ? !!selectedPayment : selected;

  // Show slots if enabled or provided
  const showLeading = leadingIcon || !!displayLeadingSlot;
  const showTrailing = trailingIcon || !!trailingSlot;

  const backgroundColor = isSelected
    ? ObjectPrimaryBoldDefault
    : ObjectPrimarySubtleDefault;

  return (
    <>
      <FoldPressable onPress={handlePress} style={style} {...rest}>
        <View style={[styles.container, { backgroundColor }]}>
          {showLeading && displayLeadingSlot}
          <FoldText type="body-sm-bold-v2" style={textStyle}>
            {displayLabel}
          </FoldText>
          {showTrailing && trailingSlot}
        </View>
      </FoldPressable>

      {/* Payment selection bottom sheet */}
      {enablePaymentSelection && (
        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          enablePanDownToClose
          backdropComponent={renderBackdrop}
          onClose={handleSheetClose}
          backgroundStyle={styles.sheetBackground}
          handleIndicatorStyle={styles.handleIndicator}
        >
          {renderSheetContent()}
        </BottomSheet>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: SpacingM8,
    paddingHorizontal: SpacingM4,
    borderRadius: BorderRadiusRounded,
    gap: SpacingM1,
  },
  sheetBackground: {
    backgroundColor: LayerBackground,
  },
  handleIndicator: {
    backgroundColor: ObjectPrimaryBoldDefault,
  },
  sheetContent: {
    flex: 1,
    paddingHorizontal: SpacingM4,
  },
  sheetBody: {
    flex: 1,
    paddingBottom: SpacingM4,
  },
});
