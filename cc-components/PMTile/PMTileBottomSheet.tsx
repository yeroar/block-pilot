import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import {
  LayerBackground,
  SpacingM4,
  SpacingM2,
  SpacingM6,
  SpacingM10,
  SpacingM1,
  BorderRadiusDefault,
  ObjectPrimaryBoldDefault,
  SpacingM5,
} from "../../generated-tokens/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  AddPaymentContentExample,
  DefaultPaymentContentExample,
  RadioPaymentContentExample,
} from "./PMTileBottomSheet.examples";

interface PMTileBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectPayment?: (paymentId: string) => void;
  onAddPayment?: () => void;
  title?: string;
  variant?: "default" | "add-payment" | "radio-selection";
  renderContent?: () => React.ReactElement;
}

const PMTileBottomSheet: React.FC<PMTileBottomSheetProps> = ({
  visible,
  onClose,
  onSelectPayment,
  onAddPayment,
  title = "Add payment method",
  variant = "default",
  renderContent,
}) => {
  // Only keep state that's actually used for radio selection
  const [selectedPayment, setSelectedPayment] = useState<string | null>(
    "credit"
  );

  const insets = useSafeAreaInsets();

  // Handle radio selection (single choice)
  const handleRadioSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
    onSelectPayment?.(paymentId);
  };

  const handleAddPayment = () => {
    onAddPayment?.();
    onClose();
  };

  // Default content based on variant
  const renderDefaultContent = () => {
    switch (variant) {
      case "add-payment":
        return <AddPaymentContentExample />;

      case "radio-selection":
        return (
          <RadioPaymentContentExample
            selectedPayment={selectedPayment}
            onRadioSelect={handleRadioSelect}
          />
        );

      case "default":
      default:
        return <DefaultPaymentContentExample />;
    }
  };

  // Show action bar only for radio selection variant
  const showActionBar = variant === "radio-selection";
  const getActionButtonText = () => {
    if (variant === "radio-selection") {
      return "Use this account";
    }
    return "Continue";
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.bottomSheet}>
              <View style={styles.grabber} />

              <View
                style={{
                  marginTop: -insets.top + SpacingM5,
                  marginBottom: SpacingM5,
                }}
              >
                <FoldPageViewHeader
                  title={title}
                  leftComponent={
                    <StackControl
                      variant="left"
                      leadingSlot={<ChevronLeftIcon width={24} height={24} />}
                      onLeftPress={onClose}
                    />
                  }
                />
              </View>

              <View style={styles.body}>
                {renderContent ? renderContent() : renderDefaultContent()}

                {showActionBar && (
                  <ActionBar>
                    <Button
                      label={getActionButtonText()}
                      variant="primary"
                      size="lg"
                      onPress={onClose}
                      disabled={!selectedPayment}
                    />
                  </ActionBar>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  bottomSheet: {
    backgroundColor: LayerBackground,
    borderTopLeftRadius: BorderRadiusDefault,
    borderTopRightRadius: BorderRadiusDefault,
    paddingHorizontal: SpacingM4,
    position: "relative",
  },
  grabber: {
    position: "absolute",
    top: -SpacingM1 * 3,
    left: "50%",
    marginLeft: -24,
    width: SpacingM10 * 2,
    height: 5,
    backgroundColor: ObjectPrimaryBoldDefault,
    borderRadius: SpacingM2 + SpacingM1,
  },
  body: {
    paddingBottom: SpacingM10,
    gap: SpacingM6,
  },
  content: {
    gap: SpacingM2,
  },
});

export default PMTileBottomSheet;
