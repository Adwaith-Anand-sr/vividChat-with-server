import React from "react";
import { TextInput, StyleSheet } from "react-native";

const CustomTextInput = ({
	placeholder,
	value,
	onChangeText,
	inputRef,
	onSubmitEditing,
	returnKeyType = "done",
	keyboardType = "default",
	secureTextEntry = false,
	style = {},
	...props
}) => {
	return (
		<TextInput
			ref={inputRef}
			placeholder={placeholder}
			value={value}
			onChangeText={onChangeText}
			style={[styles.input, style]} // Merging the default and custom styles
			returnKeyType={returnKeyType}
			keyboardType={keyboardType}
			secureTextEntry={secureTextEntry}
			onSubmitEditing={onSubmitEditing}
			placeholderTextColor="rgb(126,120,120)"
			cursorColor="white"
			{...props}
		/>
	);
};

const styles = StyleSheet.create({
	input: {
		borderColor: "white",
		borderWidth: 1,
		borderRadius: 8,
		paddingLeft: 16,
		color: "white",
		height: 50,
		fontSize: 16
	}
});

export default CustomTextInput;
