import React, { useState, useRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import PMTile from "../PMTile/PMTile";
import { ChevronDownIcon } from "../assets/BlueSkyIcons/ChevronDownIcon";
import StandardBottomSheet from "../BottomSheet/StandardBottomSheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Selector from "../Selector/Selector";
import ActionBar from "../ActionBar/ActionBar";
import Button from "../Button/Button";
import FoldPageViewHeader from "../FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../FoldPageViewHeader/StackControl";
import { ChevronLeftIcon } from "../assets/BlueSkyIcons/ChevronLeftIcon";
import { MarkerPinIcon } from "../assets/BlueSkyIcons/MarkerPinIcon";
import { GlobeIcon } from "../assets/BlueSkyIcons/GlobeIcon";
import { HeartRoundedIcon } from "../assets/BlueSkyIcons/HeartRoundedIcon";
import {
  SpacingM2,
  LayerBackground,
  BorderRadiusDefault,
  SpacingM4,
  SpacingM5,
  LayerSecondary,
  BorderSecondary,
  SpacingM1,
  SpacingM3,
} from "../../generated-tokens/tokens";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterLineProps {
  onFilterChange?: (filterId: string, optionId: string) => void;
}

const FILTER_OPTIONS = {
  // category slot is now used for "location" choices (location = where service is available)
  category: [
    { id: "in_person", label: "In person" },
    { id: "online", label: "Online" },
    { id: "both", label: "In person & online" },
  ],
  reward: [
    { id: "all", label: "All Rewards" },
    { id: "5", label: "5% sats back" },
    { id: "15", label: "15% sats back" },
    { id: "115", label: "115% sats back" },

    { id: "10", label: "10% sats back" },
  ],
};

export default function FilterLine({ onFilterChange }: FilterLineProps) {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedReward, setSelectedReward] = useState("all");
  // temporary selections inside the sheet (do NOT commit until Apply)
  const [tempSelectedCategory, setTempSelectedCategory] =
    useState(selectedCategory);
  const [tempSelectedReward, setTempSelectedReward] = useState(selectedReward);
  const [activeSheet, setActiveSheet] = useState<"category" | "reward" | null>(
    null
  );

  // Single shared bottom sheet ref (use activeSheet to switch content)
  const sheetRef = useRef<BottomSheetModal>(null);

  // Snap points for the bottom sheets
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // Icons for location/category options — shared across sheet renderers
  const locationIcons: Record<string, React.ReactNode> = {
    in_person: <MarkerPinIcon width={20} height={20} />,
    online: <GlobeIcon width={20} height={20} />,
    both: <HeartRoundedIcon width={20} height={20} />,
  };

  // Handle filter selection
  const handleFilterPress = useCallback(
    (filterId: "category" | "reward") => {
      // initialize temp selection from the committed selection
      if (filterId === "category") {
        setTempSelectedCategory(selectedCategory);
        sheetRef.current?.present();
      } else {
        setTempSelectedReward(selectedReward);
        sheetRef.current?.present();
      }
      setActiveSheet(filterId);
    },
    [selectedCategory, selectedReward]
  );

  // Handle option selection (don't close here — only via buttons)
  const handleOptionSelect = useCallback(
    (optionId: string) => {
      // update only the temporary value while the sheet is open
      if (activeSheet === "category") {
        setTempSelectedCategory(optionId);
      } else if (activeSheet === "reward") {
        setTempSelectedReward(optionId);
      }
    },
    [activeSheet]
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

    // show temporary value in the sheet
    const selectedValue =
      activeSheet === "category" ? tempSelectedCategory : tempSelectedReward;

    const title = activeSheet === "category" ? "Location" : "Reward";

    return (
      // We keep the sheet body rendering separate and use StandardBottomSheet slots
      <>
        <FoldPageViewHeader
          style={{ marginTop: -insets.top }}
          title={title}
          leftComponent={
            <StackControl
              variant="left"
              onLeftPress={() => {
                // dismiss the single shared sheet
                sheetRef.current?.dismiss();
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
                  showLeadingIcon={
                    activeSheet === "category"
                      ? locationIcons[option.id]
                      : undefined
                  }
                  onPress={() => handleOptionSelect(option.id)}
                />
                {index < options.length - 1 && <View style={styles.divider} />}
              </React.Fragment>
            ))}
          </View>
        </View>
      </>
    );
  };

  // header / content / footer slots for StandardBottomSheet
  const renderSheetHeader = () => (
    <FoldPageViewHeader
      style={{ marginTop: -insets.top }}
      title={activeSheet === "category" ? "Location" : "Reward"}
      leftComponent={
        <StackControl
          variant="left"
          onLeftPress={() => {
            // dismiss the single shared sheet
            sheetRef.current?.dismiss();
          }}
        />
      }
    />
  );

  const renderSheetBody = () => {
    const options =
      activeSheet === "category"
        ? FILTER_OPTIONS.category
        : FILTER_OPTIONS.reward;
    const selectedValue =
      activeSheet === "category" ? tempSelectedCategory : tempSelectedReward;

    return (
      <View style={styles.roundedPanel}>
        <View style={styles.selectorList}>
          {options.map((option, index) => (
            <React.Fragment key={option.id}>
              <Selector
                variant="radio"
                title={option.label}
                selected={selectedValue === option.id}
                showLeadingIcon={
                  activeSheet === "category"
                    ? locationIcons[option.id]
                    : undefined
                }
                onPress={() => handleOptionSelect(option.id)}
              />
              {index < options.length - 1 && <View style={styles.divider} />}
            </React.Fragment>
          ))}
        </View>
      </View>
    );
  };

  const renderSheetFooter = () => (
    <ActionBar>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: SpacingM3 }}
      >
        <Button
          style={{ flex: 1 }}
          label="Clear"
          variant="secondary"
          size="lg"
          onPress={() => {
            if (activeSheet === "category") {
              setTempSelectedCategory("all");
              setSelectedCategory("all");
              onFilterChange?.("category", "all");
            } else {
              setTempSelectedReward("all");
              setSelectedReward("all");
              onFilterChange?.("reward", "all");
            }
            sheetRef.current?.dismiss();
          }}
        />
        <Button
          style={{ flex: 1 }}
          label="Apply"
          variant="primary"
          size="lg"
          onPress={() => {
            if (activeSheet === "category") {
              setSelectedCategory(tempSelectedCategory);
              if (tempSelectedCategory !== "all") {
                onFilterChange?.("category", tempSelectedCategory);
              }
            } else {
              setSelectedReward(tempSelectedReward);
              if (tempSelectedReward !== "all") {
                onFilterChange?.("reward", tempSelectedReward);
              }
            }
            sheetRef.current?.dismiss();
          }}
        />
      </View>
    </ActionBar>
  );

  return (
    <>
      <View style={styles.container}>
        <PMTile
          label={getCategoryLabel()}
          selected={selectedCategory !== "all"}
          leadingIcon={false}
          trailingSlot={<ChevronDownIcon width={16} height={16} />}
          onPress={() => handleFilterPress("category")}
        />
        <PMTile
          label={getRewardLabel()}
          selected={selectedReward !== "all"}
          leadingIcon={false}
          trailingSlot={<ChevronDownIcon width={16} height={16} />}
          onPress={() => handleFilterPress("reward")}
        />
      </View>

      {/* Single shared StandardBottomSheet used for both category and reward
          - headerSlot is required (FoldPageViewHeader)
          - enableDynamicSizing makes the sheet hug header+content+footer
          - footerSlot is optional (ActionBar) */}
      <StandardBottomSheet
        ref={sheetRef}
        enableDynamicSizing={true}
        enablePanDownToClose={false}
        closeOnBackdropPress={true}
        onDismiss={handleSheetClose}
        headerSlot={renderSheetHeader()} // uses FoldPageViewHeader
        contentSlot={renderSheetBody()}
        footerSlot={renderSheetFooter() /* optional ActionBar */}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    gap: SpacingM2,
  },
  sheetBackground: {
    backgroundColor: LayerBackground,
  },
  handleIndicator: {
    backgroundColor: "transparent",
    height: 0,
  },
  sheetContent: {},
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
