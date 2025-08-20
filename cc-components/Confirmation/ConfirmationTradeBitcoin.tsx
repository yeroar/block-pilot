import React from "react";
import { View, StyleSheet } from "react-native";
import LineItem from "../LineItem/LineItem";
import Chip from "../Chip/Chip";
import { FoldText } from "../Primitives/FoldText";
import {
  LayerBackground,
  BorderSecondary,
  SpacingM4,
  SpacingM2,
  BorderRadiusSm,
  FaceSecondary,
  FacePrimary,
} from "../../generated-tokens/tokens";

type Props = {
  price?: string; // e.g. "$100,000.00"
  amount?: string; // e.g. "$99.00"
  feePercentLabel?: string; // chip label, e.g. "1%"
  feeValue?: string; // e.g. "+ $1.00"
};

const ConfirmationTradeBitcoin: React.FC<Props> = ({
  price = "$100,000.00",
  amount = "$99.00",
  feePercentLabel = "1%",
  feeValue = "+ $1.00",
}) => {
  return (
    <View style={styles.card}>
      <View style={styles.list}>
        <LineItem label="Bitcoin price" variable={price} />
        <LineItem label="Amount" variable={amount} />
        <LineItem
          label="Amount"
          variable={feeValue}
          showChip={<Chip label={feePercentLabel} onPress={() => {}} />}
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.disclaimer}>
        <FoldText type="body-sm-v2" style={{ color: FaceSecondary }}>
          Funds must clear before your bitcoin is available—usually takes{" "}
          <FoldText type="body-sm-bold-v2" style={{ color: FacePrimary }}>
            2–3 business days
          </FoldText>
          .
        </FoldText>

        <FoldText type="body-sm-v2" style={{ color: FaceSecondary }}>
          By selecting "Confirm" you agree to{" "}
          <FoldText
            type="body-sm-bold-v2"
            style={{
              color: FacePrimary,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
            }}
          >
            Card Terms
          </FoldText>
          .
        </FoldText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: LayerBackground,
    borderColor: BorderSecondary,
    borderWidth: 1,
    borderRadius: BorderRadiusSm,
    padding: SpacingM4,
    width: "100%",
  },
  list: {
    gap: SpacingM4,
  },
  divider: {
    height: 1,
    backgroundColor: BorderSecondary,
    marginTop: SpacingM4,
    marginBottom: SpacingM4,
    width: "100%",
  },
  disclaimer: {
    gap: SpacingM2,
  },
});

export default ConfirmationTradeBitcoin;
