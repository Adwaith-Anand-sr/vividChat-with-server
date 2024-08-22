const handleUserAuthenticated = async userId => {
	const setupNotifications = async () => {
		const token = await registerForPushNotificationsAsync();
		console.log("Expo Push Token:", token);
		await sendPushTokenToBackend(userId);
	};

	setupNotifications();
};

export default handleUserAuthenticated;