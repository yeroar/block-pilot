import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import PMTile from "../PMTile/PMTile";
import { ChevronDownIcon } from "../assets/BlueSkyIcons/ChevronDownIcon";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Selector from "../Selector/Selector";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import {
  SpacingM2,
  LayerBackground,
  BorderRadiusDefault,
  SpacingM4,
  SpacingM5,
  LayerSecondary,
  BorderSecondary,
  SpacingM1,
} from "../../generated-tokens/tokens";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterLineProps {
  onFilterChange?: (filterId: string, optionId: string) => void;
}

const FILTER_OPTIONS = {
  category: [
    { id: "all", label: "All Categories" },
    { id: "food", label: "Food & Dining" },
    { id: "shopping", label: "Shopping" },
    { id: "travel", label: "Travel" },
    { id: "entertainment", label: "Entertainment" },
  ],
  reward: [
    { id: "all", label: "All Rewards" },
    { id: "1", label: "1% sats back" },
    { id: "2", label: "2% sats back" },
    { id: "5", label: "5% sats back" },
    { id: "10", label: "10% sats back" },
  ],
};

export default function FilterLine({ onFilterChange }: FilterLineProps) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedReward, setSelectedReward] = useState("all");
  const [activeSheet, setActiveSheet] = useState<"category" | "reward" | null>(
    null
  );

  // Bottom sheet refs
  const categorySheetRef = useRef<BottomSheetModal>(null);
  const rewardSheetRef = useRef<BottomSheetModal>(null);

  // Snap points for the bottom sheets
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  // Handle filter selection
  const handleFilterPress = useCallback((filterId: "category" | "reward") => {
    setActiveSheet(filterId);
    if (filterId === "category") {
      categorySheetRef.current?.present();
    } else {
      rewardSheetRef.current?.present();
    }
  }, []);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (optionId: string) => {
      if (activeSheet === "category") {
        setSelectedCategory(optionId);
        onFilterChange?.("category", optionId);
        categorySheetRef.current?.dismiss();
      } else if (activeSheet === "reward") {
        setSelectedReward(optionId);
        onFilterChange?.("reward", optionId);
        rewardSheetRef.current?.dismiss();
      }
    },
    [activeSheet, onFilterChange]
  );

  // Handle sheet close
  const handleSheetClose = useCallback(() => {
    setActiveSheet(null);
  }, []);

  // Get display labels
  const getCategoryLabel = () => {
    const option = FILTER_OPTIONS.category.find(
      (opt) => opt.id === selectedCategory
    );
    return option?.label || "Category";
  };

  const getRewardLabel = () => {
    const option = FILTER_OPTIONS.reward.find(
      (opt) => opt.id === selectedReward
    );
    return option?.label || "Reward";
  };

  // Render sheet content
  const renderSheetContent = () => {
    const options =
      activeSheet === "category"
        ? FILTER_OPTIONS.category
        : FILTER_OPTIONS.reward;

    const selectedValue =
      activeSheet === "category" ? selectedCategory : selectedReward;

    const title =
      activeSheet === "category" ? "Select Category" : "Select Reward";

    return (
      <BottomSheetView style={styles.sheetContent}>
        <FoldPageViewHeader
          style={{ marginTop: -insets.top }}
          title={title}
          leftComponent={
            <StackControl
              variant="left"
              leadingSlot={<ChevronLeftIcon width={24} height={24} />}
              onLeftPress={() => {
                if (activeSheet === "category") {
                  categorySheetRef.current?.dismiss();
                } else {
                  rewardSheetRef.current?.dismiss();
                }
              }}
            />
          }
        />

        <View style={styles.roundedPanel}>
          <View style={styles.selectorList}>
            {options.map((option, index) => (
              <React.Fragment key={option.id}>
                <Selector
                  variant="radio"
                  title={option.label}
                  selected={selectedValue === option.id}
                  onPress={() => handleOptionSelect(option.id)}
                />
                {index < options.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </View>

        <ActionBar style={{ marginBottom: insets.bottom + SpacingM4 }}>
          <Button
            label="Apply Filter"
            variant="primary"
            size="lg"
            onPress={() => {
              if (activeSheet === "category") {
                categorySheetRef.current?.dismiss();
              } else {
                rewardSheetRef.current?.dismiss();
              }
            }}
          />
        </ActionBar>
      </BottomSheetView>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <PMTile
          label={getCategoryLabel()}
          selected={selectedCategory !== "all"}
          trailingSlot={<ChevronDownIcon width={16} height={16} />}
          onPress={() => handleFilterPress("category")}
        />
        <PMTile
          label={getRewardLabel()}
          selected={selectedReward !== "all"}
          trailingSlot={<ChevronDownIcon width={16} height={16} />}
          onPress={() => handleFilterPress("reward")}
        />
      </View>

      {/* Category Bottom Sheet */}
      <BottomSheetModal
        ref={categorySheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={handleSheetClose}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        {renderSheetContent()}
      </BottomSheetModal>

      {/* Reward Bottom Sheet */}
      <BottomSheetModal
        ref={rewardSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        onDismiss={handleSheetClose}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        {renderSheetContent()}
      </BottomSheetModal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: SpacingM2,
    width: "100%",
  },
  sheetBackground: {
    backgroundColor: LayerBackground,
  },
  handleIndicator: {
    backgroundColor: "transparent",
    height: 0,
  },
  sheetContent: {
    paddingHorizontal: SpacingM4,
  },
  roundedPanel: {
    overflow: "hidden",
    marginTop: SpacingM5,
    borderRadius: BorderRadiusDefault,
  },
  selectorList: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
  },
  divider: {
    height: 1,
    backgroundColor: BorderSecondary,
  },
});
