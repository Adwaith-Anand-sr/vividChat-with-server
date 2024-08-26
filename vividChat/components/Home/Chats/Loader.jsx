import React from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
	return (
		<View className="w-full h-[60vh] flex justify-center items-center">
			<LottieView
				source={require("../../../assets/animations/chatLoadAnim.json")}
				autoPlay
				style={{ width: 180, height: 180, opacity: 0.35 }}
				loop
			/>
		</View>
	);
};

export default Loader;
