import React, { useState, useRef, useEffect, useCallback } from "react";
import { View, StyleSheet, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import StandardBottomSheet from "../cc-components/BottomSheet/StandardBottomSheet";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";
import SearchBar from "../cc-components/SearchBar/SearchBar";
import GiftCard from "../cc-components/GiftCard/GiftCard";
import FilterLine from "../cc-components/SearchBar/FilterLine";
import { FoldText } from "../cc-components/Primitives/FoldText";
import {
  FacePrimary,
  FaceSecondary,
  BorderSecondary,
  SpacingM2,
  SpacingM4,
  SpacingM5,
  LayerBackground,
  SpacingM3,
  FaceDisabled,
  SpacingM12,
  SpacingM6,
  BorderPrimary,
  Red500,
} from "../generated-tokens/tokens";
import { CreditCardIcon } from "../cc-components/assets/BlueSkyIcons/CreditCardIcon";
import { GlobeIcon } from "../cc-components/assets/BlueSkyIcons/GlobeIcon";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import RecommendedGifts from "../cc-components/GiftCard/RecommendedGifts";
import { red } from "react-native-reanimated/lib/typescript/Colors";

export type RootStackParamList = {
  TestSearch: undefined;
  PreviewBuyGift: undefined;
};

const LOCAL_LOGOS: Record<string, any> = {
  Airbnb: require("../cc-components/assets/logoABNB.png"),
  Starbucks: require("../cc-components/assets/logoStar.png"),
  Walgreens: require("../cc-components/assets/Walgreens.png"),
  Walmart: require("../cc-components/assets/Wallmart.png"), // project file is Wallmart.png
  Wallmart: require("../cc-components/assets/Wallmart.png"),
  Wawa: require("../cc-components/assets/Wawa.png"),
  Wayfair: require("../cc-components/assets/Wayfair.png"),
  WHBM: require("../cc-components/assets/WHBM.png"),
  "Wine.com": require("../cc-components/assets/Wine.com.png"),
};

export default function TestSearchScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets?.top ?? 0;
  const [q, setQ] = useState("");

  // Simple filter: show only Airbnb when typing, show all when empty
  const showOnlyAirbnb = q.trim().length > 0;

  // Bottom sheet state
  const giftSheetRef = useRef<any>(null);
  // flag to indicate we're navigating to the preview screen (avoid reopening sheets)
  const navigatingToPreviewRef = useRef(false);

  const [activeGift, setActiveGift] = useState<{
    title: string;
    subtitle: string;
    logoUri?: string;
  } | null>(null);

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Add amount selection state
  const [selectedAmount, setSelectedAmount] = useState<string | null>(null);

  // previewDisabled when no amount is selected
  const previewDisabled = !selectedAmount;

  // Helper function to get button style based on selection state
  const getAmountButtonStyle = (amount: string) => {
    const baseStyle = { borderRadius: 16 };
    const selectedStyle = {
      borderColor: BorderPrimary,
      borderWidth: 1.5,
      borderRadius: 16,
    };

    return selectedAmount === amount ? selectedStyle : baseStyle;
  };

  const handleFilterChange = (filterId: string, optionId: string) => {
    console.log(`Filter ${filterId} changed to: ${optionId}`);
  };

  const openGiftSheet = useCallback(
    (gift: { title: string; subtitle: string; logoUri?: string }) => {
      setActiveGift(gift);
      giftSheetRef.current?.present();
    },
    []
  );

  // single sheet flow — navigate directly from footer button
  const closeGiftSheet = useCallback(() => {
    giftSheetRef.current?.dismiss();
    setActiveGift(null);
  }, []);

  const renderSheetContent = () => {
    const logoSource = activeGift?.logoUri
      ? { uri: activeGift.logoUri }
      : LOCAL_LOGOS[activeGift?.title ?? "Airbnb"] || LOCAL_LOGOS["Airbnb"];

    return (
      <View>
        {/* Header: logo only */}
        <View style={styles.sheetHeaderLogoRow}>
          <Image
            source={logoSource}
            style={styles.smallLogo}
            resizeMode="cover"
          />
        </View>
        {/* Details: title and value props */}
        <View style={styles.sheetDetailsSection}>
          <FoldText type="header-lg-v2">
            {`${activeGift?.title ?? "Airbnb"} gift card`}
          </FoldText>
          <View style={styles.valueProps}>
            <View style={styles.validationRow}>
              <CreditCardIcon width={16} height={16} />
              <FoldText type="body-md-v2" style={styles.validationText}>
                Purchase with debit or credit card
              </FoldText>
            </View>
            <View style={styles.validationRow}>
              <GlobeIcon width={16} height={16} />
              <FoldText type="body-md-v2" style={styles.validationText}>
                In-store or online
              </FoldText>
            </View>
          </View>
        </View>

        {/* Divider with vertical margin */}
        <View style={styles.dividerLine} />

        {/* Amount selector */}
        <View style={styles.amountGrid}>
          <View style={styles.amountRow}>
            <View style={styles.amountCell}>
              <Button
                label="$10"
                variant="outline"
                size="lg"
                style={getAmountButtonStyle("$10")}
                onPress={() => setSelectedAmount("$10")}
              />
            </View>
            <View style={styles.amountCell}>
              <Button
                label="$20"
                variant="outline"
                size="lg"
                style={getAmountButtonStyle("$20")}
                onPress={() => setSelectedAmount("$20")}
              />
            </View>
          </View>
          <View style={[styles.amountRow, { marginBottom: 0 }]}>
            <View style={styles.amountCell}>
              <Button
                label="$50"
                variant="outline"
                size="lg"
                style={getAmountButtonStyle("$50")}
                onPress={() => setSelectedAmount("$50")}
              />
            </View>
            <View style={styles.amountCell}>
              <Button
                label="$100"
                variant="outline"
                size="lg"
                style={getAmountButtonStyle("$100")}
                onPress={() => setSelectedAmount("$100")}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderSheetFooter = () => (
    <ActionBar style={{ marginBottom: 0 }}>
      <View style={{ flexDirection: "column", gap: 12 }}>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button
              label="Continue"
              variant="primary"
              size="lg"
              disabled={!selectedAmount}
              onPress={() => {
                if (selectedAmount) {
                  navigatingToPreviewRef.current = true;
                  giftSheetRef.current?.dismiss();
                  setTimeout(() => {
                    navigation.navigate("PreviewBuyGift");
                    setTimeout(
                      () => (navigatingToPreviewRef.current = false),
                      250
                    );
                  }, 300);
                }
              }}
            />
          </View>
        </View>

        {/* Secondary full-width button */}
        <View style={{ flexDirection: "row", gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Button
              label={`Favorite ${activeGift?.title || "brand"}`}
              variant="tertiary"
              size="lg"
              onPress={() => {
                /* no-op for now — hook your favorite logic here */
              }}
            />
          </View>
        </View>
      </View>
    </ActionBar>
  );

  useEffect(() => {
    if (!activeGift || navigatingToPreviewRef.current) return;
    giftSheetRef.current?.present?.();
  }, [activeGift]);

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <View style={styles.page}>
          {/* Header */}
          <View
            style={{
              paddingHorizontal: SpacingM5,
              gap: SpacingM3,
            }}
          >
            <SearchBar
              value={q}
              placeholder="Search gift cards"
              onChange={setQ}
              testID="test-searchbar"
              autoFocus={true}
            />
            <FilterLine onFilterChange={handleFilterChange} />
          </View>

          {/* Gift search */}
          <View
            style={{
              paddingLeft: SpacingM5,
            }}
          >
            <FoldText
              type="header-xs-v2"
              style={{ marginBottom: SpacingM4, marginTop: SpacingM5 }}
            >
              Recommended
            </FoldText>

            <GiftCard
              variant="outlined"
              title="Airbnb"
              subtitle="5% sats back"
              logoUri={undefined}
              onPress={() =>
                openGiftSheet({
                  title: "Airbnb",
                  subtitle: "5% sats back",
                  logoUri: undefined,
                })
              }
            />

            <RecommendedGifts
              openGiftSheet={openGiftSheet}
              showOnlyAirbnb={showOnlyAirbnb}
            />
          </View>
        </View>
      </SafeAreaView>

      {/* Shared bottom sheet for gift card details (standardized) */}
      <StandardBottomSheet
        ref={giftSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        closeOnBackdropPress={true}
        headerSlot={<View style={{ height: 0 }} />}
        // only clear activeGift when not transitioning to the purchase sheet
        onDismiss={() => {
          console.log(
            "giftSheet onDismiss - navigating?",
            navigatingToPreviewRef.current
          );
          if (!navigatingToPreviewRef.current) {
            setActiveGift(null);
            setSelectedAmount(null);
          }
        }}
        contentSlot={renderSheetContent()}
        footerSlot={renderSheetFooter()}
      />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: LayerBackground,
  },
  page: {
    flex: 1,
  },
  sheetHeaderLogoRow: {
    width: "100%",
    alignItems: "flex-start",
    marginBottom: SpacingM4,
  },
  sheetDetailsSection: {
    width: "100%",
    gap: SpacingM3,
  },
  valueProps: {
    width: "100%",
    gap: 6,
  },
  dividerLine: {
    height: 1,
    backgroundColor: BorderSecondary,
    marginVertical: SpacingM6,
  },
  smallLogo: {
    width: 40,
    height: 40,
    borderRadius: 12,
  },

  validationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM2, // 8px gap between icon and text
    width: "100%",
  },
  validationText: {
    color: FaceSecondary,
    flex: 1,
  },

  amountGrid: {
    width: "100%",
    marginBottom: SpacingM3,
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SpacingM3,
    gap: SpacingM3,
  },
  amountCell: {
    flex: 1,
  },
});
