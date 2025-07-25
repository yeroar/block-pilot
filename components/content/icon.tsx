import { Ionicons } from "@expo/vector-icons";
import { SymbolView, type SymbolViewProps, type SymbolWeight } from "expo-symbols";
import Animated, { useReducedMotion } from "react-native-reanimated";
import { UnistylesRuntime } from "react-native-unistyles";

const AnimatedSymbolView = Animated.createAnimatedComponent(SymbolView);

export type IconProps = Omit<SymbolViewProps, "size" | "weight"> & {
  color?: string;
  size?: number | string;
  weight?: number | string;
  useIonicons?: boolean;
  opacity?: number;
  animate?: boolean;
  useShadow?: boolean;
};

export function Icon({
  name,
  color = "text",
  opacity,
  size,
  weight,
  animate,
  useShadow,
  ...props
}: IconProps): React.JSX.Element {
  const isReducedMotion = useReducedMotion();

  const theme = UnistylesRuntime.getTheme();

  const potentialSizes = {
    ...theme.spacing,
    ...theme.fontSizes,
  };

  const sizeWithDefault = size ?? theme.spacing.lg;

  const themedColor = opacity
    ? theme.utils.toHex(
        theme.utils.adjustOpacity(theme.colors[color as keyof typeof theme.colors], opacity)
      )
    : theme.utils.toHex(theme.colors[color as keyof typeof theme.colors]);
  const themedSize =
    typeof size === "string"
      ? size in potentialSizes
        ? potentialSizes[size as keyof typeof potentialSizes]
        : sizeWithDefault
      : sizeWithDefault;

  const getWeight = () => {
    if (!weight) return "regular";
    if (typeof weight === "string") return weight;
    switch (weight) {
      case 400:
        return "regular";
      case 500:
        return "medium";
      case 600:
        return "semibold";
      case 700:
        return "bold";
      case 800:
        return "heavy";
      default:
        return "regular";
    }
  };

  const propsWithDefaults = {
    resizeMode: props?.resizeMode ?? "scaleAspectFit",
    ...props,
  };

  if (props.useIonicons) {
    return (
      <Ionicons
        name={name as keyof typeof Ionicons.glyphMap}
        color={themedColor}
        size={themedSize as number}
        {...propsWithDefaults}
      />
    );
  }

  const iconProps = {
    tintColor: themedColor,
    fallback: (
      <Ionicons
        name={name as keyof typeof Ionicons.glyphMap}
        color={themedColor}
        size={themedSize as number}
      />
    ),
    size: themedSize as number,
    name,
    weight: getWeight() as SymbolWeight,
    ...propsWithDefaults,
  };

  if (animate && !isReducedMotion) {
    return <AnimatedSymbolView {...iconProps} />;
  }

  return <SymbolView {...iconProps} />;
}
