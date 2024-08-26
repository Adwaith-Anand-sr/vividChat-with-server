import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;

async function sendPushTokenToBackend(userId, token) {
	try {
		const response = await fetch(`${apiUrl}/register-push-token`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				userId,
				pushToken: token
			})
		});

		if (response.status !== 200) {
			console.error(
				"Failed to register push token on the server",
				response.status
			);
		}
	} catch (error) {
		console.error("Error sending push token to backend:", error);
	}
}

export default sendPushTokenToBackend;
