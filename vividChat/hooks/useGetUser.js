import { useState, useEffect } from "react";
import { useSocket } from "../contexts/SocketContext.js";

const useGetUser = userId => {
	const [user, setUser] = useState(null);
	const socket = useSocket();

	useEffect(() => {
		if (!userId) return;
		const fetchUser = () => {
			socket.emit("getUser", userId); // Emit an event to fetch user details
			socket.on("getUserRes", userData => {
				setUser(userData)
			});
		};
		fetchUser();

		return () => {
			socket.off("getUserRes");
		};
	}, [userId, socket]);

	return user;
};

export default useGetUser;
