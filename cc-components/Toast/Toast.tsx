import React, { useEffect, useRef } from "react";
import { View, StyleSheet, ViewStyle, Animated, Easing } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { AlertHexagonIcon } from "../assets/BlueSkyIcons/AlertHexagonIcon";
import {
  SpacingM2,
  SpacingM4,
  BorderRadiusDefault,
} from "../../generated-tokens/tokens";

// Design tokens kept local for component
const TOAST_TOKENS = {
  colors: {
    background: "#ffecea",
    border: "#e2483c",
    backgroundPressed: "#ffb8b2",
    textPrimary: "#22272b",
    iconColor: "#d22619",
  },
  spacing: {
    padding: 16,
    gap: 8,
  },
};

export interface ToastProps {
  title?: string;
  detail?: string;
  variant?: "0%" | "50%" | "100%"; // controls target fill
  style?: ViewStyle;
  animated?: boolean;
  autoProgress?: boolean; // if true animate from 0 -> target
  progressDuration?: number; // ms
  onHide?: () => void;
}

export default function Toast({
  title = "Error message",
  detail = "Detail",
  variant = "0%",
  style,
  animated = true,
  autoProgress = false,
  progressDuration = 1200,
}: ToastProps) {
  const fade = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-8)).current;
  const progress = useRef(new Animated.Value(0)).current; // 0..1
  const border = useRef(new Animated.Value(0)).current; // 0..1

  const targetForVariant = (v?: string) => {
    switch (v) {
      case "50%":
        return 0.5;
      case "100%":
        return 1;
      default:
        return 0;
    }
  };

  // entrance animation
  useEffect(() => {
    if (animated) {
      Animated.parallel([
        Animated.timing(fade, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 260,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fade.setValue(1);
      translateY.setValue(0);
    }
  }, [animated, fade, translateY]);

  // progress (vertical fill) and border growth when variant changes
  useEffect(() => {
    const target = targetForVariant(variant);

    if (autoProgress && target > 0) {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: target,
        duration: progressDuration,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false, // animating layout height
      }).start();
    } else {
      Animated.timing(progress, {
        toValue: target,
        duration: 450,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: false,
      }).start();
    }

    Animated.timing(border, {
      toValue: target > 0 ? 1 : 0,
      duration: 600,
      easing: Easing.out(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [variant, autoProgress, progressDuration, progress, border]);

  const showFill = variant !== "0%";

  // horizontal fill: animate width from 0% (left) -> 100% (right)
  const fillWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
    extrapolate: "clamp",
  });

  const borderWidth = border.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 2], // px thickness
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.animatedWrapper,
        {
          opacity: fade,
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={[styles.container, style]}>
        {showFill && (
          <Animated.View
            style={[
              styles.horizontalFill,
              {
                width: fillWidth,
              },
            ]}
          />
        )}

        <Animated.View
          pointerEvents="none"
          style={[
            styles.innerBorder,
            {
              borderColor: TOAST_TOKENS.colors.backgroundPressed,
              borderWidth: borderWidth,
              borderRadius: BorderRadiusDefault,
            },
          ]}
        />

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <AlertHexagonIcon width={16} height={16} />
          </View>

          <View style={styles.textContainer}>
            <FoldText type="body-md-bold-v2" style={styles.titleText}>
              {title}
            </FoldText>
            <FoldText type="body-md-v2" style={styles.detailText}>
              {detail}
            </FoldText>
          </View>
        </View>

        <View style={styles.borderOverlay} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedWrapper: {
    alignSelf: "stretch",
  },
  container: {
    backgroundColor: TOAST_TOKENS.colors.background,
    borderRadius: BorderRadiusDefault,
    position: "relative",
    overflow: "hidden",
  },
  horizontalFill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: TOAST_TOKENS.colors.backgroundPressed,
    zIndex: 1,
  },
  innerBorder: {
    position: "absolute",
    zIndex: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: TOAST_TOKENS.spacing.padding,
    paddingVertical: 0,
    gap: TOAST_TOKENS.spacing.gap,
    minHeight: 48,
    position: "relative",
    zIndex: 2,
  },
  iconContainer: {
    width: 16,
    height: 16,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: TOAST_TOKENS.spacing.gap,
  },
  titleText: {
    color: TOAST_TOKENS.colors.textPrimary,
    flexShrink: 0,
  },
  detailText: {
    color: TOAST_TOKENS.colors.textPrimary,
    flexShrink: 0,
  },
  borderOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: TOAST_TOKENS.colors.border,
    borderRadius: BorderRadiusDefault,
    pointerEvents: "none",
    shadowColor: "rgba(194,194,194,0.12)",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 3,
  },
});
