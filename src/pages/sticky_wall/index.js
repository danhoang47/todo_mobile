import { View, StyleSheet, Text, Pressable, FlatList,TouchableOpacity } from "react-native";
import { useStickyNoteContext } from "../../context/sticky_notes";
import { FontAwesome5 } from "@expo/vector-icons";
import DraggableFlatList, {
	ScaleDecorator,

} from "react-native-draggable-flatlist";

// const colors = []

// function getRandomColor() {
//     return random from colors
// }

function StickyWall({ navigation }) {
	const { stickyNotes, setStickyNotes } = useStickyNoteContext();


	const onAddNewStickyPressed = () => {
		navigation.navigate("edit_sticky");
	};

	const renderItem = ({ item, drag, isActive }) => {
		return (
		  <ScaleDecorator>
			<TouchableOpacity
			  activeOpacity={1}
			  onLongPress={drag}
			  disabled={isActive}
			  onPress={() => {
				navigation.navigate("edit_sticky", {
					noteId: item.id
				})
			}}
			  
			>
			  <View style={[styles.noteElement,{ backgroundColor: isActive ? "gray": item.color}]}>
							
								<View>
									<Text style={styles.headerSticky}>{item.title}</Text>
								</View>
								<View>
									<Text style={styles.bodySticky}>{item.content}</Text>
								</View>
							
						</View>
			</TouchableOpacity>
		  </ScaleDecorator>
		)
	  }

	

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable
					onPress={() => {
						navigation.navigate("menu");
					}}
				>
					<FontAwesome5 name="bars" size={24} />
				</Pressable>
				<Text style={styles.headerTitle}>StickyWall</Text>
				<View style={{ flex: 1, alignItems: 'flex-end' }}>
					<Pressable

						onPress={onAddNewStickyPressed}
					>
						<FontAwesome5 size={20} name="plus" color="#858383" />

					</Pressable>
				</View>
			</View>
			<DraggableFlatList
				data={stickyNotes}
				onDragEnd={({data}) =>{
					setStickyNotes(data)}}
				keyExtractor={(item) => item.id}
				renderItem={renderItem}
				
			
				
			/>

		</View>
	);
}

export default StickyWall;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		position: "relative",
		paddingHorizontal: 20,
		paddingVertical: 14,
	},
	headerSticky: {
		fontSize: 25,
		fontWeight: "bold",
	},
	bodySticky: {
		fontSize: 18,

	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
		marginBottom: 30,
	},
	headerTitle: {
		fontSize: 24,
		fontWeight: "bold",
	},
	noteElement: {
		marginBottom: 16,
		borderRadius: 10,
		backgroundColor: '#a2e9f3',
		paddingLeft: 20,
		paddingRight: 20,
		paddingTop: 10,
		paddingBottom: 10
	}


});