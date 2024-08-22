import React, { createContext, useContext, useEffect } from "react";
import socket from "../services/socketService.js";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
	useEffect(() => {
		const initializeSocket = async () => {
			try {
				const userId = await AsyncStorage.getItem("userId");
				if (userId) {
					socket.on("connect", () => {
						socket.emit("join", userId);
					});
				   socket.emit("join", userId);
				}
			} catch (error) {
				console.error("Failed to initialize socket", error);
			}
		};

		initializeSocket();

		return () => {
			socket.off("connect");
			socket.off("join");
		};
	}, []);

	return (
		<SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
	);
};

export const useSocket = () => useContext(SocketContext);
