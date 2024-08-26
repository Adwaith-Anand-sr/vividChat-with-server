import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useReceiveMessage = (setMessages, chatId) => {
	const socket = useSocket();

	const fetchMessages = useCallback(() => {
		if (!socket) return;

		const handleReceiveMessage = dets => {
			if (!chatId || !dets.chatId || dets.chatId !== chatId) return;
			setMessages(prev => {
				return [dets.message, ...prev];
			});
		};

		socket.on("receiveMessage", handleReceiveMessage);
		socket.emit("messageReceived", chatId);
		return () => {
			socket.off("receiveMessage", handleReceiveMessage);
		};
	}, [socket]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages]);

	return [];
};

export default useReceiveMessage;
