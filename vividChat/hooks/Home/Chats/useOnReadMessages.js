import { useEffect, useCallback } from "react";
import { useSocket } from "../../../contexts/SocketContext.js";

const useOnReadMessages = setChatList => {
	const socket = useSocket();
	const fetchChats = useCallback(() => {
		if (!socket) return;
		const handleReadMessage = ({ userId, chatId }) => {
			setChatList(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chat.chatId === chatId && chat.messages[0].sender !== userId) {
						chat.messages[0].status= 'read'
					}
					return chat;
				});
				return [...updatedChats];
			});
		};
		socket.on("readMessages", handleReadMessage);

		return () => {
			socket.off("readMessages", handleReadMessage);
		};
	}, [socket]);

	useEffect(() => {
		fetchChats();
	}, [fetchChats]);

	return [];
};

export default useOnReadMessages;
