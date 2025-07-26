import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import FWButton from "./cc-components/Button/FWButton";

export default function App() {
  return (
    <View style={styles.container}>
      <FWButton
        label="Default Button"
        onPress={() => console.log("Default Button Pressed")}
        state="default"
        disabled={false}
      />
      <FWButton
        label="Disabled Button"
        onPress={() => console.log("Disabled Button Pressed")}
        state="default"
        disabled={true}
      />
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
});
