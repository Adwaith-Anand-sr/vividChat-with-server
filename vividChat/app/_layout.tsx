import React from "react";
import { Stack } from "expo-router";
import { SocketProvider } from "../contexts/SocketContext.js"; 

export default function RootLayout() {
	return (
		<SocketProvider>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen name="Auth" options={{ headerShown: false }} />
				<Stack.Screen name="(home)" options={{ headerShown: false }} />
				<Stack.Screen name="Others/AllUsers" options={{ headerShown: false }} />
            <Stack.Screen name="Chat/[Id]" options={{ headerShown: false }} />
			</Stack>
		</SocketProvider>
	);
}
