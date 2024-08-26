import React, { createContext, useState, useContext } from "react";

const StateContext = createContext();

export const StateProvider = ({ children }) => {
	const [chatList, setChatList] = useState([]);

	return (
		<StateContext.Provider value={{ chatList, setChatList }}>
			{children}
		</StateContext.Provider>
	);
};

export const useStateContext = () => useContext(StateContext);
