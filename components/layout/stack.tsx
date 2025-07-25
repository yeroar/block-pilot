import { forwardRef } from "react";
import type { ScrollView as RNScrollView, View as RNView } from "react-native";
import type Animated from "react-native-reanimated";
import type { AnimatedView } from "react-native-reanimated/lib/typescript/component/View";
import { ScrollView, type ScrollViewProps } from "./scroll";
import { View, type ViewProps } from "./view";

type StackProps = ({ scroll: true } & ScrollViewProps) | ({ scroll?: false } & ViewProps);

type StackRef = RNScrollView | Animated.ScrollView | RNView | AnimatedView;

/**
 * Overloads in place for correct ref typing
 */

/**
 * HStack - horizontal stack (row) component
 *
 * @param props - React props
 * @param ref - React ref
 *
 * @overload {scroll: true} - ScrollView (optionally animated)
 * @overload {scroll?: false} - View
 */
function _HStack(
  props: { scroll: true } & ScrollViewProps,
  ref: React.Ref<RNScrollView | Animated.ScrollView>
): React.ReactElement | null;
function _HStack(
  props: { scroll?: false } & ViewProps,
  ref: React.Ref<RNView | AnimatedView>
): React.ReactElement | null;
function _HStack(props: StackProps, ref: React.Ref<StackRef>): React.ReactElement | null {
  if (props.scroll) {
    return (
      <ScrollView
        ref={ref as React.Ref<RNScrollView | Animated.ScrollView>}
        direction="row"
        {...props}
      />
    );
  }
  return <View ref={ref as React.Ref<RNView | AnimatedView>} direction="row" {...props} />;
}

/**
 * VStack - vertical stack (column) component
 *
 * @param props - React props
 * @param ref - React ref
 *
 * @overload {scroll: true} - ScrollView (optionally animated)
 * @overload {scroll?: false} - View
 */
function _VStack(
  props: { scroll: true } & ScrollViewProps,
  ref: React.Ref<RNScrollView | Animated.ScrollView>
): React.ReactElement | null;
function _VStack(
  props: { scroll?: false } & ViewProps,
  ref: React.Ref<RNView | AnimatedView>
): React.ReactElement | null;
function _VStack(props: StackProps, ref: React.Ref<StackRef>): React.ReactElement | null {
  if (props.scroll) {
    return (
      <ScrollView
        ref={ref as React.Ref<RNScrollView | Animated.ScrollView>}
        direction="column"
        {...props}
      />
    );
  }
  return <View ref={ref as React.Ref<RNView | AnimatedView>} direction="column" {...props} />;
}

const HStack = forwardRef(_HStack);
const VStack = forwardRef(_VStack);

export { HStack, VStack };
