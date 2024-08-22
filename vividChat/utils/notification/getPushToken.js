async function getPushToken() {
	const token = await AsyncStorage.getItem("pushToken");
	if (token) {
		return token;
	}
	return null;
}

export default getPushToken;