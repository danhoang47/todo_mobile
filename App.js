import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { UserContextProvider } from "./src/context/user";
import Navigator from "./src/navigators";

export default function App() {
	return (
		<UserContextProvider>
			<SafeAreaProvider>
				<SafeAreaView style={styles.container}>
					<Navigator />
				</SafeAreaView>
			</SafeAreaProvider>
		</UserContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 10
	},
});
