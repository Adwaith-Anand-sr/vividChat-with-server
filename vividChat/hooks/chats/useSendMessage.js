import React, { useEffect, useState, useCallback } from "react";

import { useSocket } from "../../contexts/SocketContext.js";
import { useStateContext } from "../../contexts/stateContext.js";

const useSendMessage = () => {
	const socket = useSocket();
	const { chatList, setChatList } = useStateContext();

	const sendMessage = (participants, message, chatId) => {
		if (!socket) return;
		socket.emit("sendMessage", { message, chatId, participants });
		setChatList(prevChats => {
			const updatedItem = prevChats.find(chat => chat.chatId === chatId);
			if (updatedItem && chatId && message) {
				updatedItem.messages[0].message = message;
				updatedItem.messages[0].sender = participants.sender;
				updatedItem.messages[0].receiver = participants.receiver;
				updatedItem.messages[0].message = message;
				updatedItem.messages[0].status = 'sent';
				let filteredChat = prevChats.filter(chat => chat !== updatedItem);
				return [updatedItem, ...filteredChat];
			}
			return [message, ...prevChats];
		});
	};

	return sendMessage;
};

export default useSendMessage;
