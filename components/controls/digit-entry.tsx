import { randomUUID } from "expo-crypto";
import { forwardRef } from "react";
import {
  Platform,
  type StyleProp,
  TextInput,
  type TextInputProps,
  type ViewStyle,
} from "react-native";
import { StyleSheet } from "react-native-unistyles";
import type { Spacing } from "../../theme/size";
import { Text, type TextProps } from "../content/text";
import { HStack } from "../layout";
import { View } from "../layout/view";
import { MaskSymbol } from "./util/mask-symbol";
import { useDigitCell } from "./util/use-digit-cell";
import { useInputHandle } from "./util/use-input-handle";

type NonNegotiableTextInputProps = Omit<
  TextInputProps,
  | "maxLength"
  | "caretHidden"
  | "disableFullscreenUI"
  | "spellCheck"
  | "autoCorrect"
  | "clearButtonMode"
  | "onPressOut"
  | "style"
>;

export type DigitEntryProps = NonNegotiableTextInputProps & {
  isDisabled?: boolean;
  onClear?: () => void;
  isFeedbackDisabled?: boolean;
  shouldAutoFocus?: boolean;
  cellCount: number;
  containerStyle?: StyleProp<ViewStyle>;
  spacing?: Spacing;
  variant?: "solid" | "outline" | "blur" | "underline" | "raised" | undefined;
  label?: TextProps;
  error?: TextProps;
  hasError?: boolean;
  hint?: TextProps;
  cellProps?: TextProps;
  useMask?: boolean;
  isOTP?: boolean;
};

/**
 * DigitEntry - renders a digit entry component with support for haptics, accessibility, animations, and styling variants. typically used for OTP
 *
 * @param props - React props
 * @param props.isDisabled - whether the digit entry is disabled
 * @param props.onClear - the function to call when the digit entry is cleared
 * @param props.isFeedbackDisabled - whether the digit entry should disable haptics
 * @param props.shouldAutoFocus - whether the digit entry should automatically focus when the component is mounted
 * @param props.cellCount - the number of cells in the digit entry
 * @param props.value - the value of the digit entry
 * @param props.containerStyle - the style of the digit entry container
 * @param props.spacing - the spacing of the digit entry
 * @param props.variant - the variant of the digit entry
 * @param props.label - the label of the digit entry
 * @param props.error - the error of the digit entry
 * @param props.hasError - whether the digit entry has an error
 * @param props.hint - the hint of the digit entry
 * @param props.cellProps - the props of the cell
 * @param props.useMask - whether the digit entry should use a mask
 * @param props.isOTP - whether the digit entry is an OTP
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/digit-entry-views
 */
export const DigitEntry = forwardRef<TextInput, DigitEntryProps>(
  (
    {
      isDisabled,
      onClear,
      isFeedbackDisabled,
      shouldAutoFocus,
      cellCount,
      value,
      containerStyle,
      spacing,
      variant,
      label,
      error,
      hasError,
      hint,
      cellProps,
      useMask,
      isOTP,
      ...props
    },
    ref
  ) => {
    const { inputRef, isFocused } = useInputHandle(ref, {
      isDisabled,
      onClear,
      isFeedbackDisabled,
      shouldAutoFocus,
    });

    const { onCellLayout, clearCodeByCoords } = useDigitCell(value ?? "", cellCount);

    const parseSymbols = (): string[] => {
      const symbols = new Array<string>(cellCount);
      for (let i = 0; i < cellCount; i++) {
        symbols[i] = value?.[i] ?? "";
      }
      return symbols;
    };
    const symbols = parseSymbols();

    const cells = symbols.map((symbol, index) => {
      const isFirstEmpty = symbol.indexOf("") === index;
      const isCellFocused = isFocused && isFirstEmpty;

      styles.useVariants({
        isFocused: isCellFocused,
        hasValue: !!symbol.length,
        isDisabled,
        variant,
      });

      const textCellProps = {
        ...cellProps,
        size: cellProps?.size ?? "title2",
        weight: cellProps?.weight ?? 600,
        color: cellProps?.color ?? "inverse",
        align: cellProps?.align ?? "center",
      };

      const renderSymbol = () => {
        if (useMask) {
          return <MaskSymbol isLast={index === cellCount - 1}>{symbol}</MaskSymbol>;
        }

        return symbol;
      };

      return (
        <View style={styles.cell} key={randomUUID()}>
          <Text onLayout={onCellLayout(index)} {...textCellProps}>
            {renderSymbol()}
          </Text>
        </View>
      );
    });

    const propsWithDefaults: TextInputProps = {
      caretHidden: true,
      disableFullscreenUI: true,
      spellCheck: false,
      autoCorrect: false,
      clearButtonMode: "never",
      autoCapitalize: "characters",
      maxLength: cellCount,
      onPressOut: clearCodeByCoords,
      style: {
        ...StyleSheet.absoluteFillObject,
        opacity: 0.015,
        fontSize: 1,
      },
      ...(isOTP && {
        keyboardType: "number-pad",
        returnKeyType: "done",
        textContentType: "oneTimeCode",
        autoComplete: Platform.OS === "android" ? "sms-otp" : "one-time-code",
      }),
      ...props,
    };

    return (
      <HStack gap="sm">
        {cells}
        <TextInput ref={inputRef} {...propsWithDefaults} />
      </HStack>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  cell: {
    padding: theme.spacing.sm,
    borderRadius: theme.radius.button,
    minWidth: 45,
    minHeight: 45,
    alignItems: "center",
    justifyContent: "center",

    variants: {
      isDisabled: {
        true: {
          opacity: 0.5,
        },
        false: {
          opacity: 1,
        },
      },

      isFocused: {
        true: {},
        false: {},
      },

      hasValue: {
        true: {},
        false: {},
      },

      variant: {
        blur: {},
        solid: {
          backgroundColor: theme.colors.backgroundElevated,
        },
        outline: {
          borderWidth: 1.25,
          borderColor: theme.colors.fill,
        },
        underline: {
          borderBottomWidth: 1,
          borderColor: theme.colors.fill,
          borderRadius: 0,
        },
        raised: {
          shadowColor: theme.colors.backgroundElevated,
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.25,
        },
      },
    },
    compoundVariants: [
      {
        isFocused: true,
        variant: "outline",
        styles: {
          borderColor: theme.colors.text,
        },
      },
      {
        hasValue: true,
        variant: "outline",
        styles: {
          borderColor: theme.colors.text,
        },
      },
      {
        isFocused: true,
        variant: "underline",
        styles: {
          borderColor: theme.colors.text,
        },
      },
      {
        hasValue: true,
        variant: "underline",
        styles: {
          borderColor: theme.colors.text,
        },
      },
      {
        isFocused: true,
        variant: "raised",
        styles: {
          backgroundColor: theme.colors.backgroundElevated,
        },
      },
      {
        hasValue: true,
        variant: "raised",
        styles: {
          shadowOpacity: 0,
        },
      },
    ],
  },
}));
