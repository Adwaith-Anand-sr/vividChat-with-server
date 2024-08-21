import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

const Updates = () => {
	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar style="light" backgroundColor="black" />
			<View style={styles.container}>
				<Text style={styles.text}>Updates.</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "rgb(24, 24, 27)"
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgb(24, 24, 27)"
	},
	text: {
		color: "white"
	}
});

export default Updates;
