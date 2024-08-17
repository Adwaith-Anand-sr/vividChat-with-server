import { useSocket } from "../contexts/SocketContext.js";

const useSendMessage = () => {
	const socket = useSocket();
	const sendMessage = (participants, message, chatId) => {
		if (!socket) return;
		socket.emit("sendMessage", { message, chatId, participants });
		socket.on("sendMessageRef", data => {
			console.log(data); 
		});
	};

	return sendMessage;
};

export default useSendMessage;
