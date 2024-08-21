import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	ActivityIndicator
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

import DynamicTextArea from "../../components/chats/DynamicTextArea.jsx";
import Footer from "../../components/chats/Footer.jsx";
import Top from "../../components/chats/Top.jsx";
import ChatItem from "../../components/chats/ChatItem.jsx";

import useSendMessage from "../../hooks/useSendMessage.js";
import generateChatId from "../../utils/chats/generateChatId.js";
import useGetUser from "../../hooks/useGetUser.js";
import useReceiveMessage from "../../hooks/useReceiveMessage.js";
import useGetChatMessages from "../../hooks/useGetChatMessages.js";

const Chat = () => {
	const route = useRoute();
	const { id } = route.params;
	const chatPartnerId = id;
	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [isMessagesLoading, setIsMessagesLoading] = useState(true);
	const [itemHeights, setItemHeights] = useState({});
	const [page, setPage] = useState(1);
	const PAGE_SIZE = 100;

	const flashListRef = useRef(null);

	const { chats, loading, hasMore } = useGetChatMessages(
		chatId,
		page,
		PAGE_SIZE
	);
	const chatPartner = useGetUser(chatPartnerId);
	const sendMessage = useSendMessage();
	const newMessage = useReceiveMessage();

	useEffect(() => {
		const fetchUserId = async () => {
			const id = await AsyncStorage.getItem("userId");
			setUserId(id);
		};
		fetchUserId();
	}, []); //fetchUserId

	useEffect(() => {
		const fetchChatId = async () => {
			if (userId) {
				const id = await generateChatId(userId, chatPartnerId);
				setChatId(id);
			}
		};
		fetchChatId();
	}, [userId, chatPartnerId]); //fetchChatId

	useEffect(() => {
		if (chats && chats.length > 0) {
			setMessages(prevMessages => {
				const existingDataIds = new Set(prevMessages.map(item => item._id));
				const filteredNewData = chats
					.filter(item => !existingDataIds.has(item._id)) // Filter out existing data
					.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Sort by timestamp in descending order
				return [...prevMessages, ...filteredNewData];
			});
		}
	}, [chats]); //setMessages

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsMessagesLoading(false);
		}, 1500);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	const loadMoreChats = () => {
		console.log("loading...");
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};
	const handleSendMessage = () => {
		if (message.trim() === "") return;
		try {
			if (userId && chatId) {
				const participants = { sender: userId, receiver: chatPartnerId };
				sendMessage(participants, message, chatId);
				setMessage("");
			} else {
				console.error("User ID is not available.");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};
	const onLayout = (event, id) => {
		const { height } = event.nativeEvent.layout;
		setItemHeights(prev => ({ ...prev, [id]: height }));
	};
	const getEstimatedItemSize = () => {
		const sizes = Object.values(itemHeights);
		if (sizes.length === 0) {
			return 60;
		}
		const averageSize = sizes.reduce((a, b) => a + b, 0) / sizes.length;
		const margin = 10;
		return averageSize + margin;
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
				<Top chatPartner={chatPartner} />
				<View
					style={{ flex: 1 }}
					className={isMessagesLoading ? " opacity-0" : "opacity-1"}>
					<FlashList
						ref={flashListRef}
						data={messages}
						inverted
						renderItem={({ item }) =>
							item ? (
								<ChatItem
									item={item}
									userId={userId}
									onLayout={onLayout}
								/>
							) : null
						}
						onEndReached={loadMoreChats}
						onEndReachedThreshold={0.8}
						ListFooterComponent={
							loading ? <ActivityIndicator size="small" /> : null
						}
						keyExtractor={item => item._id.toString()}
						estimatedItemSize={getEstimatedItemSize()}
						contentContainerStyle={{ paddingTop: 20 }}
					/>
				</View>
				<Footer
					setMessage={setMessage}
					inverted={true}
					handleSendMessage={handleSendMessage}
					message={message}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;
