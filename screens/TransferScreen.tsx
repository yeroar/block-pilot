import React, { useState } from "react";
import { View, StyleSheet, Animated } from "react-native";

import FoldPageViewHeader from "../cc-components/FoldPageViewHeader/FoldPageViewHeader";
import StackControl from "../cc-components/FoldPageViewHeader/StackControl";

import CurrencyInput from "../cc-components/CurrencyInput/CurrencyInput";
import TopContext from "../cc-components/CurrencyInput/TopContext";
import BottomContext from "../cc-components/CurrencyInput/BottomContext";

import CustomKeyboard from "../cc-components/Keyboard/CustomKeyboard";
import ActionBar from "../cc-components/ActionBar/ActionBar";
import Button from "../cc-components/Button/Button";

import { ChevronLeftIcon } from "../cc-components/assets/BlueSkyIcons/ChevronLeftIcon";
import { CalendarIcon } from "../cc-components/assets/BlueSkyIcons/CalendarIcon";

import {
  LayerBackground,
  SpacingM4,
  SpacingM6,
  SpacingM12,
} from "../generated-tokens/tokens";
import { useShakeX } from "../cc-components/CurrencyInput/animations";

const TransferScreen: React.FC = () => {
  // support decimals
  const [amountStr, setAmountStr] = useState<string>("0");
  const MAX_AMOUNT = 10000;

  // use shared shake hook
  const { shakeX, triggerShake } = useShakeX();

  const onKeyPress = (k: string) => {
    if (!k) return;
    const key = k.toLowerCase();

    // backspace
    if (
      key === "back" ||
      key === "backspace" ||
      key === "delete" ||
      key === "del" ||
      k === "←"
    ) {
      setAmountStr((prev) => {
        const next = prev.length <= 1 ? "0" : prev.slice(0, -1);
        return next === "" ? "0" : next;
      });
      return;
    }

    // dot -> allow one
    if (k === ".") {
      setAmountStr((prev) => (prev.includes(".") ? prev : `${prev}.`));
      return;
    }

    // digits; max 2 decimals; cap at MAX_AMOUNT with shake on overflow
    if (/^\d$/.test(k)) {
      setAmountStr((prev) => {
        const hasDot = prev.includes(".");
        const [ints, decsRaw = ""] = prev.split(".");
        const decs = hasDot ? decsRaw : "";
        if (hasDot && decs.length >= 2) return prev;

        const candidate = prev === "0" && !hasDot ? k : prev + k;

        const num = parseFloat(candidate) || 0;
        if (num > MAX_AMOUNT) {
          triggerShake();
          return prev; // block input
        }
        return candidate;
      });
    }
  };

  const amountNum = parseFloat(amountStr) || 0;
  const previewDisabled = amountNum < 10;

  return (
    <View style={styles.screen}>
      <FoldPageViewHeader
        title="Buy bitcoin"
        leftComponent={
          <StackControl variant="left" leadingSlot={<ChevronLeftIcon />} />
        }
      />

      <View style={styles.body}>
        <View style={styles.amountSection}>
          <Animated.View style={{ transform: [{ translateX: shakeX }] }}>
            <CurrencyInput
              amount={`$${amountStr}`}
              topSlot={
                <TopContext
                  leadingIcon={<CalendarIcon width={16} height={16} />}
                  label="Weekly"
                />
              }
              bottomSlot={
                <Button
                  label={`Max $${MAX_AMOUNT.toLocaleString()}`}
                  variant="secondary"
                  size="xs"
                  onPress={() => setAmountStr(String(MAX_AMOUNT))}
                />
              }
            />
          </Animated.View>
        </View>

        <CustomKeyboard onKeyPress={onKeyPress} />

        <ActionBar>
          <Button
            label="Preview buy"
            variant="primary"
            size="lg"
            onPress={() => {}}
            disabled={previewDisabled}
          />
        </ActionBar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: LayerBackground,
    paddingHorizontal: SpacingM4, // 16
  },
  body: {
    flex: 1,
    gap: SpacingM6, // 24
    paddingTop: SpacingM12, // 48 under header
    justifyContent: "space-between",
  },
  amountSection: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
  },
});

export default TransferScreen;
