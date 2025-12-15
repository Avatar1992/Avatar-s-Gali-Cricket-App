import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    AsyncStorage.getItem("history").then((res) => {
      if (res) setHistory(JSON.parse(res));
    });
  }, []);

  const exportPDF = async () => {
    let html = `<h1>Avatar’s Gali Cricket - Match History</h1>`;

    history.forEach((m) => {
      html += `<h3>${m.date}</h3>`;
      html += `<b>Team A</b><ul>`;
      m.teamA.forEach(
        (p) =>
          (html += `<li>${p.name} - Runs: ${p.runs}, Wickets: ${p.wickets}</li>`)
      );
      html += `</ul><b>Team B</b><ul>`;
      m.teamB.forEach(
        (p) =>
          (html += `<li>${p.name} - Runs: ${p.runs}, Wickets: ${p.wickets}</li>`)
      );
      html += `</ul>`;
    });

    const file = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(file.uri);
  };

  return (
    <ScrollView style={{ padding: 12 }}>
      <Button title="📄 Export PDF" onPress={exportPDF} />
      {history.map((m, i) => (
        <View key={i} style={{ marginTop: 12 }}>
          <Text style={{ fontWeight: "bold" }}>{m.date}</Text>
          {[...m.teamA, ...m.teamB].map((p, idx) => (
            <Text key={idx}>
              {p.name} → Runs: {p.runs}, Wickets: {p.wickets}
            </Text>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}


