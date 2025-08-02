import React from "react";
import { View, StyleSheet } from "react-native";
import FWButton from "./cc-components/Button/FWButton";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Первый FWButton */}
      <FWButton
        label="Primary Button"
        primary={true} // Primary стиль
        onPress={() => console.log("Primary Button Pressed")}
      />

      {/* Второй FWButton */}
      <FWButton
        label="Secondary Button"
        primary={false} // Secondary стиль
        onPress={() => console.log("Secondary Button Pressed")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
