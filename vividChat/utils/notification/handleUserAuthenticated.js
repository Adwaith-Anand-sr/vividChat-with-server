import AsyncStorage from "@react-native-async-storage/async-storage";
//import registerForPushNotificationsAsync from "../../services/notificationService.js";
import {registerForPushNotificationsAsync} from "./registerForPushNotificationsAsync.js";
import sendPushTokenToBackend from "./sendPushTokenToBackend.js";

const handleUserAuthenticated = async userId => {
	const token = await registerForPushNotificationsAsync();
	if (token) {
		await sendPushTokenToBackend(userId, token);
	}
};

export default handleUserAuthenticated;
