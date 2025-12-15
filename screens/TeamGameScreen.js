import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- PLAYER CARD ---------- */
function PlayerCard({ player, onNameChange, onRun, onWicket }) {
  return (
    <View style={styles.playerCard}>
      <TextInput
        value={player.name}
        onChangeText={onNameChange}
        style={styles.nameInput}
      />

      <View style={styles.stats}>
        <Text>🏏 Runs: {player.runs}</Text>
        <Text>🎯 Wickets: {player.wickets}</Text>
      </View>

      <View style={styles.btnRow}>
        <Button title="+ Run" onPress={onRun} />
        <Button title="+ Wicket" onPress={onWicket} />
      </View>
    </View>
  );
}

/* ---------- MAIN SCREEN ---------- */
export default function TeamGameScreen() {
  const initialPlayers = [
    "Avatar", "Asim", "Pushpendra", "Pappu", "Yogesh",
    "Nitesh", "Vishal", "Aman", "Shivakant", "Abhishek",
  ].map((name, i) => ({
    id: String(i + 1),
    name,
    runs: 0,
    wickets: 0,
  }));

  const [teamA, setTeamA] = useState(initialPlayers.slice(0, 5));
  const [teamB, setTeamB] = useState(initialPlayers.slice(5));

  /* ---------- HELPERS ---------- */
  const updatePlayer = (team, setTeam, id, field, value) => {
    setTeam((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const swapTeams = () => {
    setTeamA(teamB);
    setTeamB(teamA);
  };

  const saveMatchHistory = async () => {
    const match = {
      date: new Date().toDateString(),
      teamA,
      teamB,
    };

    const stored = await AsyncStorage.getItem("history");
    const history = stored ? JSON.parse(stored) : [];

    history.unshift(match);
    await AsyncStorage.setItem("history", JSON.stringify(history));

    alert("✅ Match saved to history");
  };

  const totalRuns =
    [...teamA, ...teamB].reduce((s, p) => s + p.runs, 0);

  const totalWickets =
    [...teamA, ...teamB].reduce((s, p) => s + p.wickets, 0);

  /* ---------- UI ---------- */
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🏏 Team & Game Management</Text>

      {/* SCOREBOARD */}
      <View style={styles.scoreboard}>
        <Text>Total Runs: {totalRuns}</Text>
        <Text>Total Wickets: {totalWickets}</Text>
      </View>

      <Button title="🔄 Swap Team A & B" onPress={swapTeams} />

      {/* TEAM A */}
      <Text style={styles.teamTitle}>Team A</Text>
      <FlatList
        data={teamA}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onNameChange={(t) =>
              updatePlayer(teamA, setTeamA, item.id, "name", t)
            }
            onRun={() =>
              updatePlayer(teamA, setTeamA, item.id, "runs", item.runs + 1)
            }
            onWicket={() =>
              updatePlayer(
                teamA,
                setTeamA,
                item.id,
                "wickets",
                item.wickets + 1
              )
            }
          />
        )}
      />

      {/* TEAM B */}
      <Text style={styles.teamTitle}>Team B</Text>
      <FlatList
        data={teamB}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onNameChange={(t) =>
              updatePlayer(teamB, setTeamB, item.id, "name", t)
            }
            onRun={() =>
              updatePlayer(teamB, setTeamB, item.id, "runs", item.runs + 1)
            }
            onWicket={() =>
              updatePlayer(
                teamB,
                setTeamB,
                item.id,
                "wickets",
                item.wickets + 1
              )
            }
          />
        )}
      />

      <View style={{ marginTop: 10 }}>
        <Button title="💾 Save Match" onPress={saveMatchHistory} />
      </View>
    </ScrollView>
  );
}

/* ---------- STYLES ---------- */
const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  scoreboard: {
    backgroundColor: "#E3F2FD",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  teamTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 12,
  },
  playerCard: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 2,
  },
  nameInput: {
    fontWeight: "bold",
    borderBottomWidth: 1,
    marginBottom: 6,
  },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  btnRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

