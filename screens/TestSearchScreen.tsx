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
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";
import SearchBar from "../cc-components/SearchBar/SearchBar";
import GiftCard from "../cc-components/GiftCard/GiftCard";
import FilterLine from "../cc-components/SearchBar/FilterLine";
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
  SpacingM10,
} from "../generated-tokens/tokens";
import { BankNoteDollarIcon } from "../cc-components/assets/BlueSkyIcons/BankNoteDollarIcon";
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";
import { CreditCardIcon } from "../cc-components/assets/BlueSkyIcons/CreditCardIcon";
import { GlobeIcon } from "../cc-components/assets/BlueSkyIcons/GlobeIcon";
import Chip from "../cc-components/Chip/Chip";
import { useNavigation, NavigationProp } from "@react-navigation/native";

export type RootStackParamList = {
  TestSearch: undefined;
  PreviewBuyGift: undefined;
};

export default function TestSearchScreen() {
  const insets = useSafeAreaInsets();
  const topInset = insets?.top ?? 0;
  const [q, setQ] = useState("");

  // Simple filter: show only Airbnb when typing, show all when empty
  const showOnlyAirbnb = q.trim().length > 0;

  // Bottom sheet state
  const giftSheetRef = useRef<any>(null);
  const purchaseSheetRef = useRef<any>(null);
  // flag to indicate we're navigating to the preview screen (avoid reopening sheets)
  const navigatingToPreviewRef = useRef(false);
  // When true we are transitioning from gift -> purchase sheet and should
  // preserve activeGift during the dismiss/present handoff.
  const transitioningToPurchaseRef = useRef(false);

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

  const testRef = useRef<TextInput>(null);

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

  const openPurchaseSheet = () => {
    transitioningToPurchaseRef.current = true;
    // close gift sheet then open purchase sheet (small delay for smooth transition)
    giftSheetRef.current?.dismiss?.();
    setTimeout(() => purchaseSheetRef.current?.present?.(), 175);
    // reset transition flag shortly after presenting
    setTimeout(() => {
      transitioningToPurchaseRef.current = false;
    }, 350);
  };

  // keep close explicit: dismiss + clear state
  const closeGiftSheet = useCallback(() => {
    giftSheetRef.current?.dismiss();
    setActiveGift(null);
  }, []);

  const closePurchaseAndReopenGift = () => {
    purchaseSheetRef.current?.dismiss?.();
    setTimeout(() => giftSheetRef.current?.present?.(), 175);
  };

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
              resizeMode="cover"
            />
          ) : activeGift?.title === "Airbnb" ? (
            <Image
              source={require("../cc-components/assets/logoABNB.png")}
              style={styles.logoPlaceholder}
              resizeMode="cover"
            />
          ) : activeGift?.title === "Starbucks" ? (
            <Image
              source={require("../cc-components/assets/logoStar.png")}
              style={styles.logoPlaceholder}
              resizeMode="cover"
            />
          ) : (
            <Image
              source={require("../cc-components/assets/logoABNB.png")}
              style={styles.logoPlaceholder}
              resizeMode="cover"
            />
          )}
        </View>

        <FoldText type="header-md-v2">
          Up to 5% sats back{"\n"}at {activeGift?.title || "Airbnb"}
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
              // open purchase preview sheet
              openPurchaseSheet();
            }}
          />
        </View>
      </View>
    </ActionBar>
  );

  const renderPurchaseHeader = () => (
    // header with only leading chevron back — offset by safe area so header sits flush
    <FoldPageViewHeader
      style={{ marginTop: -topInset }}
      leftComponent={
        <StackControl
          variant="left"
          leadingSlot={<ChevronLeftIcon width={24} height={24} />}
          onLeftPress={() => {
            closePurchaseAndReopenGift();
          }}
        />
      }
    />
  );

  // replace renderPurchaseContent to match Figma preview-buy layout
  const renderPurchaseContent = () => (
    <View style={{ paddingTop: SpacingM3, gap: SpacingM10 }}>
      {/* header (logo + title) */}
      <View style={styles.previewHeader}>
        <View style={styles.previewLogoWrap}>
          {activeGift?.logoUri ? (
            <Image
              source={{ uri: activeGift.logoUri }}
              style={styles.previewLogo}
            />
          ) : activeGift?.title === "Airbnb" ? (
            <Image
              source={require("../cc-components/assets/logoABNB.png")}
              style={styles.previewLogo}
            />
          ) : activeGift?.title === "Starbucks" ? (
            <Image
              source={require("../cc-components/assets/logoStar.png")}
              style={styles.previewLogo}
            />
          ) : (
            <Image
              source={require("../cc-components/assets/logoABNB.png")}
              style={styles.previewLogo}
            />
          )}
        </View>

        <FoldText type="header-sm-v2">
          {`Up to 5% sats back\nat ${activeGift?.title ?? "Airbnb"}`}
        </FoldText>
      </View>

      {/* quick-amount grid */}
      <View style={styles.amountGrid}>
        <View style={styles.amountRow}>
          <View style={styles.amountCell}>
            <Button
              label="$10"
              variant={selectedAmount === "$10" ? "primary" : "secondary"}
              size="lg"
              onPress={() => {
                setSelectedAmount("$10");
              }}
            />
          </View>
          <View style={styles.amountCell}>
            <Button
              label="$20"
              variant={selectedAmount === "$20" ? "primary" : "secondary"}
              size="lg"
              onPress={() => {
                setSelectedAmount("$20");
              }}
            />
          </View>
        </View>

        <View style={styles.amountRow}>
          <View style={styles.amountCell}>
            <Button
              label="$50"
              variant={selectedAmount === "$50" ? "primary" : "secondary"}
              size="lg"
              onPress={() => {
                setSelectedAmount("$50");
              }}
            />
          </View>
          <View style={styles.amountCell}>
            <Button
              label="$100"
              variant={selectedAmount === "$100" ? "primary" : "secondary"}
              size="lg"
              onPress={() => {
                setSelectedAmount("$100");
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );

  const renderPurchaseFooter = () => (
    <ActionBar style={{ marginBottom: 0 }}>
      <View style={{ flexDirection: "row", gap: 12 }}>
        <View style={{ flex: 1 }}>
          <Button
            label="Confirm purchase"
            variant="primary"
            size="lg"
            disabled={previewDisabled}
            onPress={() => {
              if (!previewDisabled) {
                // mark that we're navigating so onDismiss won't reopen the gift sheet
                navigatingToPreviewRef.current = true; // set first
                purchaseSheetRef.current?.dismiss?.();
                giftSheetRef.current?.dismiss?.();
                setTimeout(() => {
                  navigation.navigate("PreviewBuyGift");
                  // keep flag until navigation completes / next tick
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
              paddingHorizontal: SpacingM4,
              gap: SpacingM3,
            }}
          >
            <SearchBar
              ref={testRef}
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

            {/* Always show Airbnb */}
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
          </View>
        </View>
      </SafeAreaView>

      {/* Shared bottom sheet for gift card details (standardized) */}
      <StandardBottomSheet
        ref={giftSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        closeOnBackdropPress={true}
        // only clear activeGift when not transitioning to the purchase sheet
        onDismiss={() => {
          console.log(
            "giftSheet onDismiss - navigating?",
            navigatingToPreviewRef.current
          );
          if (
            !transitioningToPurchaseRef.current &&
            !navigatingToPreviewRef.current
          ) {
            setActiveGift(null);
            setSelectedAmount(null);
          }
        }}
        contentSlot={renderSheetContent()}
        footerSlot={renderSheetFooter()}
      />

      {/* Purchase preview sheet (opened from gift sheet) */}
      <StandardBottomSheet
        ref={purchaseSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        closeOnBackdropPress={true}
        onDismiss={() => {
          // reset selected amount when purchase sheet closes
          setSelectedAmount(null);
          // only reopen gift sheet if we're not navigating away to the static preview screen
          if (!navigatingToPreviewRef.current) {
            setTimeout(() => giftSheetRef.current?.present?.(), 150);
          }
        }}
        headerSlot={renderPurchaseHeader()} // FoldPageViewHeader with only chevron left
        contentSlot={renderPurchaseContent()}
        footerSlot={renderPurchaseFooter()}
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
    paddingTop: SpacingM8,
    paddingBottom: SpacingM2,
  },
  disclaimerText: {
    color: FaceTertiary,
    letterSpacing: 0.24, // tracking from design
  },

  previewHeader: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM4,
    marginBottom: SpacingM4,
  },
  previewLogoWrap: {
    width: 48,
    height: 48,
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: BorderSecondary,
    justifyContent: "center",
    alignItems: "center",
  },
  previewLogo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  previewTitle: {
    color: FacePrimary,
    lineHeight: 28, // from App/Header-md-v2
    flex: 1,
  },

  amountGrid: {
    width: "100%",
  },
  amountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: SpacingM2,
    gap: SpacingM2,
  },
  amountCell: {
    flex: 1,
  },
});
