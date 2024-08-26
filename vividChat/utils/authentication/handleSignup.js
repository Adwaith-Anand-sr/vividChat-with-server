import React, { useState } from "react";
import axios from "axios";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

import handleUserAuthenticated from '../notification/handleUserAuthenticated.js'
const apiUrl = Constants.expoConfig.extra.apiUrl;

const handleSignup = async (username, email, password) => {
	try {
		let res = await axios.post(`${apiUrl}/signup`, {username, email, password})
		if(res.status === 200 && res.data.data) {
		   await AsyncStorage.setItem("token", res.data.data.token);
		   await AsyncStorage.setItem("userId", res.data.data.userId);
		   handleUserAuthenticated(res.data.data.userId);
		   return true;
		}
		else return res.data.message;
	} catch (error) {
		if (error.response.data.message) return error.response.data.message;
	}
};

export default handleSignup;
