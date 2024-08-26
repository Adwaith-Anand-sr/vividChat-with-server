import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
	Dimensions,
	ActivityIndicator
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "@react-navigation/native";

import DynamicTextArea from "../../components/chats/DynamicTextArea.jsx";
import Footer from "../../components/chats/Footer.jsx";
import Top from "../../components/chats/Top.jsx";
import ChatItem from "../../components/chats/ChatItem.jsx";

import generateChatId from "../../utils/chats/generateChatId.js";
import useGetUser from "../../hooks/useGetUser.js";
import useReceiveMessage from "../../hooks/chats/useReceiveMessage.js";
import useSendMessage from "../../hooks/chats/useSendMessage.js";
import useEmitTypingStatus from "../../hooks/chats/useEmitTypingStatus.js";
import useEmitReadMessage from "../../hooks/chats/useEmitReadMessage.js";
import useGetChatMessages from "../../hooks/chats/useGetChatMessages.js";

const Chat = () => {
	const route = useRoute();
	const { id } = route.params;
	const chatPartnerId = id;
	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [isTyping, setIsTyping] = useState(false);
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
	const newMessage = useReceiveMessage(setMessages, chatId);
	const setTyping = useEmitTypingStatus();
	const setRead = useEmitReadMessage();

	useFocusEffect(() => {
		setPage(1);
	});

	useEffect(() => {
		const fetchUserId = async () => {
			const id = await AsyncStorage.getItem("userId");
			if (id) setUserId(id);
		};
		fetchUserId();
	}, []); //fetchUserId

	useEffect(() => {
		const fetchChatId = async () => {
			if (userId) {
				const id = await generateChatId(userId, chatPartnerId);
				if (id) setChatId(id);
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
			setRead(userId, chatPartnerId, chatId);
		}
	}, [chats]); //setMessages

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsMessagesLoading(false);
		}, 1800);
		return () => {
			clearTimeout(timeout);
		};
	}, []);

	useEffect(() => {
		if (isMessagesLoading) return;
		if (!isTyping) {
			setIsTyping(true);
			setTyping(userId, chatPartnerId, true);
		}
		if (!message) {
			setTyping(userId, chatPartnerId, false);
			setIsTyping(false);
		}
	}, [message, userId, chatPartnerId]);

	const loadMoreChats = () => {
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};
	const handleSendMessage = () => {
		if (message.trim() === "") return;
		try {
			if (userId && chatId) {
				const participants = { sender: userId, receiver: chatPartnerId };
				let msg = {
				   _id: new Date(),
					sender: userId,
					receiver: chatPartnerId,
					message,
					chatId,
					timestamp: new Date()
				};
				setMessages(prev => [msg, ...prev]);
				setMessage("");
				sendMessage(participants, msg.message, chatId);
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
					handleSendMessage={handleSendMessage}
					message={message}
				/>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default Chat;
