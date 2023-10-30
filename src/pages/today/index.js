import { useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useTaskContext } from "../../context/tasks";
import Task from "./task";

function Today() {
	const [selectedTasks, setSelectedTasks] = useState([]);
	const { tasks, setTasks } = useTaskContext();

	const onTaskSelected = (id) => {
		if (selectedTasks.includes(id)) {
			setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
			return;
		}

		setSelectedTasks((prev) => [...prev, id]);
	};

    const onRemoveActionPressed = () => {
        setTasks(prev => prev.filter(({ id }) => !selectedTasks.includes(id)))
        setSelectedTasks([])
    }

    const onCompleteActionPressed = () => {
        setTasks(prev => prev.map(task => {
            if (selectedTasks.includes(task.id)) {
                task.state = 1
            }

            return task
        }))
        setSelectedTasks([])
    }

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<FontAwesome5 name="bars" size={24} />
				<Text style={styles.headerTitle}>Today</Text>
				<View
					style={{
						borderRadius: 6,
						borderWidth: 1,
						borderColor: "#ebebeb",
					}}
				>
					<Text
						style={{
							paddingVertical: 4,
							paddingHorizontal: 10,
						}}
					>
						{tasks.length}
					</Text>
				</View>
			</View>
			<View style={styles.body}>
				<Pressable style={styles.addNewTaskBtn}>
					<FontAwesome5 size={16} name="plus" color="#858383" />
					<Text style={styles.addNewTaskBtnTitle}>Add New Task</Text>
				</Pressable>
				<View>
					<FlatList
						data={tasks}
						renderItem={({ item: task }) => (
							<Task 
                                task={task} 
                                onTaskSelected={onTaskSelected} 
                                isSelected={selectedTasks.includes(task.id)} 
                            />
						)}
						keyExtractor={(item) => item.id}
						ItemSeparatorComponent={
							<View
								style={{
									width: "100%",
									height: 1.5,
									backgroundColor: "#e6e6e6",
								}}
							/>
						}
					/>
				</View>
			</View>
			{selectedTasks.length !== 0 && (
				<View style={styles.selectedTasksAction}>
					<Pressable onPress={onRemoveActionPressed}>
						<Text
							style={{
								fontSize: 16,
								textDecorationLine: "underline",
								fontWeight: "bold",
							}}
						>
							Remove
						</Text>
					</Pressable>
					<Pressable
                        onPress={onCompleteActionPressed}
						style={{
							backgroundColor: "#ffd43b",
							borderRadius: 10,
						}}
					>
						<Text
							style={{
								padding: 10,
								fontSize: 16,
								fontWeight: "bold",
							}}
						>
							{`Complete ${selectedTasks.length} task`}
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
}

export default Today;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		position: "relative",
		paddingHorizontal: 20,
		paddingVertical: 14,
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
	body: {},
	addNewTaskBtn: {
		padding: 12,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: "#e6e6e6",
		flexDirection: "row",
		alignItems: "center",
		gap: 20,
	},
	addNewTaskBtnTitle: {
		color: "#858383",
		fontWeight: "bold",
		fontSize: 16,
	},
	selectedTasksAction: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderColor: "#e6e6e6",
		paddingHorizontal: 20,
		paddingVertical: 10,
		alignItems: "center",
		zIndex: 1,
		backgroundColor: "#fff",
	},
});
