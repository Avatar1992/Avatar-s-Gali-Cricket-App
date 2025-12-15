import React from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

export default function PlayerCard({ player, onRun, onWicket, onNameChange }) {
  return (
    <View style={styles.card}>
      <TextInput
        style={styles.name}
        value={player.name}
        onChangeText={onNameChange}
      />

      <Text>🏏 Runs: {player.runs}</Text>
      <Text>🎯 Wickets: {player.wickets}</Text>

      <View style={styles.row}>
        <Button title="+ Run" onPress={onRun} />
        <Button title="+ Wicket" onPress={onWicket} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
    borderBottomWidth: 1,
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

