import React, { useState, useCallback, useMemo, useRef } from "react";
import { View, StyleSheet, ViewStyle, TextStyle } from "react-native";
import FoldPressable from "../Primitives/FoldPressable";
import { FoldText } from "../Primitives/FoldText";
import type { BottomSheetModal } from "@gorhom/bottom-sheet";
import { StandardBottomSheet } from "../BottomSheet";
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
  ObjectAccentSubtleDefault,
  FaceAccent,
  ObjectSecondaryDefault,
  ObjectSecondaryPressed,
  SpacingM3,
  FaceInverse,
} from "../../generated-tokens/tokens";
import {
  EmptyPaymentContentExample,
  PaymentMethodSelectionExample,
  CardsPaymentContentExample,
  BankPaymentContentExample,
  getCardDetails,
  getBankDetails,
  getPaymentMethodDetails,
} from "./PMTileBottomSheet.examples";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";

export type PaymentMethod = {
  key: "bank" | "card" | "cash" | "lightning";
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
  style?: ViewStyle; // now applied to internal container for pill styling
  textStyle?: TextStyle;
  textType?: string; // new: override FoldText type (e.g. body-md-v2)
  enablePaymentSelection?: boolean;
  onPaymentSelect?: (pm: PaymentMethod) => void;
  // new: control bottom sheet behavior
  initialSheetMode?: "select" | "bank" | "payment-method";
  autoOpen?: boolean; // auto present on mount
  hideSheetHeader?: boolean; // omit header in sheet
  // new: remember selected payment method
  initialSelectedPayment?: PaymentMethod;
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
  textType = "body-sm-bold-v2",
  enablePaymentSelection = false,
  onPaymentSelect,
  initialSheetMode = "select",
  autoOpen = false,
  hideSheetHeader = false,
  initialSelectedPayment,
  ...rest
}: PMTileProps) {
  const insets = useSafeAreaInsets();
  
  // Content height measurement for dynamic sizing
  const [contentHeight, setContentHeight] = useState(400); // Default fallback height
  
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(
    initialSelectedPayment || {
      key: "card",
      icon: <CreditCardIcon width={16} height={16} />,
      title: "Add payment method",
      subtitle: "",
    }
  );
  const [sheetMode, setSheetMode] = useState<
    "select" | "bank" | "payment-method"
  >(initialSheetMode);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Bottom sheet ref: use our StandardBottomSheet methods shape
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  // Snap points based on measured content height
  const snapPoints = useMemo(() => [contentHeight], [contentHeight]);

  // Auto-open logic on mount when enabled
  React.useEffect(() => {
    if (enablePaymentSelection && autoOpen) {
      setSheetMode(initialSheetMode);
      bottomSheetRef.current?.present?.();
    }
  }, [enablePaymentSelection, autoOpen, initialSheetMode]);

  // Handle initial payment method selection (bank or card)
  const handleSelectPm = useCallback((pm) => {
    // Navigate to the specific sheet instead of closing
    if (pm.key === "bank") {
      setSheetMode("bank");
    } else if (pm.key === "card") {
      setSheetMode("payment-method");
    }
  }, []);

  // Helper: close the sheet with animation timing
  const closeSheetImmediate = useCallback(() => {
    setIsSheetOpen(false);
    // Delay actual dismiss to allow visual state change to animate
    setTimeout(() => {
      bottomSheetRef.current?.dismiss();
    }, 100); // Shorter delay for quicker visual feedback
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
      } else if (sheetMode === "payment-method") {
        // Check if it's one of our new payment methods (cash, lightning, card)
        const paymentMethodDetails = getPaymentMethodDetails(paymentId);
        if (paymentMethodDetails) {
          const formattedPayment = {
            key: paymentMethodDetails.key,
            icon: paymentMethodDetails.icon,
            title: paymentMethodDetails.title,
            subtitle: paymentMethodDetails.subtitle,
          } as PaymentMethod;

          setSelectedPayment(formattedPayment);
          onPaymentSelect?.(formattedPayment);
        } else {
          // Fall back to legacy card details
          const cardDetails = getCardDetails(paymentId) as
            | PaymentMethod
            | undefined;
          if (cardDetails) {
            setSelectedPayment(cardDetails);
            onPaymentSelect?.(cardDetails);
          }
        }
      }

      // Don't close the sheet here - let the user press "Use this payment method" button
    },
    [sheetMode, onPaymentSelect]
  );

  // Handle back navigation from bank/card to select
  const handleBackToSelect = useCallback(() => {
    setSheetMode("select");
  }, []);

  // Handle bottom sheet close
  const handleSheetClose = useCallback(() => {
    setIsSheetOpen(false);
    // Reset to select mode when sheet closes
    setSheetMode("select");
  }, []);

  const handlePress = useCallback(() => {
    if (enablePaymentSelection) {
      // Always open payment method selection for this flow
      setSheetMode("payment-method");
      setIsSheetOpen(true);
      bottomSheetRef.current?.present();
    } else {
      onPress?.();
    }
  }, [enablePaymentSelection, onPress]);

  // Render header content
  const renderSheetHeader = useCallback(() => {
    const showBackButton = sheetMode !== "select";
    const getTitle = () => {
      switch (sheetMode) {
        case "payment-method":
          return "Choose payment method"; // This shows PaymentMethodSelectionExample
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
        // Instant visual update on manual close
        closeSheetImmediate();
      }
    };

    return (
      <FoldPageViewHeader
        title={getTitle()}
        leftComponent={
          <StackControl
            variant="left"
            leadingSlot={<ChevronLeftIcon width={16} height={16} />}
            onLeftPress={handleLeftPress}
          />
        }
      />
    );
  }, [sheetMode, handleBackToSelect, insets.top, closeSheetImmediate]);

  // Render main content
  const renderSheetContent = useCallback(() => {
    try {
      if (sheetMode === "select") {
        return <EmptyPaymentContentExample onSelect={handleSelectPm} />;
      }
      if (sheetMode === "payment-method") {
        return (
          <PaymentMethodSelectionExample
            onSelect={(methodKey) => handleSpecificPaymentSelect(methodKey)}
            initialSelection={
              selectedPayment.key !== "card" ||
              selectedPayment.title !== "Add payment method"
                ? selectedPayment.key
                : undefined
            }
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
    const showActionBar = sheetMode === "payment-method"; // Show for payment method selection

    if (!showActionBar) return null;

    return (
      <ActionBar style={{ marginBottom: 0 }}>
        <Button
          label="Use this payment method"
          variant="primary"
          size="lg"
          onPress={closeSheetImmediate}
        />
      </ActionBar>
    );
  }, [sheetMode, closeSheetImmediate]);

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

  // Show slots if enabled or provided
  const showTrailing = trailingIcon || !!trailingSlot;

  // Create a wrapper that measures the total content height
  const renderMeasuredContent = useCallback(() => {
    return (
      <View
        style={{
          paddingTop: 16,
          paddingBottom: insets.bottom,
        }}
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setContentHeight(Math.max(height, 200)); // Minimum height of 200
        }}
      >
        {renderSheetContent()}
        {renderSheetFooter()}
      </View>
    );
  }, [renderSheetContent, renderSheetFooter, insets.bottom]);

  // Visual state
  const isAddPayment =
    enablePaymentSelection && selectedPayment.title === "Add payment method";
  const isChosen =
    enablePaymentSelection &&
    selectedPayment.title !== "Select payment method" &&
    selectedPayment.title !== "Add payment method";

  // Extract last four digits from subtitle like "---- 0823" - only for card payments
  const extractLastFour = (subtitle?: string, paymentKey?: string) => {
    if (!subtitle || paymentKey !== "card") return "";
    const digits = subtitle.replace(/[^0-9]/g, "");
    return digits.slice(-4);
  };
  const chosenLast4 = isChosen
    ? extractLastFour(selectedPayment.subtitle, selectedPayment.key)
    : "";

  const backgroundColor =
    isSheetOpen && isAddPayment
      ? FaceAccent // accent while open in add-payment state
      : isSheetOpen && !isAddPayment
      ? ObjectSecondaryPressed // pressed background for other states while sheet open
      : isAddPayment
      ? ObjectAccentSubtleDefault
      : isChosen
      ? ObjectSecondaryDefault // idle chosen state uses secondary default
      : ObjectPrimarySubtleDefault;

  const contentTextColor =
    isSheetOpen && isAddPayment
      ? FaceInverse
      : isAddPayment
      ? FaceAccent
      : undefined;

  const displayLabel =
    isSheetOpen && isAddPayment
      ? "Select payment method"
      : isChosen && chosenLast4
      ? `${selectedPayment.title} ${chosenLast4}`
      : label !== "Select payment method"
      ? label
      : enablePaymentSelection &&
        selectedPayment.title !== "Select payment method"
      ? selectedPayment?.title
      : label;

  // Helper to normalize icon size to 16px
  const normalizeIcon = (node: React.ReactNode) => {
    if (!node || !React.isValidElement(node)) return node;
    const el: any = node;
    const needsResize = el.props?.width !== 16 || el.props?.height !== 16;
    if (!needsResize) return node;
    try {
      return React.cloneElement(el, { width: 16, height: 16 });
    } catch {
      return (
        <View
          style={{
            width: 16,
            height: 16,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {el}
        </View>
      );
    }
  };

  return (
    <>
      <FoldPressable onPress={handlePress} {...rest}>
        <View style={[styles.tileContainer, { backgroundColor }, style]}>
          {showLeading && !isAddPayment && normalizeIcon(displayLeadingSlot)}
          <FoldText
            type={textType as any}
            style={[{ color: contentTextColor }, textStyle]}
          >
            {displayLabel}
          </FoldText>
          {showTrailing &&
            (isAddPayment ? (
              <PlusCircleIcon
                width={16}
                height={16}
                fill={isSheetOpen ? FaceInverse : FaceAccent}
              />
            ) : (
              normalizeIcon(trailingSlot)
            ))}
        </View>
      </FoldPressable>

      <StandardBottomSheet
        ref={bottomSheetRef as any}
        snapPoints={snapPoints} // Use measured content height as single snap point
        enableDynamicSizing={false} // Disable dynamic sizing to use fixed snap points
        enablePanDownToClose={true} // Enable swipe down to close
        enableHandlePanningGesture={false} // Disable handle dragging
        enableContentPanningGesture={true} // Enable content panning for swipe down to close
        closeOnBackdropPress={true}
        backdropOpacity={0.5}
        onDismiss={handleSheetClose}
        headerSlot={null} // Remove header for payment selection
        contentSlot={enablePaymentSelection ? renderMeasuredContent() : null} // Use measured content wrapper
        useRoundedPanel={true}
      />
    </>
  );
}

const styles = StyleSheet.create({
  tileContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: SpacingM8,
    paddingHorizontal: SpacingM3,
    borderRadius: BorderRadiusDefault,
    gap: 6,
  },
});
