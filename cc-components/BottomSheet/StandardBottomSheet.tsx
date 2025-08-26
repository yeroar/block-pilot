import React, { useRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  LayerBackground,
  SpacingM4,
  BorderRadiusDefault,
  SpacingM5,
  SpacingM16,
  SpacingM6,
} from "../../generated-tokens/tokens";

export interface StandardBottomSheetProps {
  /**
   * Header content (typically FoldPageViewHeader)
   */
  headerSlot?: React.ReactNode;

  /**
   * Main content wrapped in rounded panel
   */
  contentSlot?: React.ReactNode;

  /**
   * Footer content (typically ActionBar)
   */
  footerSlot?: React.ReactNode;

  /**
   * Snap points for the bottom sheet
   */
  snapPoints?: (string | number)[];

  /**
   * Enable pan down to close
   */
  enablePanDownToClose?: boolean;

  /**
   * Allow backdrop press to close
   */
  closeOnBackdropPress?: boolean;

  /**
   * Callback when sheet is dismissed
   */
  onDismiss?: () => void;

  /**
   * Backdrop opacity
   */
  backdropOpacity?: number;
}

const StandardBottomSheet = React.forwardRef<
  BottomSheetModal,
  StandardBottomSheetProps
>(
  (
    {
      headerSlot,
      contentSlot,
      footerSlot,
      snapPoints = ["50%", "90%"],
      enablePanDownToClose = true,
      closeOnBackdropPress = false,
      onDismiss,
      backdropOpacity = 0.5,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    const sheetRef = useRef<BottomSheetModal | null>(null);

    // Expose methods via ref
    React.useImperativeHandle(ref, () => ({
      present: () => sheetRef.current?.present(),
      dismiss: () => sheetRef.current?.dismiss(),
      snapToIndex: (index: number) => sheetRef.current?.snapToIndex(index),
      // added: delegate snapToPosition and forceClose to match BottomSheetModalMethods
      snapToPosition: (position: number) =>
        // some versions use snapToPosition; guard with optional chaining
        (sheetRef.current as any)?.snapToPosition?.(position),
      expand: () => sheetRef.current?.expand(),
      collapse: () => sheetRef.current?.collapse(),
      // added: forceClose if supported
      forceClose: () => (sheetRef.current as any)?.forceClose?.(),
      close: () => sheetRef.current?.close(),
    }));

    const snapPointsArray = useMemo(() => snapPoints, [snapPoints]);

    // Render backdrop with configurable behavior
    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
          pressBehavior={closeOnBackdropPress ? "close" : "none"}
        />
      ),
      [closeOnBackdropPress, backdropOpacity]
    );

    const handleDismiss = useCallback(() => {
      onDismiss?.();
    }, [onDismiss]);

    return (
      <BottomSheetModal
        ref={sheetRef}
        snapPoints={snapPointsArray}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.container}>
          {/* Header slot (not styled) */}
          {headerSlot ? <View style={styles.header}>{headerSlot}</View> : null}

          {/* Content area — flexible, scrollable / takes available space */}
          <View style={styles.contentArea}>{contentSlot}</View>

          {/* Footer slot — fixed bottom area, safe-area padded and visually separated */}
          {footerSlot ? (
            <View style={[styles.footer, { paddingBottom: insets.bottom }]}>
              {footerSlot}
            </View>
          ) : null}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // ensure header/content/footer stack vertically
    justifyContent: "flex-start",
  },
  header: {
    width: "100%",
  },
  // contentArea grows to fill space between header and footer
  contentArea: {
    flex: 1,
    width: "100%",
  },
  footer: {
    width: "100%",
    // keep footer visually separate from content (no styling assumptions)
  },
  sheetBackground: {
    backgroundColor: LayerBackground,
  },
  handleIndicator: {
    backgroundColor: "transparent",
    height: 0,
  },
  // roundedPanel left for callers to use when they want it
  roundedPanel: {
    overflow: "hidden",
    marginTop: SpacingM5,
    borderRadius: BorderRadiusDefault,
  },
});

export default StandardBottomSheet;
