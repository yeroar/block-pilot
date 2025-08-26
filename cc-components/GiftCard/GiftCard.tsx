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
import { StarIcon } from "../assets/BlueSkyIcons/StarIcon";
import {
  LayerSecondary,
  BorderSecondary,
  FacePrimary,
  FaceAccent,
  SpacingM4,
  SpacingM3,
  SpacingM5,
  SpacingM8,
  BorderRadiusSm,
  SpacingM10,
  BorderRadiusDefault,
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
}

// Constants for logo sizes - easier to maintain
const LOGO_SIZES = {
  outlined: SpacingM8,
  elevated: SpacingM10,
} as const;

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
  subtitle = "5% sats back",
  logoUri,
  onPress,
  style,
  titleStyle,
  subtitleStyle,
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
  const renderTrailingIcon = () => {
    if (isElevated) {
      return <StarIcon width={20} height={20} color={FaceAccent} />;
    }
    return <ChevronRightIcon width={20} height={20} color={FaceAccent} />;
  };

  // Render logo with fallback placeholder
  const renderLogo = () => {
    if (logoUri) {
      return <Image source={{ uri: logoUri }} style={styles.logo} />;
    }
    return <View style={styles.logoPlaceholder} />;
  };

  const Container = onPress ? TouchableOpacity : View;

  return (
    <Container
      onPress={onPress}
      activeOpacity={0.85}
      style={[
        styles.root,
        isElevated ? styles.elevatedRoot : styles.outlinedRoot,
        style,
      ]}
    >
      <View style={[styles.logoWrap, logoInlineStyle]}>{renderLogo()}</View>

      <View style={[styles.content, isOutlined && styles.contentOutlined]}>
        <View style={styles.left}>
          <FoldText type="body-md-bold-v2" style={[styles.title, titleStyle]}>
            {title}
          </FoldText>
          <FoldText
            type="body-sm-bold-v2"
            style={[styles.subtitle, subtitleStyle]}
          >
            {subtitle}
          </FoldText>
        </View>

        <View style={styles.trailing}>{renderTrailingIcon()}</View>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusDefault,
    overflow: "hidden",
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },
  outlinedRoot: {
    position: "relative",
    paddingVertical: SpacingM3,
  },
  elevatedRoot: {
    borderWidth: 1,
    borderColor: BorderSecondary,
    paddingVertical: SpacingM4,
    paddingLeft: SpacingM4,
    position: "relative",
  },
  logoWrap: {
    overflow: "hidden",
    marginRight: SpacingM4,
    backgroundColor: LayerSecondary,
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
    paddingRight: SpacingM4,
  },
  contentOutlined: {
    borderBottomWidth: 1,
    borderColor: BorderSecondary,
    paddingVertical: SpacingM5,
  },
  left: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    color: FacePrimary,
  },
  subtitle: {
    color: FaceAccent,
    marginTop: 4,
  },
  trailing: {
    alignItems: "center",
    justifyContent: "center",
  },
});
