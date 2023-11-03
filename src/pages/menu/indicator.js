import { FontAwesome5 } from "@expo/vector-icons";
import { View } from "react-native";

function Indicator({ type, color, icon, style = {} }) {
	return (
		<>
			{type === "task" ? (
				<FontAwesome5 name={icon} size={20} />
			) : (
				<View
					style={[
						{
							width: 16,
							height: 16,
							backgroundColor: color,
							borderRadius: 4,
						},
						style,
					]}
				/>
			)}
		</>
	);
}

export default Indicator;
