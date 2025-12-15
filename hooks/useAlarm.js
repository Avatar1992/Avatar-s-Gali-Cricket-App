import * as Notifications from "expo-notifications";

export async function setupDailyAlarm() {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") return;

  await Notifications.cancelAllScheduledNotificationsAsync();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Bakalol Team Parasia",
      body: "Cricket time! 6:00 AM",
    },
    trigger: {
      hour: 6,
      minute: 0,
      repeats: true,
    },
  });
}

