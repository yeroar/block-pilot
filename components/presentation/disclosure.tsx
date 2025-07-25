import { useState } from "react";
import { StyleSheet, UnistylesRuntime } from "react-native-unistyles";
import type { Color } from "../../theme/color";
import { Icon } from "../content/icon";
import { Pressable } from "../controls/pressable";

export type DisclosureDirection = "vertical" | "horizontal";

export type DisclosureControlProps = {
  direction?: DisclosureDirection;
  onExpand?: () => void;
  onCollapse?: () => void;
  defaultState?: DisclosureState;
  variant?: "solid" | "outline" | "ghost" | "blur" | undefined;
  size?: string;
  color?: Color;
};

export type DisclosureState = "expanded" | "collapsed";

/**
 * useDisclosure - hook to manage the state of a disclosure component
 *
 * @param props - object args
 * @param props.onExpand - function to call when the disclosure is expanded
 * @param props.onCollapse - function to call when the disclosure is collapsed
 * @param props.defaultState - the default state of the disclosure
 */
export function useDisclosure({
  onExpand,
  onCollapse,
  defaultState = "collapsed",
}: {
  onExpand?: () => void;
  onCollapse?: () => void;
  defaultState?: DisclosureState;
}): [DisclosureState, () => void] {
  const [state, setState] = useState<DisclosureState>(defaultState);

  const onToggle = () => {
    if (state === "expanded") {
      setState("collapsed");
      onExpand?.();
    } else {
      setState("expanded");
      onCollapse?.();
    }
  };

  return [state, onToggle];
}

/**
 * DisclosureControl - renders a disclosure control component
 *
 * @param props - React props
 * @param props.direction - the direction of the disclosure
 * @param props.onExpand - function to call when the disclosure is expanded
 * @param props.onCollapse - function to call when the disclosure is collapsed
 * @param props.size - the size of the disclosure
 * @param props.defaultState - the default state of the disclosure
 * @param props.variant - the variant of the disclosure
 *
 * @see https://developer.apple.com/design/human-interface-guidelines/disclosure-controls
 */
export function DisclosureControl({
  direction = "vertical" as DisclosureDirection,
  onExpand,
  onCollapse,
  size = "md",
  defaultState = "collapsed",
  variant = "solid",
  color,
}: DisclosureControlProps) {
  const theme = UnistylesRuntime.getTheme();

  const [state, onToggle] = useDisclosure({
    onExpand,
    onCollapse,
    defaultState,
  });

  const expandedIcon = direction === "horizontal" ? "chevron.down" : "chevron.up";
  const collapsedIcon = direction === "horizontal" ? "chevron.right" : "chevron.down";
  const iconName = state === "expanded" ? expandedIcon : collapsedIcon;

  styles.useVariants({
    variant,
  });

  const iconProps = {
    color: (color ?? variant === "blur") ? "inverseText" : "text",
    size: theme.spacing[size as keyof typeof theme.spacing],
  };

  return (
    <Pressable onPress={onToggle} style={[styles.container, styles.containerSize(size)]}>
      <Icon name={iconName} {...iconProps} />
    </Pressable>
  );
}

const styles = StyleSheet.create((theme) => ({
  containerSize: (size) => {
    const nearestSpacingKey = theme.utils.getNearestSpacingKey(size, theme);
    const spaceIndex = Object.keys(theme.spacing).indexOf(nearestSpacingKey);
    const paddingKey = Object.keys(theme.spacing)[spaceIndex - 1];
    const padding = theme.spacing[paddingKey as keyof typeof theme.spacing];

    return {
      padding,
    };
  },

  container: {
    alignItems: "center",
    justifyContent: "center",

    variants: {
      variant: {
        solid: {
          backgroundColor: theme.colors.backgroundElevated,
        },
        outline: {
          borderWidth: 1,
          borderColor: theme.colors.backgroundElevated,
          borderRadius: theme.radius.button,
        },
        ghost: {
          backgroundColor: "transparent",
        },
        blur: {},
      },
    },
  },
}));
