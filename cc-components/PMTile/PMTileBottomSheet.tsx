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
import { EmptyPaymentContentExample } from "./PMTileBottomSheet.examples";

interface PMTileBottomSheetProps {
  visible: boolean;
  onClose: () => void;
  onSelectPayment?: (paymentId: string) => void;
  onAddPayment?: () => void;
  title?: string;
  // keep variant/renderContent optional for compatibility, but unused
  variant?: "default";
  renderContent?: () => React.ReactElement;
}

const PMTileBottomSheet: React.FC<PMTileBottomSheetProps> = ({
  visible,
  onClose,
  onSelectPayment,
  onAddPayment,
  title = "Add payment method",
}) => {
  const insets = useSafeAreaInsets();

  return (
    <Modal
      visible={visible}
      transparent
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
                <EmptyPaymentContentExample
                  onSelect={(pm) => {
                    // forward only the key to keep the BottomContext API intact
                    onSelectPayment?.(pm.key);
                    onClose();
                  }}
                />
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
