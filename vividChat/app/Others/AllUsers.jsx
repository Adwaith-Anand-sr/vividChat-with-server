import React, { useState, useEffect } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	ActivityIndicator
} from "react-native";
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { FlashList } from "@shopify/flash-list";

import useGetAllUsers from "../../hooks/useGetAllUsers.js";


const PAGE_SIZE = 25;

const AllUsers = () => {
	const [page, setPage] = useState(1);
	const {
		users: allUsers,
		loading,
		hasMore
	} = useGetAllUsers(page, PAGE_SIZE);
	const handleOpenChat = id => {
		try {
			router.replace(`Chat/${id}`);
		} catch (e) {
			console.log("fetch chat error: ", e);
		}
	};

	const loadMoreUsers = () => {
		if (!loading && hasMore) {
			setPage(prevPage => prevPage + 1);
		}
	};

	const renderItem = ({ item }) => (
		<TouchableOpacity key={item._id} onPress={() => handleOpenChat(item._id)}>
			<View style={{height: 75}} className="bg-zinc-950  flex-row items-center">
				<View className="w-[5vh] h-[5vh] mx-3 rounded-full overflow-hidden">
					<Image
						style={{ width: "100%", height: "100%" }}
						source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
						contentFit="cover"
					/>
				</View>
				<View className="flex w-full flex-row items-center">
					<Text className="text-white font-black text-[4.85vw] tracking-tighter">
						{item.username}
					</Text>
					<View className="flex absolute left-[70%] flex-row gap-2">
						<AntDesign name="message1" size={20} color="white" />
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={{ backgroundColor: "black" }}>
			<StatusBar style="light" backgroundColor="black" />
			<View className="h-full bg-zinc-950">
				<View className="flex-row items-center bg-zinc-950">
					<Text className="text-white tracking-tighter font-black text-2xl my-3 ml-3">
						All Users
					</Text>
					<LottieView
						source={require("../../assets/animations/catAnim.json")}
						autoPlay
						style={{ width: 50, height: 50, opacity: 0.8 }}
						loop
					/>
				</View>
				{loading && !allUsers.length ? (
					<View className="flex items-center mt-[30vh] h-full">
						<LottieView
							source={require("../../assets/animations/chatLoadAnim.json")}
							autoPlay
							style={{ width: 200, height: 200, opacity: 0.8 }}
							loop
						/>
					</View>
				) : (
					<FlashList
						data={allUsers}
						renderItem={renderItem}
						keyExtractor={item => item._id.toString()}
						stableId={item => item._id.toString()} 
						onEndReached={loadMoreUsers}
						estimatedItemSize={80}
						onEndReachedThreshold={0.5}
						ListFooterComponent={
							loading && hasMore ? (
								<ActivityIndicator size="large" color="#fff" />
							) : null
						}
						contentContainerStyle={{ paddingBottom: 5 }}
					/>
				)}
			</View>
		</SafeAreaView>
	);
};

export default AllUsers;
