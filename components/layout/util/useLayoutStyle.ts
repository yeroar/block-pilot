import type { StyleProp, ViewStyle } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useTheme } from "../../../hooks";
import type { Color, Radius, Spacing } from "../../../theme";

/**
 * useLayoutStyle - hook to generate basic layout styles as props, since these are used 99.99% of the time when using a view component.
 */

export type LayoutStyleProps = {
  readonly align?: "left" | "center" | "right" | "stretch" | "baseline" | undefined;
  readonly justify?: "top" | "center" | "bottom" | "between" | "around" | "evenly" | undefined;
  readonly gap?: Spacing | number;
  readonly rowGap?: Spacing | number;
  readonly columnGap?: Spacing | number;
  readonly padding?: Spacing | number;
  readonly paddingX?: Spacing | number;
  readonly paddingY?: Spacing | number;
  readonly paddingLeft?: Spacing | number;
  readonly paddingRight?: Spacing | number;
  readonly paddingTop?: Spacing | number;
  readonly paddingBottom?: Spacing | number;
  readonly margin?: Spacing | number;
  readonly marginX?: Spacing | number;
  readonly marginY?: Spacing | number;
  readonly marginLeft?: Spacing | number;
  readonly marginRight?: Spacing | number;
  readonly marginTop?: Spacing | number;
  readonly marginBottom?: Spacing;
  readonly direction?: "row" | "column";
  readonly reverse?: boolean;
  readonly wrap?: boolean;
  readonly flex?: number;
  readonly grow?: number;
  readonly shrink?: number;
  readonly basis?:
  | "content"
  | "fluid"
  | "1/5"
  | "1/4"
  | "1/3"
  | "2/5"
  | "1/2"
  | "3/5"
  | "2/3"
  | "3/4"
  | "4/5"
  | undefined;
  readonly backgroundColor?: Color;
  readonly backgroundColorOpacity?: number;
  readonly borderRadius?: Radius | number;
  readonly borderTopLeftRadius?: Radius | number;
  readonly borderTopRightRadius?: Radius | number;
  readonly borderBottomLeftRadius?: Radius | number;
  readonly borderBottomRightRadius?: Radius | number;
  readonly borderWidth?: number;
  readonly borderTopWidth?: number;
  readonly borderRightWidth?: number;
  readonly borderBottomWidth?: number;
  readonly borderLeftWidth?: number;
  readonly borderColor?: Color;
  readonly borderTopColor?: Color;
  readonly borderRightColor?: Color;
  readonly borderBottomColor?: Color;
  readonly borderLeftColor?: Color;
  readonly width?: number | string;
  readonly height?: number | string;
  readonly size?: number | string;
  readonly overflow?: "visible" | "hidden" | "scroll";
  readonly opacity?: number;
};

export function useLayoutStyle(
  props: LayoutStyleProps & { animate?: boolean }
): StyleProp<ViewStyle> {
  const theme = useTheme({ animate: props.animate });

  styles.useVariants({
    align: props.align,
    justify: props.justify,
    direction: props.direction,
    wrap: props.wrap,
    basis: props.basis,
  });

  // if the prop value passed is a valid theme value, parse it
  // otherwise return the raw value
  const parseThemeValue = (value: string | number, key?: string) => {
    if (key) {
      if (key in theme) {
        return theme[key as keyof typeof theme][value as keyof (typeof theme)[keyof typeof theme]];
      }
      console.warn(`[useLayoutStyle] - ${key} is not a valid theme key`);
    }

    return value;
  };

  // parse background color and opacity separately since we use a utility fn for it
  const parseBackgroundColor = () => {
    if (props.backgroundColor) {
      const parsedBackgroundColor = props.backgroundColor.startsWith("#")
        ? theme.utils.toRGBA(props.backgroundColor)
        : (parseThemeValue(props.backgroundColor, "colors") as string);

      const backgroundColor = props.backgroundColorOpacity
        ? theme.utils.adjustOpacity(parsedBackgroundColor, props.backgroundColorOpacity)
        : parsedBackgroundColor;

      return {
        backgroundColor,
      };
    }

    return {};
  };

  // Only allow valid width/height values: number, 'auto', or percentage string
  const parseDimension = (value: unknown): number | "auto" | `${number}%` | undefined => {
    if (typeof value === "number") return value;
    if (value === "auto") return "auto";
    if (typeof value === "string" && /^\d+%$/.test(value)) return value as `${number}%`;
    return undefined;
  };

  // shorthand for parsing any defined style prop
  // omit the variants since they are handled by the styles.useVariants call above
  // omit backgroundColor and backgroundColorOpacity since they are handled by the parseBackgroundColor function above
  const parseProp = (
    propName: keyof Omit<
      LayoutStyleProps,
      | "reverse"
      | "justify"
      | "direction"
      | "wrap"
      | "basis"
      | "backgroundColor"
      | "backgroundColorOpacity"
    >,
    themeKey?: string
  ) => {
    return props[propName] ? { [propName]: parseThemeValue(props[propName], themeKey) } : {};
  };

  const styleObj = {
    ...parseProp("gap", "spacing"),
    ...parseProp("rowGap", "spacing"),
    ...parseProp("columnGap", "spacing"),

    ...parseProp("padding", "spacing"),
    ...parseProp("paddingX", "spacing"),
    ...parseProp("paddingY", "spacing"),
    ...parseProp("paddingLeft", "spacing"),
    ...parseProp("paddingRight", "spacing"),
    ...parseProp("paddingTop", "spacing"),
    ...parseProp("paddingBottom", "spacing"),

    ...parseProp("margin", "spacing"),
    ...parseProp("marginX", "spacing"),
    ...parseProp("marginY", "spacing"),
    ...parseProp("marginLeft", "spacing"),
    ...parseProp("marginRight", "spacing"),
    ...parseProp("marginTop", "spacing"),
    ...parseProp("marginBottom", "spacing"),

    ...parseBackgroundColor(),

    ...parseProp("borderRadius", "radius"),
    ...parseProp("borderTopLeftRadius", "radius"),
    ...parseProp("borderTopRightRadius", "radius"),
    ...parseProp("borderBottomLeftRadius", "radius"),
    ...parseProp("borderBottomRightRadius", "radius"),

    ...parseProp("borderWidth"),
    ...parseProp("borderTopWidth"),
    ...parseProp("borderRightWidth"),
    ...parseProp("borderBottomWidth"),
    ...parseProp("borderLeftWidth"),

    ...parseProp("borderColor", "colors"),
    ...parseProp("borderTopColor", "colors"),
    ...parseProp("borderRightColor", "colors"),
    ...parseProp("borderBottomColor", "colors"),
    ...parseProp("borderLeftColor", "colors"),

    ...(props.size
      ? { width: parseDimension(props.size), height: parseDimension(props.size) }
      : {}),
    ...(props.width !== undefined ? { width: parseDimension(props.width) } : {}),
    ...(props.height !== undefined ? { height: parseDimension(props.height) } : {}),

    ...parseProp("overflow"),
    ...parseProp("flex"),
    ...parseProp("opacity"),
  };

  return [styles.root, styleObj];
}

export function asAnimatedStyle<T>(style: T): T {
  return style;
}

const styles = StyleSheet.create(() => ({
  root: {
    variants: {
      isReverse: {
        true: {},
        false: {},
      },

      align: {
        left: {
          alignItems: "flex-start",
        },
        center: {
          alignItems: "center",
        },
        right: {
          alignItems: "flex-end",
        },
        stretch: {
          alignItems: "stretch",
        },
        baseline: {
          alignItems: "baseline",
        },
      },

      justify: {
        top: {
          justifyContent: "flex-start",
        },
        bottom: {
          justifyContent: "flex-end",
        },
        center: {
          justifyContent: "center",
        },
        between: {
          justifyContent: "space-between",
        },
        around: {
          justifyContent: "space-around",
        },
        evenly: {
          justifyContent: "space-evenly",
        },
      },

      direction: {
        row: {
          flexDirection: "row",
        },
        column: {
          flexDirection: "column",
        },
      },

      wrap: {
        true: {
          flexWrap: "wrap",
        },
        false: {
          flexWrap: "nowrap",
        },
      },

      basis: {
        content: {
          flex: 0,
          flexBasis: "auto",
        },
        fluid: {
          flexGrow: 1,
          flexShrink: 0,
          flexBasis: "auto",
        },
        "1/5": {
          flexBasis: "20%",
        },
        "1/4": {
          flexBasis: "25%",
        },
        "1/3": {
          flexBasis: "33.33333333333333%",
        },
        "2/5": {
          flexBasis: "40%",
        },
        "1/2": {
          flexBasis: "50%",
        },
        "3/5": {
          flexBasis: "60%",
        },
        "2/3": {
          flexBasis: "66.66666666666666%",
        },
        "3/4": {
          flexBasis: "75%",
        },
        "4/5": {
          flexBasis: "80%",
        },
      },
    },

    compoundVariants: [
      {
        isReverse: true,
        direction: "row",
        styles: {
          flexDirection: "row-reverse",
        },
      },
      {
        isReverse: false,
        direction: "row",
        styles: {
          flexDirection: "row",
        },
      },
      {
        isReverse: true,
        direction: "column",
        styles: {
          flexDirection: "column-reverse",
        },
      },
      {
        isReverse: false,
        direction: "column",
        styles: {
          flexDirection: "column",
        },
      },
      {
        wrap: true,
        isReverse: true,
        styles: {
          flexWrap: "wrap-reverse",
        },
      },
    ],
  },
}));
