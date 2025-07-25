import {
  BottomSheetBackdrop,
  type BottomSheetBackdropProps,
  type BottomSheetBackgroundProps,
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { forwardRef, type ReactNode } from "react";
import Animated, { interpolateColor, useAnimatedStyle } from "react-native-reanimated";
import { UnistylesRuntime } from "react-native-unistyles";
import { useAnimatedTheme } from "react-native-unistyles/reanimated";

/**
 * BottomSheet - renders a bottom sheet modal with defaults
 *
 * @param props - React props
 * @param props.children - the children of the bottom sheet
 */
export const BottomSheet = forwardRef<BottomSheetModal, BottomSheetModalProps>(
  ({ children, ...props }, ref) => {
    return (
      <BottomSheetModal
        ref={ref}
        enableBlurKeyboardOnGesture
        enablePanDownToClose
        backgroundComponent={BottomSheetBackground}
        backdropComponent={(props: BottomSheetBackdropProps) => (
          <BottomSheetBackdrop disappearsOnIndex={-1} appearsOnIndex={0} {...props} />
        )}
        {...props}
      >
        <BottomSheetView
          style={{
            flex: 1,
            paddingBottom: UnistylesRuntime.insets.bottom,
          }}
        >
          {children as ReactNode}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

const BottomSheetBackground: React.FC<BottomSheetBackgroundProps> = ({ style, animatedIndex }) => {
  const { value: animatedTheme } = useAnimatedTheme();

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedIndex.value,
      [0, 1],
      [animatedTheme.colors.background, animatedTheme.colors.background]
    ),
  }));
  const containerStyle = [
    style,
    {
      borderTopLeftRadius: animatedTheme.radius.sheet,
      borderTopRightRadius: animatedTheme.radius.sheet,
    },
    containerAnimatedStyle,
  ];

  return <Animated.View pointerEvents="none" style={containerStyle} />;
};
