import { createElement, forwardRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Text as RNText, type TextProps as RNTextProps } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useAccessibilityAutoFocus, useBoldText } from "../../hooks";
import { type MaybeTranslatedContent, useTranslatedContent } from "../../i18n";
import type { Color, FontSize } from "../../theme";

/**
 * NativeText - renders the underlying native text component, falls back to standard when any function props are provided.
 * function props require the event handling mechanisms that are provided by the standard RN text component.
 */
const NativeText = forwardRef<RNText, RNTextProps>((props, ref): React.JSX.Element => {
  const hasAnyFnProp = Object.values(props).some((value) => typeof value === "function");

  if (hasAnyFnProp) {
    return <RNText {...props} ref={ref} />;
  }

  return createElement("RCTText", { ...props, ref });
});

export type TextProps = RNTextProps & {
  size?: FontSize;
  weight?: 400 | 500 | 600 | 700 | 800;
  color?: Color | "inverse" | undefined;
  variant?: FontSize;
  italicize?: boolean;
  rounded?: boolean;
  align?: "left" | "center" | "right" | "justify" | undefined;
  shouldAutoFocus?: boolean;
  content?: MaybeTranslatedContent;
  accessibilityLabel?: MaybeTranslatedContent;
};

/**
 * Text - renders a text component that handles accessibility, typography variants, and translated content
 *
 * @param props - React props
 * @param props.shouldAutoFocus - whether to automatically focus the text input when the component is mounted
 * @param props.size - the size of the text
 * @param props.weight - the weight of the text
 * @param props.variant - the variant of the text
 * @param props.color - the color of the text
 * @param props.italicize - whether to italicize the text
 * @param props.rounded - whether to use rounded font
 * @param props.align - the alignment of the text
 * @param props.children - the children of the text
 * @param props.accessibilityLabel - the accessibility label of the text
 * @param props.content - the content of the text, can be a string, translation key, or translation object
 */
export const Text = forwardRef<RNText, TextProps>(
  (
    {
      shouldAutoFocus,
      size,
      weight,
      variant = "body",
      color = "text",
      italicize,
      rounded = false,
      align,
      children,
      accessibilityLabel,
      content,
      ...props
    },
    ref
  ) => {
    const isBoldTextEnabled = useBoldText();

    styles.useVariants({
      size,
      variant,
      weight,
      italicize,
      align,
      isBoldTextEnabled,
    });

    const { t, i18n } = useTranslation();

    const translatedAccessibilityLabel = useTranslatedContent(accessibilityLabel);

    const autoFocusRef = useAccessibilityAutoFocus(shouldAutoFocus ?? size === "largeTitle");

    const handleRef = (node: RNText): void => {
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        (ref as { current: RNText | null }).current = node;
      }

      if (autoFocusRef) {
        (autoFocusRef as { current: RNText | null }).current = node;
      }
    };

    const propsWithDefaults: Partial<RNTextProps> = {
      accessibilityLanguage: i18n.language,
      accessibilityLabel: translatedAccessibilityLabel as string,
      accessibilityRole: "text" as const,
      // ref: https://developer.apple.com/design/human-interface-guidelines/typography#Supporting-Dynamic-Type
      maxFontSizeMultiplier: size?.toLowerCase().includes("title") ? 1.6 : 2.2,
      dynamicTypeRamp: size === "subhead" ? "subheadline" : size,
      ...props,
    };

    const renderText = () => {
      // always render children if they're passed
      if (children) return children;

      if (typeof content === "object") {
        // can't render object content directly without a key
        if (!("key" in content)) {
          console.warn("No key found in content", content);
          return content;
        }

        // if no options are passed, just return the translated key
        if (!content.options) {
          return t(content.key);
        }

        // if components are passed, we need to render the content differently
        if (typeof content.options === "object") {
          if ("components" in content.options) {
            const { components, ...rest } = content.options;

            // ref: https://react.i18next.com/latest/trans-component
            return (
              // @ts-expect-error - default value can be string or unknown
              <Trans
                i18nKey={content.key as string}
                components={{
                  // since react native doesn't support <span> or <br/>, this is how we can render a line break in content
                  Break: <Text>{"\n"}</Text>,
                  ...(components ?? {}),
                }}
                {...rest}
              />
            );
          }

          // if no components are passed, just return the translated key with the options
          return t(content.key, content.options);
        }
      }

      return t(content as string);
    };

    return (
      <NativeText
        ref={handleRef}
        style={[styles.root(color, rounded), props.style ?? {}]}
        {...propsWithDefaults}
      >
        {renderText()}
      </NativeText>
    );
  }
);

const styles = StyleSheet.create((theme, rt) => ({
  root: (color = "text", rounded = false) => {
    const fontType = rounded ? "rounded" : "standard";

    return {
      color:
        color === "inverse"
          ? rt.themeName === "light"
            ? "darkText"
            : "lightText"
          : theme.colors[color as keyof typeof theme.colors],

      variants: {
        isBoldTextEnabled: {
          true: {},
          false: {},
        },

        // italicized font
        italicize: {
          true: {},
          false: {},
        },

        weight: {
          400: {
            fontFamily: theme.fonts[fontType].regular,
          },
          500: {
            fontFamily: theme.fonts[fontType].medium,
          },
          600: {
            fontFamily: theme.fonts[fontType].semibold,
          },
          700: {
            fontFamily: theme.fonts[fontType].bold,
          },
          800: {
            fontFamily: theme.fonts[fontType].heavy,
          },
        },

        size: {
          largeTitle: {
            fontSize: theme.fontSizes.largeTitle,
          },
          title1: {
            fontSize: theme.fontSizes.title1,
          },
          title2: {
            fontSize: theme.fontSizes.title2,
          },
          title3: {
            fontSize: theme.fontSizes.title3,
          },
          headline: {
            fontSize: theme.fontSizes.headline,
          },
          body: {
            fontSize: theme.fontSizes.body,
          },
          callout: {
            fontSize: theme.fontSizes.callout,
          },
          subhead: {
            fontSize: theme.fontSizes.subhead,
          },
          footnote: {
            fontSize: theme.fontSizes.footnote,
          },
          caption1: {
            fontSize: theme.fontSizes.caption1,
          },
          caption2: {
            fontSize: theme.fontSizes.caption2,
          },
        },

        variant: {
          largeTitle: theme.typography[fontType].largeTitle,
          title1: theme.typography[fontType].title1,
          title2: theme.typography[fontType].title2,
          title3: theme.typography[fontType].title3,
          headline: theme.typography[fontType].headline,
          body: theme.typography[fontType].body,
          callout: theme.typography[fontType].callout,
          subhead: theme.typography[fontType].subhead,
          footnote: theme.typography[fontType].footnote,
          caption1: theme.typography[fontType].caption1,
          caption2: theme.typography[fontType].caption2,
          default: theme.typography[fontType].body,
        },

        align: {
          left: {
            textAlign: "left",
          },
          center: {
            textAlign: "center",
          },
          right: {
            textAlign: "right",
          },
          justify: {
            textAlign: "justify",
          },
          default: {
            textAlign: "left",
          },
        },
      },
      compoundVariants: [
        // bold text accessibility enabled
        {
          isBoldTextEnabled: true,
          italicize: false,
          styles: {
            fontFamily: theme.fonts.standard.bold,
          },
        },
        {
          isBoldTextEnabled: true,
          italicize: true,
          styles: {
            fontFamily: theme.fonts.standard.boldItalic,
          },
        },
        {
          isBoldTextEnabled: true,
          rounded: true,
          styles: {
            fontFamily: theme.fonts.rounded.bold,
          },
        },
      ],
    };
  },
}));
