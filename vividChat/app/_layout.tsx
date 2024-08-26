// _layout.js
import React from "react";
import { Stack } from "expo-router";
import { StateProvider } from "../contexts/stateContext.js";
import { SocketProvider } from "../contexts/SocketContext.js";

export default function RootLayout() {
	return (
		<StateProvider>
			<SocketProvider>
				<Stack>
					<Stack.Screen name="index" options={{ headerShown: false }} />
					<Stack.Screen name="Auth" options={{ headerShown: false }} />
					<Stack.Screen name="(home)" options={{ headerShown: false }} />
					<Stack.Screen
						name="Others/AllUsers"
						options={{ headerShown: false }}
					/>
					<Stack.Screen
						name="Chat/[id]"
						options={{ headerShown: false }}
					/>
				</Stack>
			</SocketProvider>
		</StateProvider>
	);
}
