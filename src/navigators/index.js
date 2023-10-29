import { NavigationContainer } from "@react-navigation/native";
import { useUserContext } from "../context/user";
import { Auth } from "../pages";
import { View } from "react-native";

export default function Navigator() {
	const { user } = useUserContext();

	return (
		<NavigationContainer>
			{user ? <View></View> : <Auth />}
		</NavigationContainer>
	);
}
