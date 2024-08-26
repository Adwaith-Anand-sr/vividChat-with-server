import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import { router } from "expo-router";

const setupNotificationChannel = async () => {
	if (Platform.OS === "android") {
		await Notifications.setNotificationChannelAsync("default", {
			name: "Default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FF231F7C",
			sound: "default"
		});
	}
};

export function useNotificationHandlers() {
	const notificationListener = useRef();
	const responseListener = useRef();

	useEffect(() => {
		setupNotificationChannel();

		const checkPermissions = async () => {
			const { status: existingStatus } =
			await Notifications.getPermissionsAsync();
		};
		checkPermissions();

		notificationListener.current =
			Notifications.addNotificationReceivedListener(async notification => {
			   // console.log("Notification received in foreground:", notification);
				// Display notification in foreground
				// 	await Notifications.presentNotificationAsync({
				// 		content: notification.request.content,
				// 		trigger: null
				// 	});
			});

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(response => {
			   router.push('(home)')
				//console.log("Notification response:", response);
			});

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(responseListener.current);
		};
	}, []);
}
