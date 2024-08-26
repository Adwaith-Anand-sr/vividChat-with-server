import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import customToastMessage from '../../components/ToastMessage/customToastMessage.js'

import Top from "../../components/Home/Chats/Top.jsx";
import Loader from "../../components/Home/Chats/Loader.jsx";
import UserItem from "../../components/Home/Chats/UserItem.jsx";

import { useNotificationHandlers } from "../../hooks/notifications/useNotificationHandlers.js";
import useGetUserChatLists from "../../hooks/Home/Chats/useGetUserChatLists.js";
import useReceiveMessage from "../../hooks/Home/Chats/useReceiveMessage.js";
import useOnReadMessages from "../../hooks/Home/Chats/useOnReadMessages.js";

import { useStateContext } from "../../contexts/stateContext.js";

const Chats = () => {
	const [user, setUser] = useState(null);
	const [loader, setLoader] = useState(true);

	const { chatList, setChatList } = useStateContext();

	const { users } = useGetUserChatLists(user);
	useNotificationHandlers();
	useReceiveMessage(setChatList, user);
	useOnReadMessages(setChatList);

	useEffect(() => {
		const fetchUserId = async () => {
         let usr = await AsyncStorage.getItem("userId");
			setUser(usr);
			customToastMessage('adwaith', 'heyyyy')
		};
		fetchUserId();
	}, [setUser]);

	useEffect(() => {
		if (users && users.length > 0) {
			setChatList(users);
			setLoader(false);
		}
	}, [users]); //setMessages

	return (
		<>
			<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
				<StatusBar style="light" backgroundColor="black" />
				<View className="h-full bg-zinc-950">
					<Top />
					{loader ? (
						<Loader />
					) : (
						<FlashList
							data={chatList}
							renderItem={item => <UserItem item={item} user={user} />}
							keyExtractor={item => item._id.toString()}
							stableId={item => item._id.toString()}
							estimatedItemSize={80}
							contentContainerStyle={{ paddingBottom: 5 }}
						/>
					)}
				</View>
			</SafeAreaView>

			<TouchableOpacity
				onPress={() => {
					router.push("Others/AllUsers");
				}}
				className="flex justify-center items-center w-[5.5vh] h-[5.3vh] bg-green-500 absolute left-[80%] top-[90%] z-10 rounded-lg">
				<View className="flex justify-center items-center">
					<MaterialCommunityIcons size={24} name="comment-plus" />
				</View>
			</TouchableOpacity>
		</>
	);
};

export default Chats;
