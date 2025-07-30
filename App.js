import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import CustomKeyButton from "./cc-components/KeyboardButton/KeyboardButton";
import ActionTile from "./cc-components/ActionTile/ActionTile";
import MinimalIcon from "./components/content/MinimalIcon";
import { IconBackspace } from "./generated-tokens/tokens";
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import CurrencyInput from "./cc-components/CurrencyInput/CurrencyInput";

export default function App() {
  const [buttonState, setButtonState] = useState("default"); // State for ActionTile

  const toggleState = () => {
    setButtonState((prevState) => {
      const newState =
        prevState === "default"
          ? "pressed"
          : prevState === "pressed"
          ? "selected"
          : "default";
      console.log("Button state changed to:", newState); // Debugging state changes
      return newState;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.keyboardRow}>
        <CustomKeyButton
          variant="textOnly"
          label="1"
          onPress={() => console.log("Key 1 pressed")}
        />
        <CustomKeyButton
          variant="textOnly"
          label="2"
          onPress={() => console.log("Key 2 pressed")}
        />
        <CustomKeyButton
          variant="textOnly"
          label="3"
          onPress={() => console.log("Key 3 pressed")}
        />
      </View>
      <ActionTile
        label={`Backspace (${buttonState})`} // Display current state in label
        leadingIcon={true}
        leadingSlot={<MinimalIcon name={IconBackspace} size={16} />}
        trailingIcon={true}
        trailingSlot={<MinimalIcon name={IconBackspace} size={16} />}
        state={buttonState} // Pass dynamic state
        onPress={() => {
          console.log("SimpleButton pressed with state:", buttonState); // Log state on press
          toggleState();
        }}
      />
      <TouchableOpacity style={styles.secondaryButton}>
        <Text style={styles.secondaryButtonText}>Secondary Button</Text>
      </TouchableOpacity>
      <View style={{ marginTop: 20, width: "80%" }}>
        <CurrencyInput
          topContextVariant="~฿"
          amount="$10"
          bottomContextVariant="addPayment"
        />
      </View>
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
  keyboardRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 10,
  },
  secondaryButton: {
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  secondaryButtonText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#333",
  },
});
