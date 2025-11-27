import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
} from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { ChevronRightIcon } from "../assets/BlueSkyIcons/ChevronRightIcon";
import {
  BorderSecondary,
  FacePrimary,
  FaceAccent,
  FaceTertiary,
  SpacingM4,
  SpacingM3,
  BorderRadiusSm,
  SpacingM10,
  BorderRadiusDefault,
  SpacingM5,
} from "../../generated-tokens/tokens";

// Clear type definition with better naming
type GiftCardVariant = "outlined" | "elevated";

export interface GiftCardProps {
  variant?: GiftCardVariant;
  title?: string;
  subtitle?: string;
  logoUri?: string;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
  meta?: string; // third descriptive line e.g. "Online and in-store"
  accentPercent?: number; // dynamic percent replacement for subtitle template
  figmaNodeId?: string; // optional data-node-id for mapping
}

// Constants for logo sizes - easier to maintain
const LOGO_SIZES = {
  outlined: SpacingM10, // closer to ~64px from design (66.6)
  elevated: SpacingM10,
} as const;

// Local static logo map (fallbacks). Add more entries as needed.
const LOCAL_LOGOS: Record<string, any> = {
  // existing entries
  Airbnb: require("../assets/logoABNB.png"),
  // add Starbucks / star logo
  Starbucks: require("../assets/logoStar.png"),
  // new merchants
  Walgreens: require("../assets/Walgreens.png"),
  Walmart: require("../assets/Wallmart.png"), // project file named Wallmart.png
  Wallmart: require("../assets/Wallmart.png"), // alias in case title varies
  Wawa: require("../assets/Wawa.png"),
  Wayfair: require("../assets/Wayfair.png"),
  WHBM: require("../assets/WHBM.png"),
  "Wine.com": require("../assets/Wine.com.png"),
};

/**
 * GiftCard Component
 *
 * @param variant - "outlined" renders with bottom border, "elevated" renders with full border
 * @param title - Main card title (e.g., merchant name)
 * @param subtitle - Secondary text (e.g., rewards info)
 * @param logoUri - Optional logo image URL
 * @param onPress - Optional press handler (makes card touchable)
 */
export default function GiftCard({
  variant = "outlined",
  title = "Merchant",
  subtitle = "Up to {n}% sats back",
  meta = "Online and in-store",
  accentPercent,
  logoUri,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
  figmaNodeId,
}: GiftCardProps) {
  const isElevated = variant === "elevated";
  const isOutlined = variant === "outlined";

  // Dynamic logo sizing based on variant
  const logoSize = LOGO_SIZES[variant];
  const logoInlineStyle = {
    width: logoSize,
    height: logoSize,
    borderRadius: BorderRadiusSm,
  };

  // Render appropriate icon based on variant
  const renderTrailingIcon = () => (
    <ChevronRightIcon width={20} height={20} color={FaceTertiary} />
  );

  // Render logo with fallback placeholder / local asset map
  const renderLogo = () => {
    // prefer explicit remote URL when provided
    if (logoUri) {
      return <Image source={{ uri: logoUri }} style={styles.logo} />;
    }

    // fallback to a local asset when we have a mapping for this title
    if (title && LOCAL_LOGOS[title]) {
      return <Image source={LOCAL_LOGOS[title]} style={styles.logo} />;
    }

    // final fallback: placeholder block
    return <View style={styles.logoPlaceholder} />;
  };

  const Container = onPress ? TouchableOpacity : View;

  const resolvedSubtitle = subtitle.replace(
    "{n}",
    accentPercent != null ? String(accentPercent) : "5"
  );

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.root,
        style,
        variant === "elevated" && styles.elevatedRoot,
      ]}
      {...(figmaNodeId
        ? {
            accessibilityLabel: title,
            testID: figmaNodeId,
            "data-node-id": figmaNodeId,
          }
        : {})}
    >
      <View
        style={[
          styles.logoWrap,
          { width: LOGO_SIZES[variant], height: LOGO_SIZES[variant] },
        ]}
      >
        {renderLogo()}
      </View>
      <View style={styles.content}>
        <View style={styles.left}>
          <FoldText type="body-md-bold-v2" style={[styles.title, titleStyle]}>
            {title}
          </FoldText>
          <FoldText
            type="body-md-bold-v2"
            style={[styles.subtitle, subtitleStyle]}
          >
            {resolvedSubtitle}
          </FoldText>
          <FoldText type="body-md-bold-v2" style={styles.meta}>
            {meta}
          </FoldText>
        </View>
        <View style={styles.trailing}>{renderTrailingIcon()}</View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  root: {
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    paddingVertical: SpacingM4,
    // Horizontal padding handled by logo + content gap
  },
  elevatedRoot: {
    borderWidth: 1,
    borderColor: BorderSecondary,
  },
  logoWrap: {
    overflow: "hidden",
    marginRight: SpacingM3, // gap ~12px between logo & text
    backgroundColor: FaceAccent, // logo background matches design sample brand color
    borderRadius: 12, // design radius
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  logoPlaceholder: {
    width: "100%",
    height: "100%",
    backgroundColor: BorderSecondary,
  },
  content: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: SpacingM5,
  },
  left: {
    flex: 1,
    justifyContent: "center",
    gap: 0,
  },
  title: { color: FacePrimary },
  subtitle: { color: FaceAccent, marginTop: 0 },
  meta: { color: FaceTertiary, marginTop: 0 },
  trailing: { alignItems: "center", justifyContent: "center" },
});
