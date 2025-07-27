import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import CustomKeyButton from "./cc-components/KeyboardButton/KeyboardButton";

export default function App() {
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
      <StatusBar style="auto" />
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
});
