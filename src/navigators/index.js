import { NavigationContainer } from "@react-navigation/native";
import { useUserContext } from "../context/user";
import { Auth, Today, Edit, StickyWall } from "../pages";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function Navigator() {
	const { user } = useUserContext();
	const stackScreenDefaultOptions = { headerShown: false };

	return (
		<NavigationContainer>
			{user ? (
				<Stack.Navigator initialRouteName="today">
					<Stack.Screen
						name="today"
						component={Today}
						options={stackScreenDefaultOptions}
					/>
					<Stack.Screen 
						name="edit"
						component={Edit}
						options={stackScreenDefaultOptions}
					/>
					<Stack.Screen 
						name="sticky_wall"
						component={StickyWall}
						options={stackScreenDefaultOptions}
					/>
				</Stack.Navigator>
			) : (
				<Auth />
			)}
		</NavigationContainer>
	);
}
