import { View, Text } from "react-native";

function TextDivider({ dividerDescription }) {
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "center",
				marginBottom: 14,
			}}
		>
			<View style={{ flex: 1, height: 1, backgroundColor: "#ebebeb" }} />
			<View>
				<Text style={{ width: 50, textAlign: "center" }}>
					{dividerDescription}
				</Text>
			</View>
			<View style={{ flex: 1, height: 1, backgroundColor: "#ebebeb" }} />
		</View>
	);
}

export default TextDivider;
