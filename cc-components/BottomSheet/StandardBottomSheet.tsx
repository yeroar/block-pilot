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
  BorderRadiusDefault,
  LayerBackground,
  SpacingM0,
  SpacingM4,
  SpacingM5,
} from "../../generated-tokens/tokens";
import { colorPrimitivesBS } from "../../generated-tokens/colorPrimitives2.1";

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

  /**
   * Horizontal padding inside sheet sections (header/content/footer)
   */
  sectionPaddingX?: number;
  /**
   * Vertical gap between header/content/footer
   */
  sectionGap?: number;
  /**
   * Wrap content slot in a rounded panel
   */
  useRoundedPanel?: boolean;
  /**
   * Padding inside the rounded panel
   */
  panelPadding?: number;
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
      sectionGap = SpacingM0,
      useRoundedPanel = false,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets();
    // ref that holds the modal methods exposed by @gorhom/bottom-sheet
    const sheetRef = useRef<BottomSheetModalMethods | null>(null);

    // if using dynamic sizing we expect a header to properly position the sheet
    // headerSlot is now optional - no warning needed

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

    const contentNode = useRoundedPanel ? (
      <View style={[styles.roundedPanel]}>{contentSlot}</View>
    ) : (
      contentSlot
    );

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
        <BottomSheetView
          style={[
            styles.container,
            {
              paddingHorizontal: SpacingM5,
              gap: sectionGap,
            },
          ]}
        >
          {/* Header slot */}
          {headerSlot ? (
            <View style={[styles.header]}>{headerSlot}</View>
          ) : null}

          {/* Content area */}
          <View
            style={
              enableDynamicSizing
                ? styles.contentAreaDynamic
                : styles.contentArea
            }
          >
            {contentNode}
          </View>

          {/* Footer slot */}
          {footerSlot ? (
            <View style={[styles.footer, { paddingBottom: insets.bottom - 8 }]}>
              {footerSlot}
            </View>
          ) : null}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const resolveColor = (val: unknown) => {
  if (typeof val === "string" && val.startsWith("{") && val.endsWith("}")) {
    const path = val.slice(1, -1).split(".");
    let ref: any = colorPrimitivesBS;
    for (const p of path) {
      if (ref == null) return val;
      ref = ref[p];
    }
    return typeof ref === "string" ? ref : val;
  }
  return val;
};

const styles = StyleSheet.create({
  container: {
    // layout stacks header / content / footer vertically
    justifyContent: "flex-start",
    paddingHorizontal: SpacingM0,
    paddingTop: 0, // remove implicit top padding
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
    borderRadius: BorderRadiusDefault,
  },
});

export default StandardBottomSheet;
