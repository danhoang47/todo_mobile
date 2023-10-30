import { useState } from "react";
import { TextInput } from "react-native";

function Input({ placeholder, value, onChangeText, error, styles }) {
	const [isFocus, setFocus] = useState(false);

	return (
		<TextInput
			style={styles}
			value={value}
			onChangeText={onChangeText}
			placeholder={placeholder}
			onFocus={() => {
				setFocus(true);
			}}
			onBlur={() => {
				setFocus(false);
			}}
		/>
	);
}

export default Input;
