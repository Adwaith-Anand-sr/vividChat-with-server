import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserItem = ({ item, user }) => {
	const handleOpenChat = id => {
		try {
			router.push(`Chat/${id}`);
		} catch (e) {
			console.log("fetch chat error: ", e);
		}
	};

	// Determine which user is the chat partner
	const isUser1 =
		item.item.participants?.user1._id.toString() === user.toString();
	const partner = isUser1
		? item.item.participants.user2
		: item.item.participants.user1;

	return (
		<TouchableOpacity onPress={() => handleOpenChat(partner._id)}>
			<View
				style={{ height: 75 }}
				className="bg-zinc-950 flex-row items-center">
				<View className="w-[5vh] h-[5vh] mx-3 rounded-full overflow-hidden">
					<Image
						style={{ width: "100%", height: "100%" }}
						source={
							partner.dp
								? { uri: partner.dp }
								: require("../../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")
						}
						contentFit="cover"
					/>
				</View>
				<View className="flex flex-col gap-1 h-[90%] w-full justify-center">
					<Text className="text-white font-black text-[5vw]">
						{partner.username}
					</Text>

					<View className="flex-row items-center max-w-[70%]">
						{/* Show message status only if the last message was sent by the user */}
						{item.item.messages[0].sender === user &&
							(item.item.messages[0].status === "sent" ? (
								<Ionicons name="checkmark" size={14} color="white" />
							) : item.item.messages[0].status === "delivered" ? (
								<Ionicons
									name="checkmark-done"
									size={14}
									color="white"
								/>
							) : (
								<Ionicons
									name="checkmark-done"
									size={14}
									color="rgb(59,130,246)"
								/>
							))}
						<Text
							numberOfLines={1}
							ellipsizeMode="tail"
							className="pl-2 text-zinc-300 w-full">
							{item.item.messages[0].message}
						</Text>
					</View>

					{/* Show unread message indicator if the last message was received and not read */}
					<View className="w-[83%] pr-2 h-full flex-row items-center justify-end absolute">
						{item.item.messages[0].sender !== user &&
							item.item.messages[0].status !== "read" && (
								<View className="flex justify-center items-center w-[4.5vw] h-[4.5vw] rounded-full bg-green-500">
									<Text className="text-white text-[3vw] font-bold">
										{1}
									</Text>
								</View>
							)}
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default UserItem;
