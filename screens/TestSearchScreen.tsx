import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import StandardBottomSheet from "../cc-components/BottomSheet/StandardBottomSheet";
import SearchBar from "../cc-components/SearchBar/SearchBar";
import GiftCard from "../cc-components/GiftCard/GiftCard";
import FilterLine from "../cc-components/SearchBar/FilterLine";
import Button from "../cc-components/Button/Button";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import { FoldText } from "../cc-components/Primitives/FoldText";
import {
  FacePrimary,
  FaceSecondary,
  FaceTertiary,
  BorderSecondary,
  SpacingM2,
  SpacingM4,
  SpacingM5,
  LayerBackground,
  SpacingM3,
  SpacingM0,
  ObjectPrimaryBoldDefault,
  SpacingM8,
} from "../generated-tokens/tokens";
import { BankNoteDollarIcon } from "../cc-components/assets/BlueSkyIcons/BankNoteDollarIcon";
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";
import { CreditCardIcon } from "../cc-components/assets/BlueSkyIcons/CreditCardIcon";
import { GlobeIcon } from "../cc-components/assets/BlueSkyIcons/GlobeIcon";
import Chip from "../cc-components/Chip/Chip";

export default function TestSearchScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets?.top ?? 0;
  const [q, setQ] = useState("");
  const testRef = useRef<TextInput>(null);

  // Bottom sheet state
  const giftSheetRef = useRef<BottomSheetModal>(null);
  const [activeGift, setActiveGift] = useState<{
    title: string;
    subtitle: string;
    logoUri?: string;
  } | null>(null);

  useEffect(() => {
    setTimeout(() => testRef.current?.focus(), 100);
  }, []);

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

  const closeGiftSheet = useCallback(() => {
    giftSheetRef.current?.dismiss();
  }, []);

  const renderSheetContent = () => (
    <View style={styles.sheetBody}>
      {/* Header section with logo and title */}
      <View style={styles.headerSection}>
        <View style={styles.logoAndTitle}>
          {/* Use gift card logo if available (remote or local fallback) */}
          {activeGift?.logoUri ? (
            <Image
              source={{ uri: activeGift.logoUri }}
              style={styles.logoPlaceholder}
            />
          ) : activeGift?.title === "Airbnb" ? (
            <Image
              source={require("../cc-components/assets/logoABNB.png")}
              style={styles.logoPlaceholder}
            />
          ) : activeGift?.title === "Starbucks" ? (
            <Image
              source={require("../cc-components/assets/logoStar.png")}
              style={styles.logoPlaceholder}
            />
          ) : (
            <View style={styles.logoPlaceholder} />
          )}
        </View>

        <FoldText type="header-lg-v2" style={styles.mainTitle}>
          Up to 5% sats back{"\n"}at {activeGift?.title}
        </FoldText>

        {/* Chips row */}
        <View style={styles.chipsRow}>
          <Chip label="Boosted" bold onPress={() => {}} />
          <Chip
            label="Fold+ exclusive"
            bold
            onPress={() => {}}
            style={{ backgroundColor: ObjectPrimaryBoldDefault }}
            textStyle={{ color: FacePrimary }}
          />
        </View>
      </View>

      {/* Validation warnings section */}
      <View style={styles.validationSection}>
        <View style={styles.validationRow}>
          <CreditCardIcon width={16} height={16} />
          <FoldText type="body-md-v2" style={styles.validationText}>
            Purchase with debit or credit card
          </FoldText>
        </View>

        <View style={styles.validationRow}>
          <CalendarIcon width={16} height={16} />
          <FoldText type="body-md-v2" style={styles.validationText}>
            No expiration
          </FoldText>
        </View>

        <View style={styles.validationRow}>
          <BankNoteDollarIcon width={16} height={16} />
          <FoldText type="body-md-v2" style={styles.validationText}>
            Min purchase $20
          </FoldText>
        </View>

        <View style={styles.validationRow}>
          <GlobeIcon width={16} height={16} />
          <FoldText type="body-md-v2" style={styles.validationText}>
            In person or online
          </FoldText>
        </View>
      </View>

      {/* Disclaimer section */}
      <View style={styles.disclaimerSection}>
        <FoldText type="body-sm-v2" style={styles.disclaimerText}>
          [Disclaimer text...]
        </FoldText>
      </View>
    </View>
  );

  const renderSheetFooter = () => (
    <ActionBar style={{ marginBottom: 0 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Button
            label="Buy gift card"
            variant="primary"
            size="lg"
            onPress={() => {
              console.log(`Buying card for ${activeGift?.title}`);
              // perform purchase flow here...
              closeGiftSheet();
            }}
          />
        </View>
      </View>
    </ActionBar>
  );

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <View style={styles.page}>
          {/* Header */}
          <View
            style={{
              paddingHorizontal: SpacingM4,
              gap: SpacingM3,
            }}
          >
            <SearchBar
              value={q}
              placeholder="Search..."
              onChange={setQ}
              testID="test-searchbar"
              autoFocus={true}
            />
            <FilterLine onFilterChange={handleFilterChange} />
          </View>

          {/* Gift search */}
          <View
            style={{
              paddingLeft: SpacingM4,
            }}
          >
            <FoldText
              type="header-xs-v2"
              style={{ marginBottom: SpacingM4, marginTop: SpacingM8 }}
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
          </View>
        </View>
      </SafeAreaView>

      {/* Shared bottom sheet for gift card details (standardized) */}
      <StandardBottomSheet
        ref={giftSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        closeOnBackdropPress={true}
        onDismiss={() => setActiveGift(null)}
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
  title: {
    color: FacePrimary,
    marginBottom: SpacingM4,
  },
  sheetBody: {
    paddingHorizontal: SpacingM4,
    paddingVertical: SpacingM5,
  },
  headerSection: {
    width: "100%",
    gap: SpacingM4,
    marginBottom: SpacingM5 * 2, // 32px gap between sections
  },
  logoAndTitle: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SpacingM4 + SpacingM2, // 24px gap
  },
  logoPlaceholder: {
    width: 64, // 16 * 4 = 64px
    height: 64,
    backgroundColor: BorderSecondary,
    borderRadius: 6, // border-radii/small
  },
  mainTitle: {
    color: FacePrimary,
    lineHeight: 36, // from App/Header-lg-v2
  },
  chipsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: SpacingM2, // 8px gap
  },
  validationSection: {
    width: "100%",
    gap: SpacingM2, // 8px gap between rows
    marginBottom: SpacingM5 * 2, // 32px gap to disclaimer
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
    letterSpacing: 0.14, // tracking from design
  },
  disclaimerSection: {
    width: "100%",
    paddingTop: SpacingM2,
    paddingBottom: SpacingM2,
  },
  disclaimerText: {
    color: FaceTertiary,
    letterSpacing: 0.24, // tracking from design
  },
});
