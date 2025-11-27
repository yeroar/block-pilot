import React, { useState, useRef, useMemo, useCallback, useEffect } from "react";
import { View, StyleSheet, Animated, LayoutAnimation, Platform, UIManager } from "react-native";
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
  SpacingM5,
  LayerSecondary,
  BorderSecondary,
  SpacingM3,
  FaceSecondary,
  ObjectSecondaryDefault,
} from "../../generated-tokens/tokens";

interface FilterOption {
  id: string;
  label: string;
}

interface FilterLineProps {
  onFilterChange?: (filterId: string, optionId: string) => void;
}

const FILTER_OPTIONS = {
  // category slot is now used for redemption method choices
  category: [
    { id: "in_person", label: "In-store" },
    { id: "online", label: "Online" },
    { id: "both", label: "In-store and online" },
  ],
  reward: [
    { id: "top_brands", label: "Top brands" },
    { id: "boosted", label: "Boosted" },
    { id: "favorites", label: "Favorites" },
    { id: "gas_fuel", label: "Gas / Fuel" },
    { id: "groceries", label: "Groceries" },
    { id: "auto", label: "Auto" },
    { id: "bitcoin", label: "Bitcoin" },
    { id: "beauty_personal_care", label: "Beauty & Personal Care" },
    { id: "clothing", label: "Clothing" },
    { id: "dining", label: "Dining" },
    { id: "electronics_gaming", label: "Electronics and Gaming" },
  ],
};

export default function FilterLine({ onFilterChange }: FilterLineProps) {
  const insets = useSafeAreaInsets();
  
  // Enable layout animations for Android
  if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
  
  // Animated values for chip interactions
  const categoryScaleAnim = useRef(new Animated.Value(1)).current;
  const rewardScaleAnim = useRef(new Animated.Value(1)).current;
  const categoryChevronRotation = useRef(new Animated.Value(0)).current;
  const rewardChevronRotation = useRef(new Animated.Value(0)).current;
  const containerOpacity = useRef(new Animated.Value(0)).current;

  // Entrance animation on mount
  useEffect(() => {
    Animated.timing(containerOpacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [containerOpacity]);
  // External filter id mapping (internal -> outbound)
  const FILTER_ID_MAP: Record<string, string> = {
    category: "redemption",
    reward: "category",
  };
  const [selectedCategory, setSelectedCategory] = useState("gift_card");
  const [selectedReward, setSelectedReward] = useState("top_brands");
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

  // Animation helpers
  const animateChipPress = useCallback((chipType: "category" | "reward") => {
    const scaleAnim = chipType === "category" ? categoryScaleAnim : rewardScaleAnim;
    const rotationAnim = chipType === "category" ? categoryChevronRotation : rewardChevronRotation;
    
    // Enhanced scale animation with bounce effect
    Animated.parallel([
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 300,
          friction: 10,
          useNativeDriver: true,
        }),
      ]),
      Animated.spring(rotationAnim, {
        toValue: 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [categoryScaleAnim, rewardScaleAnim, categoryChevronRotation, rewardChevronRotation]);

  const resetChipAnimation = useCallback((chipType: "category" | "reward") => {
    const rotationAnim = chipType === "category" ? categoryChevronRotation : rewardChevronRotation;
    
    // Smooth spring animation for reset
    Animated.spring(rotationAnim, {
      toValue: 0,
      tension: 200,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, [categoryChevronRotation, rewardChevronRotation]);

  // Handle filter selection
  const handleFilterPress = useCallback(
    (filterId: "category" | "reward") => {
      // Add smooth layout animation for state changes
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 0.7,
        },
      });
      
      // Animate the chip press
      animateChipPress(filterId);
      
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
    [selectedCategory, selectedReward, animateChipPress]
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
    // Reset animations when sheet closes
    if (activeSheet) {
      resetChipAnimation(activeSheet);
    }
    setActiveSheet(null);
  }, [activeSheet, resetChipAnimation]);

  // Get display labels
  const getCategoryLabel = () => {
    const option = FILTER_OPTIONS.category.find(
      (opt) => opt.id === selectedCategory
    );
    return option?.label || "Redemption method"; // updated fallback label
  };

  const getRewardLabel = () => {
    const option = FILTER_OPTIONS.reward.find(
      (opt) => opt.id === selectedReward
    );
    return option?.label || "Category"; // updated fallback label
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
  const renderSheetHeader = () => {
    const headerTitle =
      activeSheet === "category"
        ? "Filter by redemption method"
        : "Filter by category";

    return (
      <FoldPageViewHeader
        style={{ marginTop: -insets.top - 16 }}
        titleType="header-xxs-v2"
        title={headerTitle}
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
  };

  const renderSheetBody = () => {
    const options =
      activeSheet === "category"
        ? FILTER_OPTIONS.category
        : FILTER_OPTIONS.reward;
    const selectedValue =
      activeSheet === "category" ? tempSelectedCategory : tempSelectedReward;

    // Both category and reward sheets use clean styling with radio on left, no backgrounds/dividers
    return (
      <View style={styles.selectorListClean}>
        {options.map((option, index) => (
          <Selector
            key={option.id}
            variant="radio"
            title={option.label}
            selected={selectedValue === option.id}
            showLeadingIcon={false} // Remove icon containers for clean look
            onPress={() => handleOptionSelect(option.id)}
          />
        ))}
      </View>
    );
  };

  const renderSheetFooter = () => (
    <ActionBar>
      <View
        style={{ flexDirection: "row", alignItems: "center", gap: SpacingM3 }}
      >
        <Button
          style={{ flex: 1, height: 48 }}
          label="Clear"
          variant="secondary"
          size="lg"
          onPress={() => {
            // Add smooth transition for clear action
            LayoutAnimation.configureNext({
              duration: 250,
              create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeInEaseOut,
              },
            });
            
            if (activeSheet === "category") {
              setTempSelectedCategory("gift_card");
              setSelectedCategory("gift_card");
              onFilterChange?.(FILTER_ID_MAP.category, "gift_card");
              resetChipAnimation("category");
            } else {
              setTempSelectedReward("top_brands");
              setSelectedReward("top_brands");
              onFilterChange?.(FILTER_ID_MAP.reward, "top_brands");
              resetChipAnimation("reward");
            }
            sheetRef.current?.dismiss();
          }}
        />
        <Button
          style={{ flex: 1, height: 48 }}
          label="Apply"
          variant="primary"
          size="lg"
          onPress={() => {
            // Add smooth transition for apply action
            LayoutAnimation.configureNext({
              duration: 250,
              create: {
                type: LayoutAnimation.Types.easeInEaseOut,
                property: LayoutAnimation.Properties.opacity,
              },
              update: {
                type: LayoutAnimation.Types.easeInEaseOut,
              },
            });
            
            if (activeSheet === "category") {
              setSelectedCategory(tempSelectedCategory);
              onFilterChange?.(FILTER_ID_MAP.category, tempSelectedCategory);
              resetChipAnimation("category");
            } else {
              setSelectedReward(tempSelectedReward);
              onFilterChange?.(FILTER_ID_MAP.reward, tempSelectedReward);
              resetChipAnimation("reward");
            }
            sheetRef.current?.dismiss();
          }}
        />
      </View>
    </ActionBar>
  );

  return (
    <>
      <Animated.View style={[styles.container, { opacity: containerOpacity }]}>
        <Animated.View 
          style={[
            { transform: [{ scale: categoryScaleAnim }] }
          ]}
        >
          <PMTile
            label={getCategoryLabel()}
            selected={selectedCategory !== "gift_card"}
            leadingIcon={false}
            trailingSlot={
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: categoryChevronRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
              >
                <ChevronDownIcon width={16} height={16} />
              </Animated.View>
            }
            onPress={() => handleFilterPress("category")}
            style={styles.pill}
            textType="body-md-v2"
            textStyle={styles.pillText}
          />
        </Animated.View>
        
        <Animated.View 
          style={[
            { transform: [{ scale: rewardScaleAnim }] }
          ]}
        >
          <PMTile
            label={getRewardLabel()}
            selected={selectedReward !== "top_brands"}
            leadingIcon={false}
            trailingSlot={
              <Animated.View
                style={{
                  transform: [
                    {
                      rotate: rewardChevronRotation.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0deg', '180deg'],
                      }),
                    },
                  ],
                }}
              >
                <ChevronDownIcon width={16} height={16} />
              </Animated.View>
            }
            onPress={() => handleFilterPress("reward")}
            style={styles.pill}
            textType="body-md-v2"
            textStyle={styles.pillText}
          />
        </Animated.View>
      </Animated.View>

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
        headerSlot={renderSheetHeader()} // Add header back
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
  pill: {
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 8,
    borderRadius: 100,
    backgroundColor: ObjectSecondaryDefault,
    gap: 2,
    height: 36, // override base height to hug content
    justifyContent: "flex-start", // prevent space-between stretching
  },
  pillText: {
    color: FaceSecondary,
    // remove forced lineHeight to let text hug vertically via intrinsic metrics
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
  selectorListClean: {
    // Clean list without background, borders, or dividers
    gap: 0,
  },
  divider: {
    height: 1,
    backgroundColor: BorderSecondary,
  },
});
