import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface TopContextProps {
  content: string;
}

const TopContext: React.FC<TopContextProps> = ({ content }) => {
  if (!content) return null;

  return (
    <View style={styles.topContext}>
      <Text style={styles.topContextText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topContext: {
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  topContextText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
});

export default TopContext;
