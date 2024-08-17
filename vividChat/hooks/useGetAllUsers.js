import { useState, useEffect, useCallback } from "react";
import { useSocket } from "../contexts/SocketContext.js";

const useGetAllUsers = (page, limit) => {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(false);
	const [hasMore, setHasMore] = useState(true);
	const socket = useSocket();

	const fetchUsers = useCallback(() => {
		if (!socket) return;
		setLoading(true);
		socket.emit("getAllUsers", { page, limit });

		const handleUsersResponse = newUsers => {
			setLoading(false);
			if (newUsers && newUsers.length > 0) {
				setUsers(prevUsers => {
					// Create a Set of existing user IDs
					const existingUserIds = new Set(prevUsers.map(user => user._id));
					// Filter out new users that are already in the list
					const filteredNewUsers = newUsers.filter(
						user => !existingUserIds.has(user._id)
					);
					return [...prevUsers, ...filteredNewUsers];
				});
				setHasMore(newUsers.length === limit);
			} else {
				setHasMore(false);
			}
		};

		socket.on("getAllUsersRes", handleUsersResponse);
		return () => {
			socket.off("getAllUsersRes", handleUsersResponse);
		};
	}, [socket, page, limit]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	return { users, loading, hasMore };
};

export default useGetAllUsers;
