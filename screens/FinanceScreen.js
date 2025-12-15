import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export default function FinanceScreen() {
  const [contribution, setContribution] = useState(0);
  const [expense, setExpense] = useState(0);

  const balance = contribution - expense;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>💰 Team Finance</Text>

      <Text>Total Contribution</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(contribution)}
        onChangeText={(v) => setContribution(Number(v))}
      />

      <Text>Total Expense</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={String(expense)}
        onChangeText={(v) => setExpense(Number(v))}
      />

      <Text style={styles.balance}>
        Available Amount: ₹{balance}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 12,
  },
  balance: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
});

