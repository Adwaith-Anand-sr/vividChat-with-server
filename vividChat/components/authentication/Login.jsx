import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import CustomTextInput from "./CustomTextInput"; 

const Login = ({
	username,
	handleUsernameChange,
	password,
	handlePasswordChange,
	handleLoginSubmit,
	setIsNewUser,
	statusMessage
}) => {
	return (
		<View className="h-full py-36 bg-zinc-900 flex flex-col items-center">
			<Text className="text-white text-5xl tracking-tighter font-black">
				Login
			</Text>

			<CustomTextInput
				placeholder="username"
				value={username}
				onChangeText={handleUsernameChange}
				keyboardType="username"
				style={{ width: "80%", marginTop: 20 }}
			/>

			<CustomTextInput
				placeholder="password"
				value={password}
				onChangeText={handlePasswordChange}
				secureTextEntry
				style={{ width: "80%", marginTop: 10 }}
			/>

			<Text className="text-white pt-3">{statusMessage}</Text>
			<TouchableOpacity
				onPress={handleLoginSubmit}
				className="w-[58%] rounded-lg flex items-center py-[0.8vh] mt-6 bg-green-400">
				<Text className="text-2xl font-black tracking-tighter ">
					Log In
				</Text>
			</TouchableOpacity>

			<View className="flex-row font-extrabold mt-5 items-center justify-center">
				<Text className="text-white">Don't have an account?</Text>
				<Pressable onPress={() => setIsNewUser(true)}>
					<Text className="text-white tracking-tighter font-black ml-1">
						Sign Up.
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Login;
