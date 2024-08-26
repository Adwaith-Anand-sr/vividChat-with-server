import { useEffect, useCallback, useState } from "react";
import { useSocket } from "../../../contexts/SocketContext.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import customToastMessage from '../../../components/ToastMessage/customToastMessage.js'

const useReceiveMessage = (setChatList, user) => {
	const socket = useSocket();
	const [userId, setUserId] = useState(null);
	useEffect(() => {
		const fetchUserId = async () => {
			let usr = await AsyncStorage.getItem("userId");
			setUserId(usr);
		};
		fetchUserId();
	}, [setUserId]);
	
	
	const fetchMessages = useCallback(() => {
		if (!socket) return;

		const handleReceiveMessage = ({ participants, message, chatId, senderUsername}) => {
			setChatList(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chatId && chat.chatId && participants && participants.receiver && message.message && participants.sender && chat.chatId === chatId ) {
						chat.messages[0].status= 'delivered'
						chat.messages[0].message= message.message
						chat.messages[0].sender= participants.sender
						chat.messages[0].receiver= participants.receiver
					}
					return chat;
				});
				return [...updatedChats];
			});
			if(senderUsername && message && message.message) customToastMessage(senderUsername, message.message)
		}
		
		
		const handleMessageReceived = ({ chatId }) => {
			setChatList(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chat.chatId === chatId) {
						chat.messages[0].status= 'delivered'
					}
					return chat;
				});
				return [...updatedChats];
			});
		}
		
		
		socket.on("receiveMessage", handleReceiveMessage);
		socket.on("messageSended", handleMessageReceived);
		return () => {
		   socket.off("messageSended", handleMessageReceived);
			socket.off("receiveMessage", handleReceiveMessage);
		};
	}, [socket]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages]);

	return [];
};

export default useReceiveMessage;
