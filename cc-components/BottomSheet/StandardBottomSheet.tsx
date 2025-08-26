import React, { useRef, useMemo, useCallback } from "react";
import { View, StyleSheet } from "react-native";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetBackdrop,
  BottomSheetModalMethods,
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
   * Snap points for the bottom sheet - if not provided, will use dynamic sizing
   */
  snapPoints?: (string | number)[];

  /**
   * Use dynamic content-based sizing instead of fixed snap points
   */
  enableDynamicSizing?: boolean;

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
  BottomSheetModalMethods,
  StandardBottomSheetProps
>(
  (
    {
      headerSlot,
      contentSlot,
      footerSlot,
      snapPoints,
      enableDynamicSizing = true, // default to dynamic sizing for "hug content"
      enablePanDownToClose = true,
      closeOnBackdropPress = false,
      onDismiss,
      backdropOpacity = 0.5,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    // ref that holds the modal methods exposed by @gorhom/bottom-sheet
    const sheetRef = useRef<BottomSheetModalMethods | null>(null);

    // if using dynamic sizing we expect a header to properly position the sheet
    if (enableDynamicSizing && !headerSlot && __DEV__) {
      // runtime helper to catch incorrect usage early in development
      // headerSlot is required for consistent top offset when sizing to content
      // (you can still omit headerSlot in production but behaviour may differ)
      // eslint-disable-next-line no-console
      console.warn(
        "StandardBottomSheet: enableDynamicSizing=true but no headerSlot provided. Provide a FoldPageViewHeader in headerSlot for correct layout."
      );
    }

    // Use dynamic sizing or provided snap points
    const snapPointsArray = useMemo(() => {
      if (enableDynamicSizing) {
        // For dynamic sizing, we still need valid snap points but the sheet will size to content
        return ["100%", "100%"]; // fallback snap points when using dynamic sizing
      }
      return snapPoints || ["50%", "90%"];
    }, [snapPoints, enableDynamicSizing]);

    // Expose methods via ref
    React.useImperativeHandle(
      ref,
      () =>
        ({
          present: () => sheetRef.current?.present?.(),
          dismiss: () => sheetRef.current?.dismiss?.(),
          snapToIndex: (index: number) =>
            sheetRef.current?.snapToIndex?.(index),
          snapToPosition: (position: number) =>
            (sheetRef.current as any)?.snapToPosition?.(position),
          expand: () => sheetRef.current?.expand?.(),
          collapse: () => sheetRef.current?.collapse?.(),
          forceClose: () => (sheetRef.current as any)?.forceClose?.(),
          close: () => (sheetRef.current as any)?.close?.(),
        } as BottomSheetModalMethods),
      []
    );

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
        // BottomSheetModal expects a ref that resolves to BottomSheetModalMethods.
        // sheetRef is typed as BottomSheetModalMethods | null — cast to any to satisfy JSX typing where required.
        ref={sheetRef as any}
        snapPoints={snapPointsArray}
        enableDynamicSizing={enableDynamicSizing}
        enablePanDownToClose={enablePanDownToClose}
        backdropComponent={renderBackdrop}
        onDismiss={handleDismiss}
        backgroundStyle={styles.sheetBackground}
        handleIndicatorStyle={styles.handleIndicator}
      >
        <BottomSheetView style={styles.container}>
          {/* Header slot */}
          {headerSlot ? (
            <View style={[styles.header]}>{headerSlot}</View>
          ) : null}

          {/* Content area — wraps to content height when dynamic sizing enabled */}
          <View
            style={
              enableDynamicSizing
                ? styles.contentAreaDynamic
                : styles.contentArea
            }
          >
            {contentSlot}
          </View>

          {/* Footer slot */}
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
    // layout stacks header / content / footer vertically
    justifyContent: "flex-start",
    paddingHorizontal: SpacingM4,
  },
  header: {
    width: "100%",
  },
  // Original content area for fixed snap points
  contentArea: {
    flex: 1,
    width: "100%",
  },
  // Dynamic content area that wraps to content height
  contentAreaDynamic: {
    width: "100%",
    alignSelf: "stretch",
  },
  footer: {
    width: "100%",
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
