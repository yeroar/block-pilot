import { NotificationFeedbackType, notificationAsync } from "expo-haptics";
import { type ForwardedRef, useImperativeHandle, useRef, useState } from "react";
import { Keyboard, type TextInput } from "react-native";
import {
  Easing,
  useAnimatedStyle,
  useReducedMotion,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export type UseInputHandleProps = {
  isDisabled?: boolean;
  onClear?: () => void;
  isFeedbackDisabled?: boolean;
  shouldAutoFocus?: boolean;
};

export function useInputHandle(
  ref: ForwardedRef<TextInput>,
  { isDisabled, onClear, isFeedbackDisabled, shouldAutoFocus = false }: UseInputHandleProps
) {
  const isReducedMotion = useReducedMotion();

  const shakeX = useSharedValue<number>(0);

  const inputRef = useRef<TextInput>(null);

  const [isFocused, setIsFocused] = useState<boolean>(shouldAutoFocus);

  useImperativeHandle<Partial<TextInput>, Partial<TextInput>>(ref, () => ({
    focus: () => {
      if (isDisabled) return;
      inputRef.current?.focus();
      setIsFocused(true);
    },
    blur: () => {
      if (isDisabled) return;
      inputRef.current?.blur();
      Keyboard.dismiss();
      setIsFocused(false);
    },
    clear: () => {
      if (isDisabled) return;
      inputRef.current?.clear();
      onClear?.();
    },
    isFocused: () => isFocused,
    setError: async (error: unknown) => {
      if (isReducedMotion || isFeedbackDisabled) return;
      if (!error) return;

      await notificationAsync(NotificationFeedbackType.Error);
      // simulate iOS shake animation
      shakeX.value = withSequence(
        withTiming(10, { duration: 75, easing: Easing.linear }),
        withTiming(-10, { duration: 75, easing: Easing.linear }),
        withTiming(10, { duration: 75, easing: Easing.linear }),
        withTiming(0, { duration: 75, easing: Easing.linear })
      );
    },
  }));

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shakeX.value }],
  }));

  return {
    inputRef,
    isFocused,
    setIsFocused,
    animatedStyle,
  };
}
