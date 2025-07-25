import { forwardRef, type ReactNode } from "react";
import { ActivityIndicator } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useTheme } from "../../hooks";
import type { Color } from "../../theme/color";
import { Icon, type IconProps } from "../content/icon";
import { Text, type TextProps } from "../content/text";
import { HStack } from "../layout";
import { Pressable, type PressableProps, type PressableRef } from "./pressable";

type IconButtonProps = {
  label?: never;
  icon: IconProps;
  LeftElement?: never;
  RightElement?: never;
  shape?: "circle";
};

type TextButtonProps = {
  label: TextProps;
  icon?: never;
  LeftElement?: ReactNode;
  RightElement?: ReactNode;
  shape?: "circle" | "rounded" | "capsule" | undefined;
};

export type ButtonProps = (IconButtonProps | TextButtonProps) &
  Omit<PressableProps, "role"> & {
    isLoading?: boolean;
    variant?: "solid" | "outline" | "ghost" | "blur" | "link" | undefined;
    role?: "primary" | "destructive" | "cancel" | undefined;
    color?: Color;
    size?: "xs" | "sm" | "md" | "lg" | undefined;
    align?: "center" | "left" | "right" | undefined;
  };

/**
 * Button - renders a button component with support for haptics, accessibility, animations, and styling variants.
 *
 * @param props - React props
 * @param props.label - the label of the button
 * @param props.LeftElement - the left element of the button
 * @param props.RightElement - the right element of the button
 * @param props.isLoading - whether the button is loading
 * @param props.isDisabled - whether the button is disabled
 * @param props.icon - the icon of the button
 * @param props.variant - the variant of the button
 * @param props.color - the color of the button
 * @param props.role - the role of the button
 * @param props.shape - the shape of the button
 * @param props.size - the size of the button
 * @param props.align - the alignment of the button
 * @param props.children - the children of the button
 * @param props.style - the style of the button
 */
export const Button = forwardRef<PressableRef, ButtonProps>(
  (
    {
      label,
      LeftElement,
      RightElement,
      isLoading,
      isDisabled,
      icon,
      variant,
      color,
      role,
      shape,
      size = "md",
      align = "center",
      children,
      ...props
    },
    ref
  ) => {
    const theme = useTheme({ animate: props.animate });

    styles.useVariants({
      isDisabled,
      isLoading,
      role,
      variant,
      shape,
      align,
    });

    const getTextColor = (): Color => {
      switch (variant) {
        case "blur":
          return "inverseText";

        case "outline":
        case "ghost":
        case "link":
          return role === "cancel" || role === "destructive" ? "error" : (color ?? "link");
        default:
          return "white";
      }
    };

    const getTextSize = () => {
      switch (size) {
        case "sm":
          return "subhead";

        case "xs":
          return "footnote";
        default:
          return "headline";
      }
    };

    const labelPropsWithDefaults: TextProps = {
      weight: label?.weight ?? 600,
      variant: label?.size ?? getTextSize(),
      align: label?.align ?? "center",
      color: getTextColor(),
      ...label,
      ...(variant === "link" && {
        size: label?.size ?? "subhead",
        lineHeight: 0,
        marginVertical: -theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors[getTextColor() as keyof typeof theme.colors],
      }),
    };

    const renderIcon = (icon: IconProps) => {
      const { color, ...rest } = icon;
      const colorWithDefault = (color ?? variant === "blur") ? "inverseText" : "text";

      return <Icon color={colorWithDefault} {...rest} />;
    };

    const renderInnerElement = () => {
      if (children) return children;

      if (label) {
        return (
          <HStack align="center" gap="sm">
            {isLoading ? <ActivityIndicator /> : LeftElement}

            {label ? <Text {...labelPropsWithDefaults} /> : children}

            {RightElement}
          </HStack>
        );
      }

      if (icon) {
        return renderIcon(icon);
      }

      return null;
    };

    return (
      <Pressable
        ref={ref}
        accessibilityRole="button"
        isDisabled={isDisabled}
        isLoading={isLoading}
        style={[styles.root(color), props.style]}
        {...props}
      >
        {renderInnerElement()}
      </Pressable>
    );
  }
);

const styles = StyleSheet.create((theme) => ({
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    width: "100%",
    paddingVertical: theme.spacing.md,

    variants: {
      isDisabled: {
        true: {
          opacity: 0.75,
        },
        false: {},
      },
      isLoading: {
        true: {
          opacity: 0.75,
        },
        false: {},
      },
      shape: {
        circle: {
          borderRadius: theme.radius.circle,
          borderCurve: "circular",
        },
        rounded: {
          borderRadius: theme.radius.button,
          borderCurve: "continuous",
        },
        capsule: {
          borderRadius: theme.radius.capsule,
          borderCurve: "circular",
        },
        default: {
          borderRadius: theme.radius.button,
          borderCurve: "continuous",
        },
      },
      align: {
        center: {
          justifyContent: "center",
        },
        left: {
          justifyContent: "flex-start",
        },
        right: {
          justifyContent: "flex-end",
        },
        default: {
          justifyContent: "center",
        },
      },
    },
  },

  root: (color) => ({
    flexDirection: "row",
    alignItems: "center",
    gap: theme.spacing.xs,
    width: "100%",

    variants: {
      isDisabled: {
        true: {
          opacity: 0.75,
        },
        false: {},
      },
      isLoading: {
        true: {
          opacity: 0.75,
        },
        false: {},
      },

      size: {
        xs: {
          paddingVertical: theme.spacing.xs,
        },
        sm: {
          paddingVertical: theme.spacing.sm,
        },
        md: {
          paddingVertical: theme.spacing.md,
        },
        lg: {
          paddingVertical: theme.spacing.lg,
        },
        default: {
          paddingVertical: theme.spacing.md,
        },
      },

      align: {
        center: {
          justifyContent: "center",
        },
        left: {
          justifyContent: "flex-start",
        },
        right: {
          justifyContent: "flex-end",
        },
        default: {
          justifyContent: "center",
        },
      },

      variant: {
        blur: {
          backgroundColor: theme.colors.clear,
        },
        solid: {
          backgroundColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.backgroundElevated,
        },
        outline: {
          backgroundColor: theme.colors.clear,
          borderWidth: 1.5,
        },
        ghost: {
          width: "auto",
          backgroundColor: theme.colors.clear,
          borderWidth: 0,
          paddingVertical: 0,
        },
        link: {
          width: "auto",
          paddingVertical: 0,
          paddingHorizontal: 0,
          borderRadius: 0,
        },
        default: {
          backgroundColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.backgroundElevated,
        },
      },

      role: {
        primary: {},
        destructive: {},
        cancel: {},
        default: {},
      },

      shape: {
        circle: {
          width: "auto",
          padding: theme.spacing.md,
          borderRadius: theme.radius.circle,
        },
        rounded: {
          borderRadius: theme.radius.button,
          borderCurve: "continuous",
        },
        capsule: {
          borderRadius: theme.radius.capsule,
          borderCurve: "circular",
        },
        default: {
          borderRadius: theme.radius.button,
          borderCurve: "continuous",
        },
      },
    },
    compoundVariants: [
      {
        variant: "solid",
        role: "primary",
        styles: {
          backgroundColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.link,
          borderColor: color ? theme.colors[color as keyof typeof theme.colors] : theme.colors.link,
        },
      },
      {
        variant: "solid",
        role: "cancel",
        styles: {
          backgroundColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.backgroundElevated,
          borderColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.backgroundElevated,
        },
      },
      {
        variant: "solid",
        role: "destructive",
        styles: {
          backgroundColor: theme.colors.error,
          borderColor: theme.colors.error,
        },
      },
      {
        variant: "outline",
        role: "primary",
        styles: {
          borderColor: color ? theme.colors[color as keyof typeof theme.colors] : theme.colors.link,
        },
      },
      {
        variant: "outline",
        role: "cancel",
        styles: {
          borderColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.error,
        },
      },
      {
        variant: "outline",
        role: "destructive",
        styles: {
          borderColor: theme.colors.error,
        },
      },
      {
        variant: "link",
        role: "primary",
        styles: {
          borderBottomColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.link,
          width: "auto",
          borderRadius: 0,
        },
      },
      {
        variant: "link",
        role: "cancel",
        styles: {
          borderBottomColor: color
            ? theme.colors[color as keyof typeof theme.colors]
            : theme.colors.backgroundElevated,
          width: "auto",
          borderRadius: 0,
        },
      },
      {
        variant: "link",
        role: "destructive",
        styles: {
          borderBottomColor: theme.colors.error,
          width: "auto",
          borderRadius: 0,
        },
      },
    ],
  }),
}));
