import React from "react";
import { View, StyleSheet } from "react-native";
import LineItem from "../LineItem/LineItem";
import {
  BorderSecondary,
  FacePrimary,
  FaceSecondary,
  FaceTertiary,
  LayerBackground,
  SpacingM0,
  SpacingM2,
  SpacingM3,
  SpacingM4,
  SpacingM6,
} from "../../generated-tokens/tokens";
import { FoldText } from "../Primitives/FoldText";

interface ConfirmationBuyGiftCardProps {
  location?: string;
  total?: string;
  feePercentLabel?: string;
  feeValue?: string;
  feeSatsValue?: string;
}

export default function ConfirmationBuyGiftCard({
  location = "Online and in-store",
  total = "$250",
  feePercentLabel = "5%",
  feeValue = "$12.50",
  feeSatsValue = "10,946 sats",
}: ConfirmationBuyGiftCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.list}>
        <LineItem label="Location" variable={location} />
        <LineItem label="Total" variable={total} />
        <LineItem
          label={`Rewards • ${feePercentLabel}`}
          variable={
            <View style={styles.rewardsValue}>
              <FoldText
                type="body-md-bold-v2"
                style={{ color: FacePrimary, textAlign: "right" }}
              >
                {feeValue}
              </FoldText>
              <FoldText
                type="body-md-v2"
                style={{ color: FaceTertiary, textAlign: "right" }}
              >
                {feeSatsValue}
              </FoldText>
            </View>
          }
        />
      </View>

      <View style={styles.dividerLine} />

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
    marginTop: SpacingM4,
  },
  list: {
    gap: SpacingM0,
  },

  dividerLine: {
    height: 1,
    backgroundColor: BorderSecondary,
    marginVertical: SpacingM6,
  },
  disclaimer: {
    gap: SpacingM2,
  },
  rewardsValue: {
    alignItems: "flex-end",
    gap: SpacingM0,
  },
});
