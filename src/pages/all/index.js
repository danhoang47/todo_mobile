import { useMemo, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useTaskContext } from "../../context/tasks";
import Task from "../../features/task";
import Filter from "../../features/filter";
import { compareDate, isToday } from "../../utils";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

function All({ navigation }) {
	const [selectedTasks, setSelectedTasks] = useState([]);
	const [isFilterOpen, setFilterOpen] = useState(false);
	const { joinedTasks: tasks, setTasks } = useTaskContext();
	const [filterOptions, setFilterOptions] = useState({
		orderBy: "asc",
		status: undefined,
		listIds: [],
		tagIds: [],
	});
    const [selectedDate, setSelectedDate] = useState(undefined)

	const filteredTasks = useMemo(
		() =>
			tasks
				.filter((task) => {
					const { status, listIds, tagIds } = filterOptions;
					// TODO: add filter date
					const isTaskInSelectedDate = selectedDate ? compareDate(task.dueDate, selectedDate.getTime()) === 0 : true;
					const isSastifyStatus =
						status !== undefined ? task.state === status : true;
					const isInList =
						listIds.length !== 0
							? listIds.includes(task.listId)
							: true;
					const isInTag =
						tagIds.length !== 0
							? task?.tags?.some(({ id }) =>
									tagIds.includes(id)
							  ) || false
							: true;

					return (
						isTaskInSelectedDate && isSastifyStatus && isInList && isInTag
					);
				})
				.sort((first, second) =>
					compareDate(first, second, filterOptions.orderBy)
				),
		[tasks, filterOptions, selectedDate]
	);

	const onTaskSelected = (id) => {
		if (selectedTasks.includes(id)) {
			setSelectedTasks(selectedTasks.filter((taskId) => taskId !== id));
			return;
		}

		setSelectedTasks((prev) => [...prev, id]);
	};

	const onRemoveActionPressed = () => {
		setTasks((prev) =>
			prev.filter(({ id }) => !selectedTasks.includes(id))
		);
		setSelectedTasks([]);
	};

	const onCompleteActionPressed = () => {
		setTasks((prev) =>
			prev.map((task) => {
				if (selectedTasks.includes(task.id)) {
					task.state = 1;
				}

				return task;
			})
		);
		setSelectedTasks([]);
	};

	const onAddNewTaskPressed = () => {
		navigation.navigate("edit");
	};

	const onResetStatePressed = (id) => {
		setTasks((prev) =>
			prev.map((task) => (task.id === id ? { ...task, state: 0 } : task))
		);
	};

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
				<Text style={styles.headerTitle}>{selectedDate ? selectedDate.toLocaleDateString() : "All Task"}</Text>
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
						{filteredTasks.length}
					</Text>
				</View>
				<Pressable
					style={{
						position: "absolute",
						right: 0,
					}}
					onPress={() => {
						setFilterOpen(true);
					}}
				>
					<FontAwesome5 name="sliders-h" size={22} />
				</Pressable>
				<Pressable
					style={{
						position: "absolute",
						right: 40,
					}}
					onPress={() => {
						DateTimePickerAndroid.open({
							mode: "date",
							value: selectedDate
								? new Date(selectedDate)
								: new Date(),
							onChange: (event, date) => {
								setSelectedDate(date)
							},

						});
					}}
				>
					<FontAwesome5 name="calendar-alt" size={22} />
				</Pressable>
			</View>
			<View style={styles.body}>
				<Pressable
					style={styles.addNewTaskBtn}
					onPress={onAddNewTaskPressed}
				>
					<FontAwesome5 size={16} name="plus" color="#858383" />
					<Text style={styles.addNewTaskBtnTitle}>Add New Task</Text>
				</Pressable>
				<View>
					<FlatList
						data={filteredTasks}
						renderItem={({ item: task }) => (
							<Task
								task={task}
								onTaskSelected={onTaskSelected}
								isSelected={selectedTasks.includes(task.id)}
								navigation={navigation}
								onResetStatePressed={onResetStatePressed}
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
						contentContainerStyle={{
							paddingBottom: 160,
						}}
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
			<Filter
				isVisible={isFilterOpen}
				setVisible={setFilterOpen}
				selectedFilterOptions={filterOptions}
				setSelectedFilterOptions={setFilterOptions}
			/>
		</View>
	);
}

export default All;

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
