import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from 'react-native';
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

async function registerForPushNotificationsAsync() {
	let storedToken = await AsyncStorage.getItem("pushToken");

	if (!storedToken) {
		if (Device.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;

			if (existingStatus !== "granted") {
				const { status } = await Notifications.requestPermissionsAsync();
				finalStatus = status;
			}

			if (finalStatus !== "granted") {
				alert("Failed to get push token for push notification!");
				return;
			}

			storedToken = (await Notifications.getExpoPushTokenAsync()).data;

			await AsyncStorage.setItem("pushToken", storedToken);

			if (Platform.OS === "android") {
				Notifications.setNotificationChannelAsync("default", {
					name: "default",
					importance: Notifications.AndroidImportance.MAX,
					vibrationPattern: [0, 250, 250, 250],
					lightColor: "#FF231F7C"
				});
			}
		} else {
			alert("Must use physical device for Push Notifications");
		}
	}

	return storedToken;
}

export default registerForPushNotificationsAsync;
