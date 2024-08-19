import React, { useState, useEffect, useRef } from "react";
import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Dimensions
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
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

const { height: screenHeight } = Dimensions.get("window");

const Chat = () => {
	const route = useRoute();
	const { id } = route.params;
	const chatPartnerId = id;
	const [userId, setUserId] = useState(null);
	const [chatId, setChatId] = useState(null);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [chatLen, setChatLen] = useState(0);
	const [isNearBottom, setisBottom] = useState(true);
	const [isBottom, setIsBottom] = useState(true);
	const PAGE_SIZE = 30; // Updated page size
	const [page, setPage] = useState(1);
	const flashListRef = useRef(null);
	const oldContentHeightRef = useRef(0);
	const scrollPositionRef = useRef(0);


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
	}, []); //setUserId

	useEffect(() => {
		const fetchChatId = async () => {
			if (userId) {
				const id = await generateChatId(userId, chatPartnerId);
				setChatId(id);
			}
		};
		fetchChatId();
	}, [userId, chatPartnerId]); //setChatId

	useEffect(() => {
		if (chats && chats.length > 0) {
		   let len = 0
			setMessages(prevMessages => {
				const existingDataIds = new Set(prevMessages.map(item => item._id));
				const filteredNewData = chats.filter(
					item => !existingDataIds.has(item._id)
				);
				setChatLen(filteredNewData.length - chatLen);
				len = filteredNewData.length
				console.log("chatLen", chatLen);
				return [...filteredNewData, ...prevMessages];
			});
			setTimeout(() => {
				if (flashListRef.current) {
					console.log("l", len);
					flashListRef.current.scrollToOffset({
							offset: scrollPositionRef.current + len * 60,
				 			animated: false
						});
				}
			}, 500);
		}
	}, [chats]);

	useEffect(() => {
		if (isBottom) {
			console.log(isBottom);
			setTimeout(() => {
				if (flashListRef && flashListRef.current) {
					flashListRef.current.scrollToIndex({
						index: messages.length - 1,
						animated: true
					});
				}
			});
		} 
	}, [messages]);

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
				sendMessage(participants, message, chatId);
				setMessage("");
			} else {
				console.error("User ID is not available.");
			}
		} catch (error) {
			console.error("Error sending message:", error);
		}
	};

	const handleScroll = event => {
		if (!event || !event.nativeEvent) return;
		const { contentOffset, layoutMeasurement, contentSize } =
			event.nativeEvent;
		if (!contentOffset || !layoutMeasurement || !contentSize) return;

		const contentHeight = contentSize.height;
		const contentOffsetY = contentOffset.y;
		const distanceFromBottom =
			contentHeight - contentOffsetY - layoutMeasurement.height;

		setIsBottom(distanceFromBottom <= 0);
      console.log("contentOffsetY", contentOffsetY)
		if (contentOffsetY <= (60*page+30) && hasMore && !loading) {
			loadMoreChats();
			console.log("loading chats...");
		}
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}>
				<View style={{ flex: 1 }}>
					<Top chatPartner={chatPartner} />
					<FlashList
						ref={flashListRef}
						data={messages}
						renderItem={({ item }) => (
							<ChatItem item={item} userId={userId} />
						)}
						keyExtractor={item => item._id.toString()}
						stableId={item => item._id.toString()}
						estimatedItemSize={60}
						onScroll={handleScroll}
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
