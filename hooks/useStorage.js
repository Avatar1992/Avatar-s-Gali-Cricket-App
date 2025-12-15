import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "PLAYERS_DATA";

export async function loadPlayers() {
  const data = await AsyncStorage.getItem(KEY);
  return data ? JSON.parse(data) : null;
}

export async function savePlayers(players) {
  await AsyncStorage.setItem(KEY, JSON.stringify(players));
}

export function defaultPlayers() {
  return Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    runs: 0,
    wickets: 0,
  }));
}

