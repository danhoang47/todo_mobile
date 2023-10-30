import { NavigationContainer } from "@react-navigation/native";
import { useUserContext } from "../context/user";
import { Auth, Today } from "../pages";
import { View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigator() {
	const { user } = useUserContext();
	const stackDefaultOptions = { headerShown: false };

	return (
		<NavigationContainer>
			{user ? (
				<Stack.Navigator initialRouteName="today">
					<Stack.Screen
						name="today"
						component={Today}
						options={stackDefaultOptions}
					/>
				</Stack.Navigator>
			) : (
				<Auth />
			)}
		</NavigationContainer>
	);
}
