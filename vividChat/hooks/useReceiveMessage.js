import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../contexts/SocketContext.js";

const useReceiveMessage = () => {
	const socket = useSocket();
	
	const fetchMessages = useCallback(() => {
		if (!socket) return;
		
		const handleReceiveMessage = newMessage => {
		   alert('hh')
		   console.log("new", newMessage)
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
