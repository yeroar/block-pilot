import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchBar from "../cc-components/SearchBar/SearchBar";
import GiftCard from "../cc-components/GiftCard/GiftCard";
import FilterLine from "../cc-components/SearchBar/FilterLine";

export default function TestSearchScreen() {
  const [q, setQ] = useState("");
  const testRef = useRef<TextInput>(null);

  // Test direct focus
  useEffect(() => {
    setTimeout(() => testRef.current?.focus(), 100);
  }, []);

  const handleFilterChange = (filterId: string, optionId: string) => {
    console.log(`Filter ${filterId} changed to: ${optionId}`);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.page}>
        <Text style={styles.title}>Search bar test</Text>

        <SearchBar
          value={q}
          placeholder="Search..."
          onChange={setQ}
          testID="test-searchbar"
          autoFocus={true}
        />

        <View style={{ height: 16 }} />

        <FilterLine onFilterChange={handleFilterChange} />

        <View style={{ height: 16 }} />

        {/* Two outlined gift cards for quick visual test */}
        <GiftCard
          variant="outlined"
          title="Airbnb"
          subtitle="5% sats back"
          logoUri={undefined}
        />
        <View style={{ height: 12 }} />
        <GiftCard
          variant="elevated"
          title="Starbucks"
          subtitle="2% sats back"
          logoUri={undefined}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  page: { paddingLeft: 16, paddingRight: 0, flex: 1 },
  title: { fontSize: 18, marginBottom: 12 },
  preview: { marginTop: 20 },
  previewLabel: { fontSize: 12, color: "#666" },
  previewValue: { fontSize: 16, marginTop: 6 },
});
