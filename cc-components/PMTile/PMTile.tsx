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
} from "./PMTileBottomSheet.examples";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";

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
  style?: ViewStyle; // now applied to internal container for pill styling
  textStyle?: TextStyle;
  textType?: string; // new: override FoldText type (e.g. body-md-v2)
  enablePaymentSelection?: boolean;
  onPaymentSelect?: (pm: PaymentMethod) => void;
  // new: control bottom sheet behavior
  initialSheetMode?: "select" | "bank" | "card";
  autoOpen?: boolean; // auto present on mount
  hideSheetHeader?: boolean; // omit header in sheet
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
  ...rest
}: PMTileProps) {
  const insets = useSafeAreaInsets();
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>({
    key: "card",
    icon: <CreditCardIcon width={16} height={16} />,
    title: "Add payment method",
    subtitle: "",
  });
  const [sheetMode, setSheetMode] = useState<"select" | "bank" | "card">(
    initialSheetMode
  );
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Bottom sheet ref: use our StandardBottomSheet methods shape
  const bottomSheetRef = useRef<BottomSheetModal | null>(null);

  // Snap points for the bottom sheet
  const snapPoints = useMemo(() => ["50%", "90%"], []);

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
      setSheetMode("card");
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
      } else if (sheetMode === "card") {
        const cardDetails = getCardDetails(paymentId) as
          | PaymentMethod
          | undefined;
        if (cardDetails) {
          setSelectedPayment(cardDetails);
          onPaymentSelect?.(cardDetails);
        }
      }

      // Instant visual update on close
      closeSheetImmediate();
    },
    [sheetMode, onPaymentSelect, closeSheetImmediate]
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
      setIsSheetOpen(true);
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
      if (sheetMode === "card") {
        return (
          <PaymentMethodSelectionExample
            onSelect={(methodKey) => handleSpecificPaymentSelect(methodKey)}
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
          onPress={closeSheetImmediate}
        />
      </ActionBar>
    );
  }, [closeSheetImmediate]);

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

  // Visual state
  const isAddPayment =
    enablePaymentSelection && selectedPayment.title === "Add payment method";
  const isChosen =
    enablePaymentSelection &&
    selectedPayment.title !== "Select payment method" &&
    selectedPayment.title !== "Add payment method";

  // Extract last four digits from subtitle like "---- 0823"
  const extractLastFour = (subtitle?: string) => {
    if (!subtitle) return "";
    const digits = subtitle.replace(/[^0-9]/g, "");
    return digits.slice(-4);
  };
  const chosenLast4 = isChosen ? extractLastFour(selectedPayment.subtitle) : "";

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
        snapPoints={snapPoints}
        enableDynamicSizing
        enablePanDownToClose
        closeOnBackdropPress={true}
        backdropOpacity={0.5}
        onDismiss={handleSheetClose}
        headerSlot={
          hideSheetHeader
            ? null
            : enablePaymentSelection
            ? renderSheetHeader()
            : null
        }
        contentSlot={enablePaymentSelection ? renderSheetContent() : null}
        footerSlot={enablePaymentSelection ? renderSheetFooter() : null}
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
