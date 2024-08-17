import React from "react";
import { View, Text, TouchableOpacity, Pressable } from "react-native";
import CustomTextInput from "./CustomTextInput.jsx"; // Import the reusable component

const Signup = ({
	userNameInputRef,
	email,
	handleEmailChange,
	passwordInputRef,
	username,
	handleUsernameChange,
	handleSignupSubmit,
	password,
	handlePasswordChange,
	statusMessage,
	setIsNewUser,
	setStatusMessage
}) => {
	return (
		<View className="h-full py-36 bg-zinc-900 flex flex-col items-center">
			<Text className="text-white text-5xl tracking-tighter font-black">
				SignUp
			</Text>

			<CustomTextInput
				placeholder="email"
				value={email}
				onChangeText={handleEmailChange}
				inputRef={null} // No ref needed for the first input
				returnKeyType="next"
				keyboardType="email-address"
				onSubmitEditing={() => userNameInputRef.current.focus()}
				style={{ width: "80%", marginTop: 20 }}
			/>

			<CustomTextInput
				placeholder="username"
				value={username}
				onChangeText={handleUsernameChange}
				inputRef={userNameInputRef}
				returnKeyType="next"
				onSubmitEditing={() => passwordInputRef.current.focus()}
				style={{ width: "80%", marginTop: 10 }}
			/>

			<CustomTextInput
				placeholder="password"
				value={password}
				onChangeText={handlePasswordChange}
				inputRef={passwordInputRef}
				returnKeyType="done"
				secureTextEntry
				onSubmitEditing={handleSignupSubmit}
				style={{ width: "80%", marginTop: 10 }}
			/>

			<Text className="text-white pt-3">{statusMessage}</Text>
			<TouchableOpacity
				onPress={handleSignupSubmit}
				className="w-[58%] rounded-lg flex items-center py-[0.8vh] mt-6 bg-green-400">
				<Text className="text-2xl font-black tracking-tighter ">
					SignUp
				</Text>
			</TouchableOpacity>

			<View className="flex-row font-extrabold mt-5 items-center justify-center">
				<Text className="text-white">Already have an account?</Text>
				<Pressable
					onPress={() => {
						setIsNewUser(false);
						setStatusMessage("");
					}}>
					<Text className="text-white tracking-tighter font-black ml-1">
						LogIn.
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

export default Signup;
