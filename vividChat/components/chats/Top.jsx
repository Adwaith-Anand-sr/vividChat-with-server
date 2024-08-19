import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import LottieView from "lottie-react-native";
import { router } from "expo-router";
import { Image } from "expo-image";
import AntDesign from "@expo/vector-icons/AntDesign";

const Top = ({chatPartner}) => {
	return (
		<View className="flex-row bg-neutral-900 px-3 items-center h-[8vh]">
			<TouchableOpacity onPress={() => router.back()}>
				<AntDesign name="left" color="white" size={20} />
			</TouchableOpacity>
			<View className="w-[4.5vh] h-[4.5vh] ml-5 mr-3 rounded-full overflow-hidden">
				<Image
					style={{ width: "100%", height: "100%" }}
					source={require("../../assets/images/man-is-standing-front-computer-screen-with-man-purple-shirt_1108514-60863.jpg")}
					contentFit="cover"
				/>
			</View>
			{chatPartner?.username ? (
				<Text className="text-white text-2xl font-black tracking-tighter">
					{chatPartner.username}
				</Text>
			) : (
				<View className="flex -ml-4 justify-center h-full">
					<LottieView
						source={require("../../assets/animations/usernameLoadAnim.json")}
						autoPlay
						style={{ width: 120, height: 120 }}
						loop
					/>
				</View>
			)}
		</View>
	);
};

export default Top;
