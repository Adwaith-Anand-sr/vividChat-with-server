import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

async function registerForPushNotificationsAsync() {
	let storedToken = await AsyncStorage.getItem("pushToken");

	if (!storedToken) {
		const { status: existingStatus } = await Permissions.getAsync(
			Permissions.NOTIFICATIONS
		);
		let finalStatus = existingStatus;

		if (existingStatus !== "granted") {
			const { status } = await Permissions.askAsync(
				Permissions.NOTIFICATIONS
			);
			finalStatus = status;
		}

		if (finalStatus !== "granted") {
			alert("Failed to get push token for push notification!");
			return;
		}

		storedToken = (await Notifications.getExpoPushTokenAsync()).data;

		await AsyncStorage.setItem("pushToken", storedToken);
	}

	return storedToken;
}
