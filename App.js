import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { UserContextProvider } from "./src/context/user";
import { TaskContextProvider } from "./src/context/tasks";
import { ListContextProvider } from "./src/context/lists";
import { TagContextProvider } from "./src/context/tags";
import { StickyNoteContextProvider } from "./src/context/sticky_notes";

import Navigator from "./src/navigators";

export default function App() {
	return (
		<StickyNoteContextProvider>
			<TagContextProvider>
				<ListContextProvider>
					<TaskContextProvider>
						<UserContextProvider>
							<GestureHandlerRootView style={{flex: 1}}> 
								<SafeAreaProvider>
									<SafeAreaView style={styles.container}>
										<Navigator />
									</SafeAreaView>
								</SafeAreaProvider>
							</GestureHandlerRootView>
						</UserContextProvider>
					</TaskContextProvider>
				</ListContextProvider>
			</TagContextProvider>
		</StickyNoteContextProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",

	},
});
