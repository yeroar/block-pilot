import React from "react";
import { Image, StyleSheet } from "react-native";

export type MinimalIconProps = {
  name: string; // Can be a URL or Ionicon name
  color?: string; // Ignored if name is a URL
  size?: number;
};

/**
 * MinimalIcon - A lightweight icon component supporting tokens or Ionicons.
 *
 * @param {string} name - The name of the Ionicon or a URL for the icon.
 * @param {string} [color="#000"] - The color of the Ionicon (ignored for URLs).
 * @param {number} [size=24] - The size of the icon.
 */
export default function MinimalIcon({
  name,
  color = "#000",
  size = 24,
}: MinimalIconProps) {
  if (name.startsWith("http")) {
    // Render as an image if name is a URL
    return (
      <Image
        source={{ uri: name }}
        style={[styles.icon, { width: size, height: size }]} // Ensure size is applied
      />
    );
  }

  // Fallback to Ionicons for named icons
  const Ionicons = require("@expo/vector-icons").Ionicons;
  return <Ionicons name={name} color={color} size={size} style={styles.icon} />;
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: "center",
  },
});
