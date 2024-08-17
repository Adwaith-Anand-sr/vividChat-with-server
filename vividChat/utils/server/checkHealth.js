import axios from "axios";
import Constants from "expo-constants";
const apiUrl = Constants.expoConfig.extra.apiUrl;

const checkHealth = async () => {
	try {
		let res = await axios.get(`${apiUrl}/health`);
		if (res.status === 200) return true;
		else return false;
	} catch (err) {
		console.log("error while checking server health: ", err);
	}
};

export default checkHealth;
