import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useReceiveMessage = (setMessages) => {
	const socket = useSocket();
	
	const fetchMessages = useCallback(() => {
		if (!socket) return;
		
		const handleReceiveMessage = chat => {
		   console.log("new", chat)
		   setMessages(prev=> [chat, ...prev])
		};

		socket.on("receiveMessage", handleReceiveMessage);
		return () => {
			socket.off("receiveMessage", handleReceiveMessage);
		};
	}, [socket]);

	useEffect(() => {
		fetchMessages();
	}, [fetchMessages]);
   
	return []
};

export default useReceiveMessage;
