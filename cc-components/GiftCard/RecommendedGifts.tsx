import React from "react";
import GiftCard from "./GiftCard";

type Props = {
  openGiftSheet: (gift: { title: string; subtitle: string; logoUri?: string }) => void;
  showOnlyAirbnb: boolean;
};

export default function RecommendedGifts({ openGiftSheet, showOnlyAirbnb }: Props) {
  return (
    <>
      {/* Only show Starbucks when search is empty */}
      {!showOnlyAirbnb && (
        <GiftCard
          variant="outlined"
          title="Starbucks"
          subtitle="2% sats back"
          logoUri={undefined}
          onPress={() =>
            openGiftSheet({
              title: "Starbucks",
              subtitle: "2% sats back",
              logoUri: undefined,
            })
          }
        />
      )}

      {/* Additional recommended merchants when search is empty */}
      {!showOnlyAirbnb && (
        <>
          <GiftCard
            variant="outlined"
            title="Walgreens"
            subtitle="3% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "Walgreens",
                subtitle: "3% sats back",
                logoUri: undefined,
              })
            }
          />
          <GiftCard
            variant="outlined"
            title="Walmart"
            subtitle="2% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "Walmart",
                subtitle: "2% sats back",
                logoUri: undefined,
              })
            }
          />
          <GiftCard
            variant="outlined"
            title="Wawa"
            subtitle="2% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "Wawa",
                subtitle: "2% sats back",
                logoUri: undefined,
              })
            }
          />
          <GiftCard
            variant="outlined"
            title="Wayfair"
            subtitle="5% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "Wayfair",
                subtitle: "5% sats back",
                logoUri: undefined,
              })
            }
          />
          <GiftCard
            variant="outlined"
            title="WHBM"
            subtitle="4% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "WHBM",
                subtitle: "4% sats back",
                logoUri: undefined,
              })
            }
          />
          <GiftCard
            variant="outlined"
            title="Wine.com"
            subtitle="5% sats back"
            logoUri={undefined}
            onPress={() =>
              openGiftSheet({
                title: "Wine.com",
                subtitle: "5% sats back",
                logoUri: undefined,
              })
            }
          />
        </>
      )}
    </>
  );
}