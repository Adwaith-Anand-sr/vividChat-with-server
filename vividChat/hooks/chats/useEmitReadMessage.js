import { useSocket } from "../../contexts/SocketContext.js";
import { useStateContext } from '../../contexts/stateContext.js';


const useEmitReadMessage = () => {
	const socket = useSocket();
	const { setChatList } = useStateContext();
	
	const setRead = (userId, chatPartnerId, chatId) => {
		if (!socket || !userId || ! chatId) return;
		   socket.emit("readMessages", { userId, chatPartnerId, chatId });
		   setChatList(prevChats => {
				const updatedChats = prevChats.map(chat => {
					if (chat.chatId === chatId && chat.messages[0].sender !== userId) {
						chat.messages[0].status= 'read'
					}
					return chat;
				});
				return [...updatedChats];
			});
	};
	return setRead ;
};

export default useEmitReadMessage;
