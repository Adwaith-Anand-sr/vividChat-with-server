import { useSocket } from "../../contexts/SocketContext.js";

const useEmitTypingStatus = () => {
	const socket = useSocket();
	const setTyping = (userId, chatPartnerId, isTyping) => {
		if (!socket) return;
		if(isTyping)
		   socket.emit("typing", { userId, chatPartnerId });
		else
		   socket.emit("typingStoped", { userId, chatPartnerId });
	};

	return setTyping ;
};

export default useEmitTypingStatus;
