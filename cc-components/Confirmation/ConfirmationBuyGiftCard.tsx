import React from "react";
import { View, StyleSheet } from "react-native";
import LineItem from "../LineItem/LineItem";
import Chip from "../Chip/Chip";
import {
  SpacingM4,
  SpacingM2,
  BorderSecondary,
  LayerBackground,
  FacePrimary,
  FaceSecondary,
} from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface ConfirmationBuyGiftCardProps {
  location?: string;
  total?: string;
  feePercentLabel?: string;
  feeValue?: string;
}

export default function ConfirmationBuyGiftCard({
  location = "Airbnb",
  total = "$100.00",
  feePercentLabel = "5%",
  feeValue = "$5.00",
}: ConfirmationBuyGiftCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.list}>
        <LineItem label="Location" variable={location} />
        <LineItem label="Total" variable={total} />
        <LineItem
          label="Rewards"
          variable={feeValue}
          showChip={<Chip label={feePercentLabel} onPress={() => {}} />}
        />
      </View>
      <View style={styles.disclaimer}>
        <FoldText type="body-sm-v2" style={{ color: FaceSecondary }}>
          [Brand] is not a sponsor of the rewards or otherwise affiliated with
          Fold, Inc. The logos and other identifying marks attached are
          trademarks of and owned by each represented company and/or it
          affiliates. Please visit each company’s website for additional terms
          and conditions. Fold cannot provide refunds on purchased gift cards.
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
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: LayerBackground,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: BorderSecondary,
    paddingHorizontal: SpacingM4,
    paddingVertical: SpacingM4,
    marginTop: SpacingM4,
  },
  list: {
    gap: SpacingM2,
  },
  disclaimer: {
    gap: SpacingM2,
  },
});
