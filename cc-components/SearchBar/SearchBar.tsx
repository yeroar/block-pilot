import React, { useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  TextInput as RNTextInput,
  Keyboard,
} from "react-native";
import { SearchMdIcon } from "../assets/BlueSkyIcons/SearchMdIcon";
import { ArrowNarrowLeftIcon } from "../assets/BlueSkyIcons/ArrowNarrowLeftIcon";
import { XCloseIcon } from "../assets/BlueSkyIcons/XCloseIcon";
import {
  LayerSecondary,
  BorderSecondary,
  FacePrimary,
  FaceDisabled,
  FaceAccent,
  SpacingM4,
  SpacingM3,
  BorderRadiusRounded,
} from "../../generated-tokens/tokens";

interface SearchBarProps {
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  testID?: string;
  autoFocus?: boolean;
  focus?: boolean; // new: programmatic focus control
}

export default function SearchBar({
  value: controlledValue,
  placeholder = "Search brands",
  onChange,
  containerStyle,
  inputStyle,
  testID,
  autoFocus = false,
  focus = false,
}: SearchBarProps) {
  const [value, setValue] = useState(controlledValue ?? "");
  const [focused, setFocused] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<RNTextInput | null>(null);

  useEffect(() => {
    if (typeof controlledValue === "string" && controlledValue !== value) {
      setValue(controlledValue);
    }
  }, [controlledValue]);

  // if parent sets focus=true, open keyboard
  useEffect(() => {
    if (focus) {
      // small timeout helps on some platforms / navigation transitions
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [focus]);

  const handleChange = (v: string) => {
    // User edited -> clear submitted flag so filled visual returns while typing
    setSubmitted(false);
    setValue(v);
    onChange?.(v);
  };

  const handleClear = () => {
    handleChange("");
    // keep keyboard open after clearing
    inputRef.current?.focus();
  };

  const handleSubmit = () => {
    // When user taps "Search" on keyboard: blur and mark as submitted so visuals revert
    inputRef.current?.blur();
    Keyboard.dismiss();
    setSubmitted(true);
    setFocused(false);
  };

  // slightly larger icon when focused for visual affordance
  const iconSize = focused ? 18 : 16;
  // "active" when focused OR when there's content and user hasn't submitted yet
  const active = focused || (value.length > 0 && !submitted);
  // submitted state uses FacePrimary, otherwise active uses FaceAccent, else disabled
  const iconColor = submitted
    ? FacePrimary
    : active
    ? FaceAccent
    : FaceDisabled;

  const renderIcon = (IconComp: any, colorOverride?: string) => {
    // Force SearchMdIcon to always use FaceDisabled regardless of state
    const c =
      IconComp === SearchMdIcon ? FaceDisabled : colorOverride ?? iconColor;
    return (
      <IconComp
        width={iconSize}
        height={iconSize}
        color={c}
        fill={c}
        stroke={c}
        style={{ color: c }}
      />
    );
  };

  // left arrow when focused OR when user submitted and there's input text (not placeholder)
  const leadingIsArrow = focused || (submitted && value.length > 0);
  const leadingIcon = leadingIsArrow
    ? renderIcon(ArrowNarrowLeftIcon)
    : renderIcon(SearchMdIcon);

  const showClear = value.length > 0;

  return (
    <View style={[styles.wrapper, containerStyle]}>
      <View
        style={[
          styles.inputBox,
          active && {
            borderColor: FaceAccent,
            borderWidth: 1.5,
          },
        ]}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => inputRef.current?.focus()}
          style={styles.leading}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          {leadingIcon}
        </TouchableOpacity>

        <RNTextInput
          ref={inputRef}
          autoFocus={autoFocus}
          testID={testID}
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          placeholderTextColor={FaceDisabled}
          value={value}
          onChangeText={handleChange}
          onFocus={() => {
            setFocused(true);
            setSubmitted(false); // user focuses -> clear submitted
          }}
          onBlur={() => setFocused(false)}
          onSubmitEditing={handleSubmit}
          keyboardType="default"
          returnKeyType="search"
          underlineColorAndroid="transparent"
        />

        {showClear ? (
          <TouchableOpacity
            accessibilityLabel="Clear search"
            onPress={handleClear}
            style={styles.trailing}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            {renderIcon(XCloseIcon)}
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  inputBox: {
    backgroundColor: LayerSecondary,
    borderRadius: BorderRadiusRounded,
    borderColor: BorderSecondary,
    borderWidth: 1,
    paddingHorizontal: SpacingM4,
    height: 44, // increase height to prevent text cropping
    flexDirection: "row",
    alignItems: "center",
    gap: SpacingM3,
  },
  leading: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    color: FacePrimary,
    fontSize: 14,
    lineHeight: undefined, // let RN handle line height automatically
    paddingVertical: 0,
    textAlignVertical: "center", // center text vertically on Android
  },
  trailing: {
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
