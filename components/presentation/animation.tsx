import {
  type AnimatedProp,
  Canvas,
  Group,
  Skia,
  Skottie,
  type SkSkottieAnimation,
  useClock,
} from "@shopify/react-native-skia";
import type { StyleProp, ViewStyle } from "react-native";
import { useDerivedValue } from "react-native-reanimated";

/**
 * Animation - renders a JSON animation file using Skia's Skottie library
 *
 * @param props - React props
 * @param props.animationFile - the JSON animation file
 * @param props.style - the style of the animation
 * @param props.shouldLoop - whether the animation should loop
 * @param props.frame - the frame of the animation
 *
 * @see https://shopify.github.io/react-native-skia/docs/skottie
 */
export function Animation({
  animationFile,
  style,
  shouldLoop = true,
  frame = 0,
}: {
  animationFile: AnimatedProp<SkSkottieAnimation>;
  style?: StyleProp<ViewStyle>;
  shouldLoop?: boolean;
  frame?: number;
}) {
  const skottieAnimation = Skia.Skottie.Make(JSON.stringify(animationFile));

  const clock = useClock();
  const loopFrame = useDerivedValue(() => {
    const fps = skottieAnimation.fps();
    const duration = skottieAnimation.duration();
    const currentFrame = Math.floor((clock.value / 1000) * fps) % (duration * fps);

    return currentFrame;
  });

  return (
    <Canvas style={[{ flex: 1 }, style]}>
      <Group transform={[{ scale: 0.5 }]}>
        <Skottie animation={skottieAnimation} frame={shouldLoop ? loopFrame : (frame ?? 41)} />
      </Group>
    </Canvas>
  );
}
