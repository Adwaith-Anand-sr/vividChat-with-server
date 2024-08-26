import { useEffect } from "react";
import { showMessage, hideMessage } from "react-native-flash-message";
import truncateText from "./truncateText.js";
import pickColor from "./pickColor.js";

const customToastMessage = async (message, description) => {
	let desc = truncateText(description);
	await showMessage({
		message,
		description: desc,
		type: "success",
		floating: true,
		gestureEnabled: true,
		style: {
			paddingHorizontal: 25,
			paddingVertical: 22,
			marginTop: 40,
			position: "relative",
			borderRadius: 15,
			overflow: "hidden",
			backgroundColor: pickColor()
		},
		titleStyle: {
			fontSize: 19,
			paddingTop: 5,
			color: "black",
			textTransform: "capitalize",
			fontWeight: "bold"
		},
		textStyle: {
			fontSize: 15,
			paddingLeft: 10,
			color: "black",
			fontWeight: "semi-bold"
		}
	});
};

export default customToastMessage;