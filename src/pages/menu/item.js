import { useState } from "react";
import { Pressable, Text, View } from "react-native";

import styles from "./styles";

function Item({ onNavigate, routePath, title, badge, renderIndicator }) {
	const [isPressedIn, setPressedIn] = useState(false);

	return (
		<Pressable
			style={[
				styles.menuGroupItem,
				{
					backgroundColor: isPressedIn ? "#dbd9d9" : "transparent",
                    borderRadius: 10
				},
			]}
			onPressIn={() => setPressedIn(true)}
			onPressOut={() => setPressedIn(false)}
			onPress={onNavigate}
		>
			<View
				style={{
					flexDirection: "row",
					gap: 16,
					alignItems: "center",
				}}
			>
				{renderIndicator()}
				<Text
					style={{
						fontSize: 16,
						textTransform: "capitalize",
                        fontWeight: isPressedIn ? 'bold' : "normal"
					}}
				>
					{title}
				</Text>
			</View>
			<View
				style={{
					backgroundColor: isPressedIn ? "#fff" : "#c9c7c7",
					borderRadius: 4,
				}}
			>
				{badge ? (
					<Text
						style={{
							paddingVertical: 2,
							paddingHorizontal: 10,
							color: "#000",
							fontSize: 12,
							fontWeight: "bold",
						}}
					>
						{badge}
					</Text>
				) : undefined}
			</View>
		</Pressable>
	);
}

export default Item;
