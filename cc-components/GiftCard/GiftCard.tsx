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
  SpacingM0,
  BorderRadiusDefault,
} from "../../generated-tokens/tokens";

export interface GiftCardProps {
  variant?: "outlined" | "elevated";
  title?: string;
  subtitle?: string;
  logoUri?: string;
  onPress?: () => void;
  style?: ViewStyle;
  titleStyle?: TextStyle;
  subtitleStyle?: TextStyle;
}

/**
 * GiftCard
 * - variant="outlined" -> horizontal card with subtle bottom border
 * - variant="variant2" -> boxed card with full inset border
 *
 * Uses design tokens for spacing / colors / radii.
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

  // logo size varies by variant — expose a simple placeholder value
  const logoSize = isElevated ? SpacingM10 : SpacingM8;
  const logoInlineStyle = {
    width: logoSize,
    height: logoSize,
    borderRadius: BorderRadiusSm,
  };

  const Container: any = onPress ? TouchableOpacity : View;

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
      {/* logo size adjusts per variant using inline style */}
      <View style={[styles.logoWrap, logoInlineStyle]}>
        {logoUri ? (
          <Image source={{ uri: logoUri }} style={styles.logo} />
        ) : (
          <View style={styles.logoPlaceholder} />
        )}
      </View>

      <View style={[styles.content, !isElevated && styles.contentOutlined]}>
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

        {isElevated ? (
          <StarIcon width={20} height={20} color={FaceAccent} />
        ) : (
          <ChevronRightIcon width={20} height={20} color={FaceAccent} />
        )}
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
    width: "100%", // ensure row fills container
    alignItems: "center", // vertically center children
  },
  outlinedRoot: {
    // horizontal row with subtle bottom hairline
    position: "relative",
    paddingVertical: SpacingM3,
  },
  elevatedRoot: {
    // boxed card with full inset border and extra vertical padding
    borderWidth: 1,
    borderColor: BorderSecondary,
    paddingVertical: SpacingM4,
    paddingLeft: SpacingM4,
    position: "relative",
  },

  // logoWrap size is applied inline per variant; keep layout-only defaults here
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
    flex: 1, // allow content to expand
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: SpacingM4,
  },
  // Only outlined variant gets the subtle bottom border and the vertical padding
  contentOutlined: {
    borderBottomWidth: 1,
    borderColor: BorderSecondary,
    paddingVertical: SpacingM5,
  },
  left: {
    flex: 1,
    justifyContent: "center",
    gap: SpacingM0,
  },
  title: {
    color: FacePrimary,
  },
  subtitle: {
    color: FaceAccent,
    marginTop: 4,
  },
});
