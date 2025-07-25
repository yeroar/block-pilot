import { BlurView } from "expo-blur";
import { forwardRef } from "react";
import type { View as RNView, ViewProps as RNViewProps } from "react-native";
import {
  KeyboardAvoidingView,
  type KeyboardAvoidingViewProps,
  KeyboardStickyView,
  type KeyboardStickyViewProps,
} from "react-native-keyboard-controller";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { NativeView } from "./util/native";
import { type LayoutStyleProps, useLayoutStyle } from "./util/useLayoutStyle";

type KeyboardViewProps =
  | ({
      keyboardBehavior: "avoid";
      blur?: never;
    } & KeyboardAvoidingViewProps)
  | ({
      keyboardBehavior: "sticky";
      blur?: never;
    } & KeyboardStickyViewProps)
  | {
      keyboardBehavior?: never;
      blur?: number;
    };

export type ViewProps = RNViewProps &
  LayoutStyleProps &
  KeyboardViewProps & {
    animate?: boolean;
  };

const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

/**
 * View - render a basic, animation-enabled view component with optional keyboard handling behavior and blur effect
 */
export const View = forwardRef<RNView, ViewProps>(
  ({ animate, keyboardBehavior, blur, ...props }, ref) => {
    const isReducedMotion = useReducedMotion();

    const layoutStyle = useLayoutStyle(props);

    const layoutArray = Array.isArray(layoutStyle) ? layoutStyle : [layoutStyle];

    // ref: https://www.unistyl.es/v3/guides/merging-styles
    const mergedStyle = props.style
      ? Array.isArray(props.style)
        ? [...layoutArray, ...props.style]
        : [...layoutArray, props.style]
      : layoutArray;

    if (keyboardBehavior) {
      switch (keyboardBehavior) {
        case "avoid":
          return (
            <KeyboardAvoidingView
              ref={ref}
              behavior="position"
              contentContainerStyle={mergedStyle}
            />
          );
        case "sticky":
          return <KeyboardStickyView ref={ref} style={mergedStyle} {...props} />;
      }
    }

    if (animate && !isReducedMotion) {
      if (blur) {
        return (
          <AnimatedBlurView
            ref={ref}
            intensity={blur}
            tint="systemChromeMaterial"
            style={mergedStyle}
            {...props}
          />
        );
      }

      return <Animated.View ref={ref} style={mergedStyle} {...props} />;
    }

    if (blur) {
      return (
        <BlurView intensity={blur} tint="systemChromeMaterial" style={mergedStyle} {...props} />
      );
    }

    return <NativeView ref={ref} style={mergedStyle} {...props} />;
  }
);
