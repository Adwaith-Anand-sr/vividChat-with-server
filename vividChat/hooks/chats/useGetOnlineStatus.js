import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useGetOnlineStatus = (chatPartner)=>{
   const socket = useSocket();
	const [isOnline, setIsOnline] = useState(false);
	
	const fetchOnlineStatus = useCallback(() => {
		if (!socket) return;
		
		const handleIsUserOnline = (status) => {
		   if(status)
			   setIsOnline(true);
			else
			   setIsOnline(false);
		};
		
		if(chatPartner) socket.emit("checkOnlineStatus", chatPartner._id);
		socket.on("checkOnlineStatusRes", handleIsUserOnline);
		
		return () => {
			socket.off("checkOnlineStatusRes", handleIsUserOnline);
		};
	}, [socket, isOnline, chatPartner]);
	
	useEffect(() => {
		fetchOnlineStatus();
	}, [fetchOnlineStatus]);

	return isOnline;
}

export default useGetOnlineStatus;