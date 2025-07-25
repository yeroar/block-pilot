import { BlurView } from "expo-blur";
import { forwardRef, type Ref } from "react";
import {
  ScrollView as RNScrollView,
  type ScrollViewProps as RNScrollViewProps,
} from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardGestureArea,
  KeyboardToolbar,
} from "react-native-keyboard-controller";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { useKeyboardAnimation } from "../../hooks";
import { useBottomTabOverflow } from "../../navigation/use-bottom-tab-overflow";
import { type LayoutStyleProps, useLayoutStyle } from "./util/useLayoutStyle";

export type ScrollViewProps = RNScrollViewProps &
  LayoutStyleProps & {
    animate?: boolean;
    isKeyboardAware?: boolean;
  };

/**
 * ScrollView - render a basic, animation-enabled scroll view component with optional keyboard handling behavior and blur effect
 */
export const ScrollView = forwardRef<RNScrollView | Animated.ScrollView, ScrollViewProps>(
  ({ animate, isKeyboardAware, ...props }, ref) => {
    const bottom = useBottomTabOverflow();

    const isReducedMotion = useReducedMotion();

    const { keyboardViewStyle } = useKeyboardAnimation();

    const layoutStyle = useLayoutStyle(props);

    const layoutArray = Array.isArray(layoutStyle) ? layoutStyle : [layoutStyle];

    // ref: https://www.unistyl.es/v3/guides/merging-styles
    const mergedStyle = props.style
      ? Array.isArray(props.style)
        ? [...layoutArray, ...props.style]
        : [...layoutArray, props.style]
      : layoutArray;

    const baseProps: Partial<RNScrollViewProps> = {
      showsHorizontalScrollIndicator: false,
      showsVerticalScrollIndicator: false,
      automaticallyAdjustsScrollIndicatorInsets: true,
      contentInsetAdjustmentBehavior: "automatic",
      contentInset: { bottom },
      scrollIndicatorInsets: { bottom },
      horizontal: props.horizontal ?? props.direction === "row",
      contentContainerStyle: mergedStyle,
    };

    if (isKeyboardAware) {
      return (
        // ref: https://kirillzyusko.github.io/react-native-keyboard-controller/docs/guides/interactive-keyboard
        <KeyboardGestureArea interpolator="ios">
          <KeyboardAwareScrollView ref={ref} {...baseProps}>
            {props.children}
            <Animated.View style={keyboardViewStyle} />
          </KeyboardAwareScrollView>

          {/* ref: https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-toolbar#example */}
          <KeyboardToolbar
            opacity="EE"
            // ref: https://kirillzyusko.github.io/react-native-keyboard-controller/docs/api/components/keyboard-toolbar#blur
            blur={<BlurView intensity={100} tint="systemChromeMaterial" />}
          />
        </KeyboardGestureArea>
      );
    }

    if (animate && !isReducedMotion) {
      return <Animated.ScrollView ref={ref as Ref<Animated.ScrollView>} style={mergedStyle} {...props} />;
    }

    return <RNScrollView ref={ref} style={mergedStyle} {...props} />;
  }
);
