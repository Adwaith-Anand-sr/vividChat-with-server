import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useGetOnlineStatus = (chatPartner)=>{
   const socket = useSocket();
	const [isOnline, setIsOnline] = useState(false);
	const [chatPartnerId, setChatPartnerId] = useState(null);
   
	const fetchOnlineStatus = useCallback(() => {
		if (!socket) return;
		const handleIsUserOnline = (status) => {
		   if(status)
			   setIsOnline(true);
			else
			   setIsOnline(false);
		};
		
		const handleIsUserOfflineUpdate = (id) => {
		   if(chatPartnerId != id) return;
		   setIsOnline(false);
		};
		
		const handleIsUserOnlineUpdate = (id) => {
		   if(chatPartnerId != id) return;
		   setIsOnline(true);
		};
		
		if(chatPartner){
		   setChatPartnerId(chatPartner._id);
		   socket.emit("checkOnlineStatus", chatPartner._id);
		}
		socket.on("checkOnlineStatusRes", handleIsUserOnline);
		socket.on("userOfflineStatusUpdate", handleIsUserOfflineUpdate);
		socket.on("userOfflineStatusUpdate", handleIsUserOnlineUpdate);
		
		return () => {
			socket.off("checkOnlineStatusRes", handleIsUserOnline);
			socket.off("handleIsUserOnlineUpdate", handleIsUserOnlineUpdate);
			socket.off("userOfflineStatusUpdate", handleIsUserOfflineUpdate);
		};
	}, [socket, isOnline, chatPartner]);
	
	useEffect(() => {
		fetchOnlineStatus();
	}, [fetchOnlineStatus]);

	return isOnline;
}

export default useGetOnlineStatus;