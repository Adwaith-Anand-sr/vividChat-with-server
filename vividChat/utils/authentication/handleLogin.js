import React, { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import handleUserAuthenticated from '../notification/handleUserAuthenticated.js'
const apiUrl = Constants.expoConfig.extra.apiUrl;

const handleLogin = async (username, password) => {
	try {
		let res = await axios.post(`${apiUrl}/signin`, {
			username,
			password
		});
		if(res.status === 200 && res.data.token) {
		   await AsyncStorage.setItem("token", res.data.token);
		   await AsyncStorage.setItem("userId", res.data.userId);
		   handleUserAuthenticated(res.data.userId);
		   return true;
		}
		else return res.data.message
	} catch (error) {
      if(error.response.data.message) return error.response.data.message;
	}
};

export default handleLogin;