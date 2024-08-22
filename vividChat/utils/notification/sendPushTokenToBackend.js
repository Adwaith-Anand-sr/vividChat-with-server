import getPushToken from "./getPushToken.js";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;

async function sendPushTokenToBackend(userId) {
	const token = await getPushToken();
	if (token) {
		try {
			await fetch(`${apiUrl}/register-push-token`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					userId: userId,
					pushToken: token
				})
			});
		} catch (error) {
			console.error("Error sending push token to backend:", error);
		}
	}
}

export default sendPushTokenToBackend;
