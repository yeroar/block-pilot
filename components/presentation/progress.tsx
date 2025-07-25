import { useEffect, useState } from "react";
import Animated, {
  cancelAnimation,
  clamp,
  interpolate,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import type { Color } from "../../theme/color";
import { View, type ViewProps } from "../layout/view";

export type ProgressBarProps = ViewProps & {
  variant: "linear" | "circular";
  type: "indeterminate" | "determinate";
  value: number;
  tintColor?: Color;
  trackColor?: Color;
  animationDuration?: number;
  animate?: boolean;
};

/**
 * ProgressBar - renders an animated progress bar
 *
 * @param props - React props
 * @param props.value - the value of the progress bar
 * @param props.type - the type of the progress bar
 * @param props.animationDuration - the duration of the animation
 * @param props.animate - whether the progress bar should animate
 * @param props.tintColor - the color of the progress bar
 * @param props.trackColor - the color of the track of the progress bar
 */
export function ProgressBar({
  value,
  type,
  animationDuration,
  animate = true,
  tintColor = "active",
  trackColor = "gray",
}: ProgressBarProps) {
  const isReducedMotion = useReducedMotion();

  const transition = useSharedValue(0);
  const [width, setWidth] = useState(0);

  const runAnimation = () => {
    if (type === "indeterminate") {
      cancelAnimation(transition);

      transition.value = 0;
      transition.value = withRepeat(
        withTiming(1, {
          duration: animationDuration ?? 2000,
        }),
        -1, // infinite repeat
        false // don't reverse
      );
    } else {
      cancelAnimation(transition);

      transition.value = withTiming(value, {
        duration: animationDuration ?? 1000,
      });
    }
  };

  const animatedBarStyle = useAnimatedStyle(() => {
    const translateXOutputRange =
      type === "indeterminate" ? [-width, 0.5 * width] : [-0.5 * width, 0];
    const scaleXInputRange = type === "indeterminate" ? [0, 0.5, 1] : [0, 1];
    const scaleXOutputRange = type === "indeterminate" ? [0.0001, 1, 0.001] : [0.0001, 1];

    return {
      translateX: interpolate(transition.value, [0, 1], translateXOutputRange),
      scaleX: interpolate(transition.value, scaleXInputRange, scaleXOutputRange),
    };
  });

  const shouldAnimate = animate && !isReducedMotion;

  useEffect(() => {
    if (shouldAnimate) {
      runAnimation();
    }
  }, [animate, isReducedMotion]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{
        now: clamp(transition.value, 0, 1),
        min: 0,
        max: 1,
      }}
      onLayout={({
        nativeEvent: {
          layout: { width },
        },
      }) => setWidth(width)}
      height={4}
      borderRadius="capsule"
      overflow="hidden"
      width="100%"
      backgroundColor={trackColor}
      style={{ position: "relative" }}
    >
      {shouldAnimate ? (
        <Animated.View style={[styles.bar(tintColor), animatedBarStyle]} />
      ) : (
        <View backgroundColor={tintColor} width={width * clamp(transition.value, 0, 1)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  bar: (tintColor: Color) => ({
    flex: 1,
    backgroundColor: theme.colors[tintColor],
  }),
}));
