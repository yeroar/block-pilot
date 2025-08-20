import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import PMTile from "./PMTile";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import { BankIcon } from "../assets/BlueSkyIcons/BankIcon";
import { PlusCircleIcon } from "../assets/BlueSkyIcons/PlusCircleIcon";
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
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const insets = useSafeAreaInsets();

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayment(paymentId);
    onSelectPayment?.(paymentId);
    onClose();
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
                  {/* Existing Payment Methods */}
                  <PMTile
                    leadingSlot={<BankIcon width={16} height={16} />}
                    label="Wells Fargo ---- 0823"
                    selected={selectedPayment === "wells-fargo"}
                    onPress={() => handleSelectPayment("wells-fargo")}
                  />

                  <PMTile
                    leadingSlot={<BankIcon width={16} height={16} />}
                    label="Chase ---- 1234"
                    selected={selectedPayment === "chase"}
                    onPress={() => handleSelectPayment("chase")}
                  />

                  {/* Add Payment Method */}
                  <PMTile
                    label="Add payment method"
                    trailingSlot={<PlusCircleIcon width={16} height={16} />}
                    selected={false}
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
    minHeight: 400,
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
    flex: 1,
    paddingBottom: SpacingM10,
    gap: SpacingM6,
  },
  content: {
    flex: 1,
    gap: SpacingM2,
  },
});

export default PMTileBottomSheet;
