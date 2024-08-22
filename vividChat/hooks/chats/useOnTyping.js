import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useOnTyping = () => {
	const socket = useSocket();
	const [isTyping, setIsTyping] = useState(false);

	const fetchTypingStatus = useCallback(() => {
		if (!socket) return;

		const onTyping = () => {
			if (!isTyping) {
				setIsTyping(true);
			}
		};

		const handleOnTypingStop = () => {
			if (isTyping) {
				setIsTyping(false);
			}
		};

		socket.on("typing", onTyping);
		socket.on("typingStoped", handleOnTypingStop);

		return () => {
			socket.off("typing", onTyping);
			socket.off("typingStoped", handleOnTypingStop);
		};
	}, [socket, isTyping]);

	useEffect(() => {
		fetchTypingStatus();
	}, [fetchTypingStatus]);

	return isTyping;
};

export default useOnTyping;
