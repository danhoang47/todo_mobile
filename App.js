import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { UserContextProvider } from "./src/context/user";
import { TaskContextProvider } from "./src/context/tasks";

import Navigator from "./src/navigators";

export default function App() {
	return (
		<TaskContextProvider>
			<UserContextProvider>
				<SafeAreaProvider>
					<SafeAreaView style={styles.container}>
						<Navigator />
					</SafeAreaView>
				</SafeAreaProvider>
			</UserContextProvider>
		</TaskContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",

	},
});
