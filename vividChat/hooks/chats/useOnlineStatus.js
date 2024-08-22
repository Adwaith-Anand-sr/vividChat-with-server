import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useOnlineStatus = ()=>{
   const socket = useSocket();
	const [isOnline, setIsOnline] = useState(false);
	const fetchTypingStatus = useCallback(() => {
		if (!socket) return;
		const handleOnOnline = (userId) => {
		   console.log('userId', userId)
			if (!isOnline) {
				setIsOnline(true);
			}
		};
		
		const handleOnOffline = (userId) => {
			if (isOnline) {
				setIsOnline(false);
			}
		};
		
		socket.on("online", handleOnOnline);
		socket.on("offline", handleOnOffline);

		return () => {
			socket.off("online", handleOnOnline);
		   socket.off("offline", handleOnOffline);
		};
	}, [socket, isOnline]);
	
	useEffect(() => {
		fetchTypingStatus();
	}, [fetchTypingStatus]);

	return {isOnline, };
}

export default useOnlineStatus;