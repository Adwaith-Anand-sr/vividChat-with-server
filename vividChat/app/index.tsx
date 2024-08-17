import React, { useState, useEffect } from "react";
import { View, Text, StatusBar } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LottieView from "lottie-react-native";

import isTokenExpired from "../utils/authentication/isTokenExpired.js";
import checkHealth from "../utils/server/checkHealth.js";

const Index = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);
	useEffect(() => {
		const checkToken = async () => {
			try {
				const storedToken = await AsyncStorage.getItem("token");
				if (await checkHealth()) {
					if (storedToken && !isTokenExpired(storedToken)) {
						router.replace("(home)");
					} else {
						router.replace("Auth");
					}
				}else{
				   setStatusMessage('unable to establish connection to the server.\nretrying...')
				   let reCheckRes = await checkHealth()
				   if(reCheckRes) router.replace("Auth");
				}
			} catch (e) {
				console.error("Failed to fetch token from storage", e);
				router.replace("Auth");
			}
		};
		checkToken();
	}, []);

	return (
		<SafeAreaView>
			<StatusBar
				barStyle="light-content"
				backgroundColor="rgb(24, 24, 27)"
			/>
			<View className="bg-zinc-800 h-full flex justify-center items-center">
				<Text className="absolute tracking-tighter z-50 text-white font-black text-7xl">
					vividChat
				</Text>
				<View className="flex justify-center items-center h-full">
					<LottieView
						source={require("../assets/animations/entryAnim.json")}
						autoPlay
						style={{
							width: 200,
							height: 200,
							opacity: 0.8
						}}
						loop
					/>
				</View>
				<Text className="text-red-500 text-center absolute top-[85vh]">{statusMessage}</Text>
			</View>
		</SafeAreaView>
	);
};

export default Index;
