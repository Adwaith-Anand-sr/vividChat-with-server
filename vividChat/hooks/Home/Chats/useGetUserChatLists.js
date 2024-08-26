import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../../contexts/SocketContext.js";

const useGetUserChatLists = (userId) => {
	const socket = useSocket();
	const [users, setUsers] = useState([]);
	
	const fetchUserChats = useCallback(() => {
		if (!socket || !userId) return;
		socket.emit("getUserChatList", userId);
      
		const handleUserChatListResponse = newUsers => {
			if (newUsers && newUsers.length > 0) {
				setUsers(newUsers);
			} 
		};
		socket.on("getUserChatListRes", handleUserChatListResponse);
		return () => {
			socket.off("getUserChatListRes", handleUserChatListResponse);
		};
	}, [socket, userId]);

	useEffect(() => {
		fetchUserChats();
	}, [fetchUserChats]);

	return { users } ;
};

export default useGetUserChatLists;
