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
import { XCloseIcon } from "../assets/BlueSkyIcons/XCloseIcon";
import {
  LayerBackground,
  SpacingM4,
  SpacingM2,
  SpacingM6,
  SpacingM10,
  SpacingM1,
  BorderRadiusDefault,
  ObjectPrimaryBoldDefault,
} from "../../generated-tokens/tokens";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Selector from "../Selector/Selector";

interface PMTileBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectPayment?: (paymentId: string) => void;
  onAddPayment?: () => void;
  title?: string;
}

const PMTileBottomSheet: React.FC<PMTileBottomSheetProps> = ({
  visible,
  onClose,
  onSelectPayment,
  onAddPayment,
  title = "Payment Methods",
}) => {
  // Radio selection state (single selection)
  const [selectedPayment, setSelectedPayment] = useState<string | null>(
    "credit"
  );

  // Checkbox selection state (multiple selections)
  const [checkboxSelections, setCheckboxSelections] = useState<
    Record<string, boolean>
  >({
    sms: true,
    email: false,
  });

  const insets = useSafeAreaInsets();

  // Handle radio selection (single choice)
  const handleRadioSelect = (paymentId: string) => {
    setSelectedPayment(paymentId);
    onSelectPayment?.(paymentId);
  };

  // Handle checkbox selection (multiple choice)
  const handleCheckboxToggle = (checkboxId: string) => {
    setCheckboxSelections((prev) => ({
      ...prev,
      [checkboxId]: !prev[checkboxId],
    }));
  };

  const handleAddPayment = () => {
    onAddPayment?.();
    onClose();
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
              {/* Grabber */}
              <View style={styles.grabber} />

              {/* Navigation Header using existing FoldPageViewHeader */}
              <View style={{ marginTop: -insets.top }}>
                <FoldPageViewHeader
                  title={title}
                  leftComponent={
                    <StackControl
                      variant="left"
                      leadingSlot={<ChevronLeftIcon width={24} height={24} />}
                      onLeftPress={onClose}
                    />
                  }
                  rightComponent={
                    <StackControl
                      variant="right"
                      leadingSlot={<XCloseIcon width={24} height={24} />}
                      onLeftPress={onClose}
                    />
                  }
                />
              </View>

              {/* Body Content */}
              <View style={styles.body}>
                <View style={styles.content}>
                  {/* Radio Selection - Payment Methods (single choice) */}
                  <Selector
                    variant="radio"
                    title="Credit Card"
                    subtext="**** 1234"
                    selected={selectedPayment === "credit"}
                    onPress={() => handleRadioSelect("credit")}
                  />
                  <Selector
                    variant="radio"
                    title="Bank Transfer"
                    subtext="Wells Fargo ****0823"
                    selected={selectedPayment === "bank"}
                    onPress={() => handleRadioSelect("bank")}
                  />

                  {/* Checkbox Selection - Notifications (multiple choice) */}
                  <Selector
                    variant="checkbox"
                    title="SMS Notifications"
                    subtext="Get updates via text"
                    selected={checkboxSelections.sms}
                    onPress={() => handleCheckboxToggle("sms")}
                  />
                  <Selector
                    variant="checkbox"
                    title="Email Notifications"
                    subtext="Get updates via email"
                    selected={checkboxSelections.email}
                    onPress={() => handleCheckboxToggle("email")}
                  />

                  {/* Navigation - Add Payment Method */}
                  <Selector
                    variant="navigation"
                    title="Add Payment Method"
                    onPress={handleAddPayment}
                  />
                </View>

                {/* Action Bar */}
                <ActionBar>
                  <Button
                    label="Continue"
                    variant="primary"
                    size="lg"
                    onPress={onClose}
                    disabled={!selectedPayment}
                  />
                </ActionBar>
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
