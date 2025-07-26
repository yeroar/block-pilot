import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import FWButton from "./cc-components/Button/FWButton";

export default function App() {
  return (
    <View style={styles.container}>
      <FWButton
        label="Block agent button"
        onPress={() => alert("Button Pressed!")}
        disabled={false}
        variant="default"
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
