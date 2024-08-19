import React from "react";
import { View, Text } from "react-native";

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

const ChatItem = ({ item, userId }) => {
	return (
		<View key={item._id} style={{height: 60}} className="py-2 mx-2">
			<View
				style={[
					{
						alignSelf: item.sender === userId ? "flex-end" : "flex-start"
					}
				]}
				className="relative bg-zinc-900 py-1 max-w-[85%] min-w-[25%] px-4 pb-5 rounded-lg w-auto flex">
				<Text className="text-white font-normal text-[3.85vw]">
					{item.message}
				</Text>
				<Text className="absolute right-0 mr-2 text-white font-semibold text-[2.5vw] bottom-1 text-zinc-500">
					{formatTime(item.timestamp)}
				</Text>
			</View>
		</View>
	);
};

export default ChatItem;
