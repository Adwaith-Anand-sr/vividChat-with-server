import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Pressable,
	StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import handleSignup from "../utils/authentication/handleSignup.js";
import handleLogin from "../utils/authentication/handleLogin.js";
import Login from "../components/authentication/Login.jsx";
import Signup from "../components/authentication/Signup.jsx";
const Auth = () => {
	const [isNewUser, setIsNewUser] = useState(false);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [email, setEmail] = useState("");
	const [statusMessage, setStatusMessage] = useState(null);
	const passwordInputRef = useRef(null);
	const userNameInputRef = useRef(null);

	const handleUsernameChange = text => {
		const formattedText = text.toLowerCase().replace(/\s+/g, "");
		setUsername(formattedText);
	};
	const handlePasswordChange = pass => {
		setPassword(pass);
	};
	const handleEmailChange = email => {
		setEmail(email);
	};

	const handleLoginSubmit = async e => {
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!username.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}

		const res = await handleLogin(username, password);
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">signin successfull.</Text>
			);
			router.replace("(home)");
		} else if (res === "INVALID_USERNAME" || res === "INVALID_PASSWORD")
			setStatusMessage(
				<Text className="text-red-500">Invalid username or password!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};

	const handleSignupSubmit = async e => {
		setStatusMessage(<Text className="text-yellow-500">please wait..</Text>);
		if (!username.trim() || !email.trim() || !password.trim()) {
			setStatusMessage(
				<Text className="text-red-500">All fields are required!</Text>
			);
			return;
		}

		//email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			setStatusMessage(
				<Text className="text-red-500">please enter a valid email.</Text>
			);
			return;
		}

		const res = await handleSignup(username, email, password);
		if (res === true) {
			setStatusMessage(
				<Text className="text-green-500">User signed up successfully!</Text>
			);
			router.replace("(home)");
		} else if (res === "USERNAME_EXISTS")
			setStatusMessage(
				<Text className="text-red-500">Username already exists!</Text>
			);
		else setStatusMessage(<Text className="text-red-500">{res}</Text>);
	};

	return (
		<>
			<SafeAreaView>
				<StatusBar
					barStyle="light-content"
					backgroundColor="rgb(24, 24, 27)"
				/>
				{!isNewUser ? (
					<Login
						statusMessage={statusMessage}
						password={password}
						handleLoginSubmit={handleLoginSubmit}
						username={username}
						passwordInputRef={passwordInputRef}
						handlePasswordChange={handlePasswordChange}
						handleUsernameChange={handleUsernameChange}
						setIsNewUser={setIsNewUser}
						setStatusMessage={setStatusMessage}
					/>
				) : (
					<Signup
						userNameInputRef={userNameInputRef}
						email={email}
						handleEmailChange={handleEmailChange}
						passwordInputRef={passwordInputRef}
						username={username}
						handleUsernameChange={handleUsernameChange}
						handleSignupSubmit={handleSignupSubmit}
						password={password}
						handlePasswordChange={handlePasswordChange}
						statusMessage={statusMessage}
						setIsNewUser={setIsNewUser}
						setStatusMessage={setStatusMessage}
					/>
				)}
			</SafeAreaView>
		</>
	);
};

export default Auth;
