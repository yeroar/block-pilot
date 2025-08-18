import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";
import { FoldText } from "../Primitives/FoldText";
import { SpacingM12, SpacingM4 } from "../../generated-tokens/tokens";

interface CurrencyInputProps {
  amount?: string; // e.g. "$12.34"
  topSlot?: React.ReactNode;
  bottomSlot?: React.ReactNode;
}

const LastCharBubble = ({ ch }: { ch: string }) => {
  // gentler starting values
  const scale = useRef(new Animated.Value(0.92)).current;
  const translateY = useRef(new Animated.Value(6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const appear = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.linear),
        useNativeDriver: true,
      }),
      // spring up instead of linear for smoother feel
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 10,
        tension: 90,
      }),
    ]);

    const pop = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.06, // smaller overshoot feels smoother
        duration: 140,
        easing: Easing.out(Easing.linear),
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 7,
        tension: 120,
      }),
    ]);

    Animated.parallel([appear, pop]).start();
  }, [opacity, translateY, scale]);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }, { scale }] }}>
      <FoldText type="header-xl-v2">{ch}</FoldText>
    </Animated.View>
  );
};

const CurrencyInput: React.FC<CurrencyInputProps> = ({
  amount = "$0",
  topSlot,
  bottomSlot,
}) => {
  const chars = amount.split("");
  const lastIndex = chars.length - 1;

  return (
    <View style={styles.container}>
      {topSlot}

      <View style={styles.amountRow}>
        {chars.map((ch, i) =>
          i === lastIndex ? (
            // key includes length so a new last char mounts and animates
            <LastCharBubble key={`last-${ch}-${chars.length}`} ch={ch} />
          ) : (
            <FoldText key={`ch-${i}-${ch}`} type="header-xl-v2">
              {ch}
            </FoldText>
          )
        )}
      </View>

      {bottomSlot}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flexGrow: 1,
    alignSelf: "stretch",
    gap: SpacingM4,
    alignItems: "center",
    padding: SpacingM12,
    borderRadius: 8,
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});

export default CurrencyInput;
