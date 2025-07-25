import { selectionAsync } from "expo-haptics";
import { forwardRef, type Ref, type RefObject } from "react";
import { useTranslation } from "react-i18next";
import {
  type GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  type TouchableNativeFeedbackProps,
  TouchableOpacity,
  type TouchableOpacityProps,
  type View,
} from "react-native";
// @ts-expect-error - no types for this module
import RNTouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { type MaybeTranslatedContent, useTranslatedContent } from "../../i18n";

type PlatformPressableProps = TouchableOpacityProps | TouchableNativeFeedbackProps;

export type PressableProps = Omit<PlatformPressableProps, "disabled" | "accessibilityLabel"> & {
  isDisabled?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  isFeedbackDisabled?: boolean;
  haptic?: () => Promise<void>;
  accessibilityLabel?: MaybeTranslatedContent;
  animate?: boolean;
  bounce?: boolean;
};

export type PressableRef = TouchableNativeFeedback | typeof TouchableOpacity;

const AnimatedTouchableNativeFeedback = Animated.createAnimatedComponent(TouchableNativeFeedback);
const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

/**
 * Pressable - renders a pressable component with support for haptics, accessibility, and animations.
 * by default, renders the platform-appropriate native component.
 *
 * @param props - React props
 * @param props.isDisabled - whether the pressable is disabled
 * @param props.isLoading - whether the pressable is loading
 * @param props.isSelected - whether the pressable is selected
 * @param props.isFeedbackDisabled - whether the pressable should disable haptics
 * @param props.haptic - the haptic to use
 * @param props.accessibilityLabel - the accessibility label
 * @param props.accessibilityRole - the accessibility role
 * @param props.onPress - the function to call when the pressable is pressed
 * @param props.animate - whether to animate the pressable
 * @param props.bounce - whether to bounce the pressable, renders a 'TouchableBounce' component
 * @param ref - React ref
 *
 * @see https://stackoverflow.com/questions/39123357/when-to-use-touchablenativefeedback-touchablehighlight-or-touchableopacity
 */
export const Pressable = forwardRef<PressableRef, PressableProps>(
  (
    {
      isDisabled,
      isLoading,
      isSelected,
      isFeedbackDisabled,
      haptic = selectionAsync,
      accessibilityLabel,
      accessibilityRole,
      onPress,
      animate,
      bounce,
      ...props
    },
    ref
  ) => {
    const isReducedMotion = useReducedMotion();

    const { i18n } = useTranslation();
    const translatedAccessibilityLabel = useTranslatedContent(accessibilityLabel);

    const isUntouchable = isDisabled || isLoading || typeof onPress !== "function";
    const isCheckable = accessibilityRole === "checkbox" || accessibilityRole === "switch";

    const handlePress = async (event: GestureResponderEvent): Promise<void> => {
      if (isUntouchable) return;

      if (!isFeedbackDisabled) {
        await haptic();
      }

      onPress(event);
    };

    const propsWithDefaults: PlatformPressableProps = {
      onPress: handlePress,
      disabled: isUntouchable,
      accessibilityLabel: translatedAccessibilityLabel,
      accessibilityLanguage: i18n.language,
      accessibilityRole: accessibilityRole ?? "button",
      accessibilityState: {
        disabled: isUntouchable,
        busy: isLoading,
        selected: isSelected,
        checked: !isCheckable && isSelected,
        ...props.accessibilityState,
      },
      ...props,
    };

    if (bounce && !isReducedMotion) {
      return <RNTouchableBounce {...propsWithDefaults} />;
    }

    if (Platform.OS === "android") {
      const Component =
        isReducedMotion || !animate ? TouchableNativeFeedback : AnimatedTouchableNativeFeedback;
      return <Component ref={ref as RefObject<TouchableNativeFeedback>} {...propsWithDefaults} />;
    }

    const Component = isReducedMotion || !animate ? TouchableOpacity : AnimatedTouchableOpacity;
    return <Component ref={ref as Ref<View>} {...propsWithDefaults} />;
  }
);
