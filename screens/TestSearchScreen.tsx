import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import StandardBottomSheet from "../cc-components/BottomSheet/StandardBottomSheet";
import SearchBar from "../cc-components/SearchBar/SearchBar";
import GiftCard from "../cc-components/GiftCard/GiftCard";
import FilterLine from "../cc-components/SearchBar/FilterLine";
import Button from "../cc-components/Button/Button";
import ActionBar from "../cc-components/ActionBar/ActionBar";

export default function TestSearchScreen() {
  const [q, setQ] = useState("");
  const testRef = useRef<TextInput>(null);

  // Bottom sheet state
  const giftSheetRef = useRef<BottomSheetModal>(null);
  const [activeGift, setActiveGift] = useState<{
    title: string;
    subtitle: string;
    logoUri?: string;
  } | null>(null);

  const snapPoints = useMemo(() => ["40%", "80%"], []);

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

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="none" // prevent backdrop tap to close
      />
    ),
    []
  );

  return (
    <>
      <SafeAreaView style={styles.safe}>
        <View style={styles.page}>
          <Text style={styles.title}>Search bar test</Text>

          <SearchBar
            value={q}
            placeholder="Search..."
            onChange={setQ}
            testID="test-searchbar"
            autoFocus={true}
          />

          <View style={{ height: 16 }} />

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
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        closeOnBackdropPress={false}
        onDismiss={() => setActiveGift(null)}
        contentSlot={
          <View style={styles.sheetBody}>
            <Text style={styles.sheetTitle}>{activeGift?.title}</Text>
            <Text style={styles.sheetSubtitle}>{activeGift?.subtitle}</Text>

            {/* Add more gift card details here */}
            <View style={{ marginTop: 16 }}>
              <Text style={styles.detailText}>
                Earn sats back on every purchase with {activeGift?.title}. Valid
                at participating locations and online.
              </Text>
            </View>
          </View>
        }
        footerSlot={
          <ActionBar variant="bottom-sheet" style={{ marginBottom: 0 }}>
            <View style={{ flexDirection: "row", gap: 12 }}>
              <View style={{ flex: 1 }}>
                <Button
                  label="Close"
                  variant="secondary"
                  size="lg"
                  onPress={closeGiftSheet}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Button
                  label="Get Card"
                  variant="primary"
                  size="lg"
                  onPress={() => {
                    console.log(`Getting card for ${activeGift?.title}`);
                    closeGiftSheet();
                  }}
                />
              </View>
            </View>
          </ActionBar>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  page: {
    paddingLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  sheetContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  sheetBody: {
    padding: 16,
    flex: 1,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  sheetSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  detailText: {
    fontSize: 14,
    color: "#888",
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
