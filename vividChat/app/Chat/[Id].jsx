import React, { useRef, useState, useEffect } from "react";
import {
	View,
	Text,
	FlatList,
	StatusBar,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import LottieView from "lottie-react-native";

import TextArea from "../../components/chats/TextArea.jsx";
import useSendMessage from "../../hooks/useSendMessage.js";
import getChatMessages from "../../utils/chats/getChatMessages.js";
import generateChatId from "../../utils/chats/generateChatId.js";
import useGetUser from "../../hooks/useGetUser.js";

const Chat = () => {
	const route = useRoute();
	const { Id } = route.params;
	const chatPartnerId = Id;
	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);

	const chatPartner = useGetUser(chatPartnerId);
	const sendMessage = useSendMessage();
	
	useEffect(() => {
		const fetchUserId = async () => {
			const id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserId();
	}, []);

	useEffect(() => {
		const fetchChatId = async () => {
			const id = await generateChatId(userId, chatPartnerId);
			setChatId(id)
		};
		fetchChatId();
		
	}, [userId, chatPartnerId]);

	const handleSendMessage = () => {
		if (message.trim() === "") return;
		try {
			if (userId && chatId) {
				const participants = {
					sender: userId,
					receiver: chatPartnerId
				};
				sendMessage(participants, message, chatId);
				setMessage("");
			} else {
				console.error("User ID is not available.");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const formatTime = timestamp => {
		const date = new Date(timestamp);
		let hours = date.getHours();
		const minutes = date.getMinutes().toString().padStart(2, "0");
		const ampm = hours >= 12 ? "PM" : "AM";
		hours = hours % 12;
		hours = hours ? hours : 12; 
		hours = hours.toString().padStart(2, "0");
		return `${hours}:${minutes} ${ampm}`;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
				<View style={{ flex: 1 }}>
					<View className="flex-row bg-neutral-900 px-3 items-center h-[8vh]">
						<TouchableOpacity onPress={() => router.back()}>
							<AntDesign name="left" color="white" size={20} />
						</TouchableOpacity>
						<View className="w-[4.5vh] h-[4.5vh] ml-5 mr-3 rounded-full overflow-hidden">
							<Image
								style={{ width: "100%", height: "100%" }}
								source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
								contentFit="cover"
							/>
						</View>
						{chatPartner?.username ? (
							<Text className="text-white text-2xl font-black tracking-tighter">
								{chatPartner.username}
							</Text>
						) : (
							<View className="flex -ml-4 justify-center h-full">
								<LottieView
									source={require("../../assets/animations/usernameLoadAnim.json")}
									autoPlay
									style={{
										width: 120,
										height: 120
									}}
									loop
								/>
							</View>
						)}
					</View>
					
					<FlatList></FlatList>
					
				</View>
				<View className="justify-between px-1 flex-row items-center h-[7vh]">
					<TextArea message={message} setMessage={setMessage} />
					<TouchableOpacity onPress={handleSendMessage}>
						<View className="mr-1 h-[5vh] w-[5vh] bg-green-500 rounded-full flex justify-center items-center ">
							<AntDesign name="right" color="white" size={22} />
						</View>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;
