import React from "react";
import { View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

import DynamicTextArea from '../../components/chats/DynamicTextArea.jsx'

const Footer = ({message, setMessage, handleSendMessage}) => {
	return (
		<View className="justify-between px-1 flex-row items-center h-[7vh]">
			<DynamicTextArea message={message} setMessage={setMessage} />
			<TouchableOpacity onPress={handleSendMessage}>
				<View className="mr-1 h-[5vh] w-[5vh] bg-green-500 rounded-full flex justify-center items-center">
					<AntDesign name="right" color="white" size={22} />
				</View>
			</TouchableOpacity>
		</View>
	);
};

export default Footer;
