import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../../contexts/SocketContext.js";

const useGetData = (chatId, page, limit) => {
	const [chats, setChats] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const socket = useSocket();

	const fetchData = useCallback(() => {
		if (!socket || !chatId) return;
		setLoading(true);
		socket.emit("getChatMessages", { chatId, page, limit });
	}, [socket, chatId, page, limit]);

	useEffect(() => {
		if (!socket) return;

		const handleDataResponse = (newData) => {
			setLoading(false);
			if (newData && newData.length > 0) {
				setChats(prevData => {
					const existingDataIds = new Set(prevData.map(item => item._id));
					const filteredNewData = newData.filter(
						item => !existingDataIds.has(item._id)
					);
					return [...prevData, ...filteredNewData];
				});
				setHasMore(newData.length === limit);
			} else {
				setHasMore(false);
			}
		};

		socket.on("getChatMessagesResponse", handleDataResponse);

		// Cleanup the listener when component unmounts or dependencies change
		return () => {
			socket.off("getChatMessagesResponse", handleDataResponse);
		};
	}, [socket, limit]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return { chats, loading, hasMore };
};

export default useGetData;