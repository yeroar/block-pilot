import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { ImpactFeedbackStyle, impactAsync } from "expo-haptics";
import { forwardRef, useRef } from "react";
import {
  NativeSyntheticEvent,
  type StyleProp,
  TextInput,
  type TextInputFocusEventData,
  type TextInputProps,
  type TextInputSubmitEditingEventData,
  type ViewStyle,
} from "react-native";
import { MaskedTextInput, type MaskedTextInputRef } from "react-native-advanced-input-mask";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { StyleSheet } from "react-native-unistyles";
import { useKeyboardController, useTheme } from "../../hooks";
import type { Spacing } from "../../theme";
import { Icon, type IconProps } from "../content/icon";
import { Text, type TextProps } from "../content/text";
import { HStack, VStack } from "../layout";
import { View } from "../layout/view";
import { Button } from "./button";
import { Pressable } from "./pressable";
import { useInputHandle } from "./util/use-input-handle";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
const AnimatedMaskedTextInput = Animated.createAnimatedComponent(MaskedTextInput);

export type InputProps = TextInputProps & {
  isDisabled?: boolean;
  onClear?: () => void;
  shouldAutoFocus?: boolean;
  isFeedbackDisabled?: boolean;
  spacing?: Spacing;
  containerStyle?: StyleProp<ViewStyle>;
  label?: TextProps;
  iconLeft?: IconProps["name"];
  iconRight?: IconProps["name"];
  showClearButton?: boolean;
  error?: TextProps;
  hasError?: boolean;
  hint?: TextProps;
  shape?: "rounded" | "capsule" | undefined;
  variant?: "solid" | "outline" | "underline" | undefined;
  keyboardOffset?: number;
  mask?: string;
  isBottomSheet?: boolean;
};

/**
 * Input - renders a text input component with support for haptics, accessibility, animations, and styling variants.
 *
 * @param props - React props
 * @param props.isDisabled - whether the input is disabled
 * @param props.value - the value of the input
 * @param props.onChangeText - the function to call when the input value changes
 * @param props.placeholder - the placeholder text of the input
 * @param props.selection - the selection of the input
 * @param props.onClear - the function to call when the input is cleared
 * @param props.isFeedbackDisabled - whether the input should disable haptics
 * @param props.shouldAutoFocus - whether the input should automatically focus when the component is mounted
 * @param props.onSubmitEditing - the function to call when the input is submitted
 * @param props.spacing - the spacing of the input
 * @param props.containerStyle - the style of the input container
 * @param props.label - the label of the input
 * @param props.iconLeft - the left icon of the input
 * @param props.iconRight - the right icon of the input
 * @param props.showClearButton - whether the input should show a clear button
 * @param props.error - the error of the input
 * @param props.hint - the hint of the input
 * @param props.variant - the variant of the input
 * @param props.shape - the shape of the input
 * @param props.keyboardOffset - the keyboard offset of the input
 * @param props.mask - the mask of the input, if any
 * @param props.isBottomSheet - whether the input is in a bottom sheet
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/text-fields
 */
export const Input = forwardRef<TextInput, InputProps>(
  (
    {
      isDisabled,
      value,
      onChangeText,
      placeholder,
      selection,
      onClear,
      isFeedbackDisabled,
      shouldAutoFocus,
      onSubmitEditing,
      spacing,
      containerStyle,
      label,
      iconLeft,
      iconRight,
      showClearButton,
      error,
      hint,
      variant,
      shape,
      onFocus,
      onBlur,
      mask,
      keyboardOffset = 0,
      isBottomSheet = false,
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<TextInput | MaskedTextInputRef | null>(null);

    useKeyboardController({
      isSheet: false,
      offset: keyboardOffset,
    });

    const theme = useTheme({ animate: true });

    const { isFocused, animatedStyle } = useInputHandle(ref, {
      isDisabled,
      onClear,
      isFeedbackDisabled,
      shouldAutoFocus,
    });

    const isReducedMotionEnabled = useReducedMotion();

    const hasError = Boolean(error);

    styles.useVariants({
      isDisabled,
      isFocused: isFocused || (Boolean(value?.length) && !hasError),
      hasError,
      variant,
      shape,
    });

    const iconColor = hasError ? "error" : isFocused || value?.length ? "text" : "placeholderText";

    const InputComponent = isBottomSheet
      ? BottomSheetTextInput
      : isReducedMotionEnabled
        ? mask
          ? MaskedTextInput
          : TextInput
        : mask
          ? AnimatedMaskedTextInput
          : AnimatedTextInput;

    const containerStyles = isReducedMotionEnabled
      ? [styles.container]
      : [animatedStyle, styles.container];
    const inputStyles = isReducedMotionEnabled ? [styles.input] : [animatedStyle, styles.input];

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      if (isDisabled) return;
      inputRef.current?.focus();
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      inputRef.current?.blur();
      onBlur?.(e);
    };

    const handleClear = () => {
      inputRef.current?.clear();
      onClear?.();
    };

    const handleSubmit = async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (isDisabled) return;

      onSubmitEditing?.(e);

      if (!isFeedbackDisabled) {
        await impactAsync(ImpactFeedbackStyle.Light);
      }
    };

    const renderRightElement = () => {
      const shouldShowClearButton = typeof onClear === "function" || showClearButton;

      if (isFocused && shouldShowClearButton && value?.length) {
        return (
          <Pressable onPress={handleClear}>
            <Icon
              name="xmark.circle"
              size="xl"
              weight={500}
              color={iconColor}
              style={{ marginLeft: -theme.spacing.lg }}
            />
          </Pressable>
        );
      }

      return iconRight ? <Icon name={iconRight} size="xl" weight={500} color={iconColor} /> : null;
    };

    const renderError = () => {
      if (!error?.content) return null;

      return <Text content={error.content} variant="subhead" weight={500} color="error" />;
    };

    const renderHint = () => {
      if (hasError || !hint?.content) return null;

      if ("onPress" in hint) {
        return (
          <Button
            variant="ghost"
            size="xs"
            color="label2"
            role="primary"
            align="left"
            label={hint}
            onPress={hint.onPress}
          />
        );
      }

      return <Text content={hint.content} variant="footnote" color="label2" />;
    };

    return (
      <View animate style={containerStyles}>
        {label ? (
          <Text
            content={label.content}
            variant="headline"
            weight={500}
            color={hasError ? "error" : (label.color ?? "text")}
          />
        ) : null}
        <VStack gap="sm" style={styles.inputContainer}>
          <HStack justify="between" align="center">
            <HStack gap="xs" align="center">
              {iconLeft ? <Icon name={iconLeft} size="xl" weight={500} color={iconColor} /> : null}

              <InputComponent
                // @ts-expect-error lots of refs happening here
                ref={inputRef}
                editable={!isDisabled}
                autoFocus={shouldAutoFocus}
                placeholderTextColor={theme.colors.placeholderText}
                style={[inputStyles, props.style]}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onSubmitEditing={handleSubmit}
                submitBehavior="blurAndSubmit"
                {...props}
              />
            </HStack>

            {renderRightElement()}
          </HStack>
        </VStack>

        {hasError ? renderError() : renderHint()}
      </View>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.spacing.xs,
  },

  inputContainer: {
    variants: {
      hasError: {
        true: {
          borderColor: theme.colors.error,
        },
        false: {},
      },
      isDisabled: {
        true: {
          opacity: 0.75,
        },
        false: {
          opacity: 1,
        },
      },
      isFocused: {
        true: {},
        false: {},
      },
      shape: {
        rounded: {
          borderRadius: theme.radius.rounded,
          borderCurve: "continuous",
        },
        capsule: {
          borderRadius: theme.radius.capsule,
          borderCurve: "circular",
        },
        default: {
          borderRadius: theme.radius.rounded,
          borderCurve: "continuous",
        },
      },
      variant: {
        solid: {
          backgroundColor: theme.colors.inactive,
          borderColor: theme.colors.inactive,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
        outline: {
          borderWidth: 1.25,
          backgroundColor: theme.colors.background,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
        underline: {
          borderBottomWidth: 1.25,
          borderRadius: 0,
          borderBottomColor: theme.colors.inactive,
          paddingVertical: theme.spacing.sm,
        },
        default: {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.background,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        },
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        isFocused: true,
        styles: {
          backgroundColor: theme.colors.background2,
        },
      },
      {
        variant: "outline",
        isFocused: false,
        hasError: true,
        styles: {
          borderColor: theme.colors.error,
        },
      },
      {
        variant: "outline",
        isFocused: false,
        hasError: false,
        styles: {
          borderColor: theme.colors.inactive,
        },
      },
      {
        variant: "outline",
        isFocused: true,
        hasError: false,
        styles: {
          borderColor: theme.colors.text,
        },
      },
      {
        variant: "underline",
        isFocused: false,
        hasError: true,
        styles: {
          borderColor: theme.colors.error,
        },
      },
      {
        variant: "underline",
        isFocused: false,
        hasError: false,
        styles: {
          borderColor: theme.colors.inactive,
        },
      },
      {
        variant: "underline",
        isFocused: true,
        hasError: false,
        styles: {
          borderColor: theme.colors.text,
        },
      },
    ],
  },

  input: {
    flex: 1,
    color: theme.colors.text,
    marginTop: -theme.spacing.xxs,
    ...theme.typography.standard.headline,

    variants: {
      hasError: {
        true: {
          color: theme.colors.error,
        },
        false: {},
      },
      isFocused: {
        true: {
          color: theme.colors.text,
        },
        false: {},
      },
      isDisabled: {
        true: {
          opacity: 0.75,
        },
        false: {},
      },
    },
  },
}));
