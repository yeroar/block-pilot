import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { View, StyleSheet, TextInput } from "react-native";
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
import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";
import {
  SpacingM4,
  SpacingM5,
  FacePrimary,
  FaceSecondary,
  LayerBackground,
} from "../generated-tokens/tokens";

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

  const renderSheetHeader = () => (
    <FoldPageViewHeader
      style={{ marginTop: -topInset }}
      title={activeGift?.title || "Gift Card"}
      leftComponent={
        <StackControl
          variant="left"
          leadingSlot={<ChevronLeftIcon width={24} height={24} />}
          onLeftPress={closeGiftSheet}
        />
      }
    />
  );

  const renderSheetContent = () => (
    <View style={styles.sheetBody}>
      <FoldText type="header-md-v2" style={styles.sheetTitle}>
        {activeGift?.title}
      </FoldText>
      <FoldText type="body-md-v2" style={styles.sheetSubtitle}>
        {activeGift?.subtitle}
      </FoldText>

      {/* Add more gift card details here */}
      <View style={{ marginTop: SpacingM4 }}>
        <FoldText type="body-sm-v2" style={styles.detailText}>
          Earn sats back on every purchase with {activeGift?.title}. Valid at
          participating locations and online.
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
          <FoldText type="header-lg-v2" style={styles.title}>
            Search bar test
          </FoldText>

          <SearchBar
            value={q}
            placeholder="Search..."
            onChange={setQ}
            testID="test-searchbar"
            autoFocus={true}
          />

          <View style={{ height: SpacingM4 }} />

          <FilterLine onFilterChange={handleFilterChange} />

          <View style={{ height: 16 }} />

          {/* Gift cards with onPress handlers */}
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
          <View style={{ height: 12 }} />
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
      </SafeAreaView>

      {/* Shared bottom sheet for gift card details (standardized) */}
      <StandardBottomSheet
        ref={giftSheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={true}
        closeOnBackdropPress={true}
        onDismiss={() => setActiveGift(null)}
        headerSlot={renderSheetHeader()}
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
    paddingHorizontal: SpacingM4,
    flex: 1,
  },
  title: {
    color: FacePrimary,
    marginBottom: SpacingM4,
  },
  sheetBody: {
    paddingHorizontal: SpacingM4,
    paddingVertical: SpacingM5,
    // do not flex so sheet can hug content when using enableDynamicSizing
  },
  sheetTitle: {
    color: FacePrimary,
    marginBottom: SpacingM4,
  },
  sheetSubtitle: {
    color: FaceSecondary,
    marginBottom: SpacingM4,
  },
  detailText: {
    color: FaceSecondary,
    lineHeight: 20,
  },
});
