import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import { FoldText } from "../Primitives/FoldText";

export const LastCharBubble = ({ ch }: { ch: string }) => {
  const scale = useRef(new Animated.Value(0.92)).current;
  const translateY = useRef(new Animated.Value(6)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const appear = Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 180,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        friction: 10,
        tension: 90,
      }),
    ]);

    const pop = Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.06,
        duration: 140,
        easing: Easing.out(Easing.quad),
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

// Shake hook for screens (e.g., amount overflow feedback)
export const useShakeX = (
  keyframes: number[] = [-6, 6, -4, 4, -2, 0],
  stepMs = 35
) => {
  const shakeX = useRef(new Animated.Value(0)).current;

  const triggerShake = () => {
    shakeX.setValue(0);
    const seq = keyframes.map((toValue) =>
      Animated.timing(shakeX, {
        toValue,
        duration: stepMs,
        useNativeDriver: true,
      })
    );
    Animated.sequence(seq).start();
  };

  return { shakeX, triggerShake };
};
